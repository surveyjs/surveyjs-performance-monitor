import { describe, test, expect, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { recordOf, readRecord, buildFromRecord, suiteOutcomes, buildRole, RECORD } from "../../src/gh/build.ts";
import type { BuildRecord } from "../../src/gh/build.ts";
import { loadProject } from "../../src/project.ts";
import type { BuildSpec, Role } from "../../src/versions.ts";
import { git } from "../../src/util/git.ts";
import { repoWith } from "../helpers/repo.ts";
import { fakeNpm } from "../helpers/npm.ts";
import { fakePlan } from "../helpers/plan.ts";

const root = path.resolve(import.meta.dirname, "../..");
const surveyLibrary = loadProject(path.join(root, "projects"), "survey-library");
const libraryFiles = { "packages/survey-react-ui/package.json": JSON.stringify({ name: "survey-react-ui", scripts: { build: "true" } }) };

const cleanup: string[] = [];
afterEach(() => {
  for (const d of cleanup.splice(0)) fs.rmSync(d, { recursive: true, force: true });
});
function tmp(): string {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "perf-ghbuild-"));
  cleanup.push(d);
  return d;
}

const today: BuildSpec = { role: "today", sha: "1".repeat(40), date: "2026-11-16T12:00:00Z" };
const yesterday: BuildSpec = { role: "yesterday", sha: "2".repeat(40), date: "2026-11-15T12:00:00Z" };
const week: BuildSpec = { role: "week", sha: "3".repeat(40), date: "2026-11-09T12:00:00Z" };
const month: BuildSpec = { role: "month", sha: "4".repeat(40), date: "2026-10-17T12:00:00Z" };

function ok(role: Role): BuildRecord {
  return { role: role, sha: "1".repeat(40), core: "survey-core", ui: { react: "survey-react-ui" }, uiMissing: {}, uiFailed: {}, deps: [], node: "v24.15.0", sec: 1 };
}

const rec = recordOf({ role: "today", sha: "1".repeat(40), core: "/w/builds/today/survey-core", ui: { react: "/w/builds/today/survey-react-ui" },
  uiMissing: {}, uiFailed: { vue3: { reason: "survey-vue3-ui does not build", log: "/o/logs/build-today-survey-vue3-ui.log" } },
  logs: ["/o/logs/build-today-survey-core.log"], deps: ["a@1"], node: "v24.15.0" }, 12.3);

describe("build records", () => {
  test("recordOf keeps folder and file names, not paths", () => {
    expect(rec).toMatchObject({ core: "survey-core", ui: { react: "survey-react-ui" }, uiFailed: { vue3: { log: "build-today-survey-vue3-ui.log" } }, sec: 12.3 });
    expect(rec.log).toBeUndefined();
  });

  test("buildFromRecord resolves under the download folder", () => {
    expect(buildFromRecord(rec, "/d/build-today").core).toBe("/d/build-today/survey-core");
    expect(buildFromRecord(rec, "/d/build-today").ui.react).toBe("/d/build-today/survey-react-ui");
  });

  test("readRecord: undefined when the file is absent or unreadable", () => {
    const d = tmp();
    expect(readRecord(d)).toBeUndefined();
    fs.writeFileSync(path.join(d, RECORD), "{ not json");
    expect(readRecord(d)).toBeUndefined();
  });

  test("suiteOutcomes: same, a missing record, n/a, a failed UI package, a failed reference", () => {
    const specs = [today, { ...yesterday, sameAs: "today" as Role }, week, month];
    const recs = { today: ok("today"), month: { ...ok("month"), uiMissing: { react: "no survey-react-ui at 4444444" } } };
    expect(suiteOutcomes(specs, recs, "core")).toEqual({ yesterday: { kind: "same", as: "today" }, week: { kind: "build failed", reason: "the build job failed" } });
    expect(suiteOutcomes(specs, recs, "react").month).toEqual({ kind: "n/a", reason: "no survey-react-ui at 4444444" });
    const bad = { ...recs, week: ok("week"), today: { ...ok("today"), failed: "survey-core does not build", log: "build-today-survey-core.log" } };
    expect(suiteOutcomes(specs, bad, "core", (r: Role, f: string) => "/l/" + r + "/" + f)).toEqual({
      today: { kind: "build failed", reason: "survey-core does not build", log: "/l/today/build-today-survey-core.log" },
      yesterday: { kind: "same", as: "today" }, week: { kind: "not run", reason: "today build failed" }, month: { kind: "not run", reason: "today build failed" } });
  });

  test("suiteOutcomes: a failed UI package is a build failure with its log", () => {
    const recs = { today: { ...ok("today"), uiMissing: { react: "build failed" }, uiFailed: { react: { reason: "survey-react-ui does not build", log: "x.log" } } } };
    expect(suiteOutcomes([today], recs, "react", (r: Role, f: string) => "/l/" + f).today).toEqual({ kind: "build failed", reason: "survey-react-ui does not build", log: "/l/x.log" });
    expect(suiteOutcomes([today], recs, "react").today).toEqual({ kind: "build failed", reason: "survey-react-ui does not build", log: "x.log" });
  });
});

function setup(): { repo: string, plan: ReturnType<typeof fakePlan>, out: string } {
  const repo = repoWith([{ date: "2026-11-16T12:00:00Z", subject: "c0", files: libraryFiles }]);
  cleanup.push(repo);
  const head = git(repo, ["rev-parse", "HEAD"]);
  const plan = fakePlan({ specs: [{ role: "today", sha: head, date: "2026-11-16T12:00:00Z" }] });
  return { repo: repo, plan: plan, out: path.join(tmp(), "out") };
}

describe("buildRole", () => {
  test("builds at the sha and writes the record twice and the folders", async () => {
    const { repo, plan, out } = setup();
    const rec = await buildRole({ plan: plan, project: surveyLibrary, role: "today", repo: repo, work: tmp(), out: out, npm: fakeNpm() });
    expect(rec.core).toBe("survey-core");
    expect(fs.existsSync(path.join(out, "build", "survey-core", "package.json"))).toBe(true);
    expect(readRecord(path.join(out, "build"))).toEqual(readRecord(out));
    expect(readRecord(out)).toEqual(JSON.parse(JSON.stringify(rec)));
  });

  test("a core that does not build: failed, with its log's name", async () => {
    const { repo, plan, out } = setup();
    const rec = await buildRole({ plan: plan, project: surveyLibrary, role: "today", repo: repo, work: tmp(), out: out, npm: fakeNpm({ failRun: ["packages/survey-core"] }) });
    expect(rec.failed).toBe("survey-core does not build");
    expect(rec.log).toBe("build-today-survey-core.log");
    expect(fs.existsSync(path.join(out, "logs", rec.log as string))).toBe(true);
    expect(readRecord(out)?.failed).toBe("survey-core does not build");
  });
});
