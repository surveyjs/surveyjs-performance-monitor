import { describe, test, expect, beforeEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildAt, coreSteps, installTool, slotDir } from "../src/builds.ts";
import type { Npm, BuildOptions } from "../src/builds.ts";
import type { BuildSpec, Role } from "../src/versions.ts";
import { checkProject, loadProject } from "../src/project.ts";
import { checkManifest } from "../src/contract.ts";
import type { Manifest } from "../src/contract.ts";
import { InfraError } from "../src/errors.ts";
import { git } from "../src/util/git.ts";
import { repoWith } from "./helpers/repo.ts";
import type { FakeCommit } from "./helpers/repo.ts";

const root = path.resolve(import.meta.dirname, "..");
const library = loadProject(path.join(root, "projects"), "survey-library");
const other = loadProject(path.join(root, "test/fixtures/projects"), "other");
const manifest = checkManifest(JSON.parse(fs.readFileSync(path.join(root, "test/testdata/manifest.json"), "utf8")), "manifest.json") as Manifest;

interface Call { dir: string, op: string, name: string }
interface Fake extends Npm {
  calls: Array<Call>;
  out: string;
  failInstall: Array<string>;
  failRun: Array<string>;
}

function fakeNpm(): Fake {
  const f: Fake = {
    calls: [], out: "build", failInstall: [], failRun: [],
    async install(dir: string, name: string): Promise<void> {
      f.calls.push({ dir: dir, op: "install", name: name });
      if (f.failInstall.some((s: string) => dir.endsWith(s))) throw new InfraError("npm install failed in build-root", path.join(dir, "install.log"));
    },
    async run(dir: string, script: string, logFile: string): Promise<boolean> {
      f.calls.push({ dir: dir, op: "run", name: script });
      fs.mkdirSync(path.dirname(logFile), { recursive: true });
      fs.appendFileSync(logFile, "ran " + script + "\n");
      if (f.failRun.some((s: string) => dir.endsWith(s) && script === "build")) return false;
      if (script === "build" || script === "compile") {
        fs.mkdirSync(path.join(dir, f.out), { recursive: true });
        fs.writeFileSync(path.join(dir, f.out, "package.json"), "{}");
      }
      return true;
    },
  };
  return f;
}

const dates = ["2026-10-01T12:00:00Z", "2026-10-12T12:00:00Z", "2026-11-03T12:00:00Z", "2026-11-10T23:00:00Z"];
const roles: Array<Role> = ["month", "week", "yesterday", "today"];
let work: string;
let npm: Fake;

beforeEach(() => {
  work = fs.mkdtempSync(path.join(os.tmpdir(), "perf-work-"));
  npm = fakeNpm();
});

// The folder a build's outputs are copied to; one per role when a test builds several.
function dest(role?: Role): string {
  return path.join(work, "dest", role || "");
}

// A clone of the source repository that keeps its branches in refs/remotes/origin/*, as the night's checkout does.
function cloneRepo(mirror: string, dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
  git(dir, ["init", "--quiet"]);
  git(dir, ["remote", "add", "origin", mirror]);
  git(dir, ["config", "--replace-all", "remote.origin.fetch", "+refs/remotes/origin/*:refs/remotes/origin/*"]);
  git(dir, ["fetch", "--quiet", "origin"]);
}

function setup(o: { project?: typeof library, branch?: string, coreDir?: string, ui?: string | Array<string>, suites?: Array<string> } = {}): { opts: BuildOptions, specs: Array<BuildSpec>, repo: string } {
  const project = o.project || library;
  const uiFiles: Record<string, string> = {};
  for (const u of o.ui === undefined ? [] : ([] as Array<string>).concat(o.ui)) uiFiles[u + "/package.json"] = "{\"scripts\":{\"build\":\"true\"}}";
  const commits: Array<FakeCommit> = dates.map((d: string, i: number) => ({ date: d, subject: "c" + i, files: Object.assign({ [(o.coreDir || "packages/survey-core") + "/package.json"]: "{\"scripts\":{\"build\":\"true\",\"compile\":\"true\"}}" }, uiFiles) }));
  const src = repoWith(commits, { branch: o.branch, coreDir: o.coreDir });
  const repo = path.join(work, "repo");
  cloneRepo(src, repo);
  const shas = git(src, ["rev-list", "--reverse", "HEAD"]).split("\n");
  const specs: Array<BuildSpec> = roles.map((r: Role, i: number) => ({ role: r, sha: shas[i], date: dates[i] }));
  return { opts: { work: work, dest: dest(), repo: repo, logs: path.join(work, "logs"), npm: npm, m: manifest, suites: o.suites || ["core", "react"], project: project }, specs: specs, repo: repo };
}

describe("coreSteps", () => {
  test("core steps follow the recipe and run only the scripts that exist", () => {
    const s = { build: "x", "build:i18n": "x", "build:icons": "x" };
    expect(coreSteps(s, library.build.core, true)).toEqual(["build", "build:i18n", "build:icons"]);
    expect(coreSteps(s, library.build.core, false)).toEqual(["build", "build:i18n"]);
    expect(coreSteps({ build: "x", "build:icons": "x" }, library.build.core, true)).toEqual(["build", "build:icons"]);
    expect(coreSteps({ "build:i18n": "x" }, library.build.core, true)).toEqual([]);
    expect(coreSteps({ compile: "x", build: "x" }, { steps: ["compile"], uiSteps: [], dir: "d", out: "o" } as never, true)).toEqual(["compile"]);
  });
});

describe("buildAt, one role", () => {
  test("a second project builds without code changes", async () => {
    npm.out = "dist";
    const { opts, specs } = setup({ project: other, branch: "main", coreDir: "lib/core", ui: "lib/survey-react-ui" });
    const res = await buildAt(opts, specs.find((x) => x.role === "today")!);
    expect(npm.calls.some((c: Call) => c.dir === path.join(work, "build-today", "lib/core"))).toBe(true);
    expect(res.core).toBe(path.join(dest(), "core"));
    expect(fs.existsSync(path.join(dest(), "core", "package.json"))).toBe(true);
    expect(npm.calls.some((c: Call) => c.dir.includes("packages"))).toBe(false);
  });

  test("every role is built into its own slot and copied", async () => {
    const { opts, specs } = setup({ ui: "packages/survey-react-ui" });
    for (const s of specs) {
      const b = await buildAt({ ...opts, dest: dest(s.role) }, s);
      expect(b.failed).toBeUndefined();
      expect(b.sha).toBe(s.sha);
      expect(b.core).toBe(path.join(dest(s.role), "survey-core"));
      expect(b.ui.react).toBe(path.join(dest(s.role), "survey-react-ui"));
      expect(fs.existsSync(path.join(dest(s.role), "survey-react-ui", "package.json"))).toBe(true);
      expect(b.uiMissing).toEqual({});
      expect(Array.isArray(b.deps)).toBe(true);
      expect(b.node).toBe(process.version);
      expect(npm.calls.some((c: Call) => c.op === "install" && c.dir === slotDir(work, s.role))).toBe(true);
      expect(npm.calls.some((c: Call) => c.dir === path.join(slotDir(work, s.role), "packages/survey-core"))).toBe(true);
    }
  });

  test("a failing install of an old build is a column", async () => {
    npm.failInstall = [path.join("build-month")];
    const { opts, specs } = setup({ suites: ["core"] });
    const month = await buildAt(opts, specs.find((x) => x.role === "month")!);
    const today = await buildAt(opts, specs.find((x) => x.role === "today")!);
    expect(month.failed).toBe("npm install failed in build-root");
    expect(month.core).toBeNull();
    expect(month.logs.length).toBe(1);
    expect(today.failed).toBeUndefined();
    expect(today.core).not.toBeNull();
  });
});

describe("buildAt", () => {
  test("a checkout that fails is a column", async () => {
    const { opts } = setup({ suites: ["core"] });
    const b = await buildAt(opts, { role: "month", sha: "0".repeat(40), date: "" });
    expect(b.failed?.startsWith("checkout of")).toBe(true);
    expect(b.core).toBeNull();
    expect(npm.calls.length).toBe(0);
  });

  test("a UI package missing at the commit is n/a", async () => {
    const { opts, specs } = setup();
    const b = await buildAt(opts, specs[3]);
    expect(b.uiMissing.react).toBe("no survey-react-ui at " + specs[3].sha.substring(0, 7));
    expect(b.core).not.toBeNull();
    expect(b.failed).toBeUndefined();
  });

  test("a failing UI build is recorded, core stays", async () => {
    npm.failRun = ["survey-react-ui"];
    const { opts, specs } = setup({ ui: "packages/survey-react-ui" });
    const b = await buildAt(opts, specs[3]);
    expect(b.uiMissing.react).toBe("build failed");
    expect(b.logs.some((l: string) => l.endsWith("build-today-survey-react-ui.log"))).toBe(true);
    expect(b.uiFailed.react).toEqual({ reason: "survey-react-ui does not build", log: path.join(work, "logs", "build-today-survey-react-ui.log") });
    expect(b.core).not.toBeNull();
    expect(b.ui.react).toBeUndefined();
  });

  test("a UI package that does not install fails only its suite, with its install log", async () => {
    npm.failInstall = ["survey-react-ui"];
    const { opts, specs } = setup({ ui: ["packages/survey-react-ui", "packages/survey-vue3-ui"], suites: ["core", "react", "vue3"] });
    const b = await buildAt(opts, specs[3]);
    expect(b.failed).toBeUndefined();
    expect(b.uiMissing).toEqual({ react: "build failed" });
    expect(b.uiFailed.react).toEqual({ reason: "npm install failed in build-root", log: path.join(slotDir(work, "today"), "packages/survey-react-ui", "install.log") });
    expect(b.logs).toContain(b.uiFailed.react.log);
    expect(b.core).toBe(path.join(dest(), "survey-core"));
    expect(b.ui).toEqual({ vue3: path.join(dest(), "survey-vue3-ui") });
    expect(fs.existsSync(path.join(dest(), "survey-react-ui"))).toBe(false);
    expect(npm.calls.some((c: Call) => c.op === "run" && c.dir.endsWith("survey-react-ui"))).toBe(false);
  });

  test("a failing core build fails the build", async () => {
    npm.failRun = ["survey-core"];
    const { opts, specs } = setup({ suites: ["core"] });
    const b = await buildAt(opts, specs[3]);
    expect(b.failed).toBe("survey-core does not build");
    expect(b.core).toBeNull();
    expect(fs.existsSync(path.join(dest(), "survey-core"))).toBe(false);
  });
});

describe("installTool", () => {
  const tool = (): string => {
    const t = path.join(work, "tool");
    for (const d of ["packages/survey-core", "perf/react19", "perf/vue3"]) {
      fs.mkdirSync(path.join(t, d), { recursive: true });
      fs.writeFileSync(path.join(t, d, "package.json"), "{}");
    }
    return t;
  };
  const rel = (t: string): Array<string> => npm.calls.filter((c: Call) => c.op === "install").map((c: Call) => path.relative(t, c.dir) || ".");

  test("installTool installs what the project lists", async () => {
    const t = tool();
    await installTool(npm, t, library);
    expect(rel(t)).toEqual([".", "packages/survey-core", "perf/react19", "perf/vue3"]);
    npm.calls.length = 0;
    await installTool(npm, t, checkProject({ ...other, tool: { dirs: ["."], optional: [] } } as unknown, "other.json"));
    expect(rel(t)).toEqual(["."]);
  });
});
