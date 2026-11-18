import { describe, test, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { main, checkCores, parseArgs, newestLogTail } from "../../src/gh/main.ts";
import { readJson } from "../../src/util/json.ts";
import { git } from "../../src/util/git.ts";
import { repoWith } from "../helpers/repo.ts";
import type { FakeCommit } from "../helpers/repo.ts";

const root = path.resolve(import.meta.dirname, "../..");
const fakeRunner = path.join(root, "test/fixtures/fake-runner");
const DAY = 86400000;
const HOUR = 3600000;
const read = (file: string): string => fs.readFileSync(file, "utf8");

let tmp: string;
let w: string;
let r: string;
let out: string;
let empty: string;
let outbox: string;
let mirror: string;
let env: NodeJS.ProcessEnv;

function runnerFiles(): Record<string, string> {
  const res: Record<string, string> = { "package.json": JSON.stringify({ name: "fake-project", private: true, type: "module" }),
    "packages/survey-react-ui/package.json": JSON.stringify({ name: "survey-react-ui", scripts: { build: "true" } }) };
  for (const f of ["manifest.ts", "suites.ts", "fake-suite.ts"]) res["perf/" + f] = fs.readFileSync(path.join(fakeRunner, "perf", f), "utf8");
  return res;
}

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "perf-ghmain-"));
  w = path.join(tmp, "work");
  r = path.join(tmp, "runner");
  out = path.join(tmp, "out");
  empty = path.join(tmp, "empty");
  outbox = path.join(tmp, "outbox");
  fs.mkdirSync(empty);
  fs.mkdirSync(outbox);
  fs.writeFileSync(path.join(outbox, "files.txt"), "");
  fs.writeFileSync(path.join(outbox, "payload.json"), JSON.stringify({ content: "hi" }));
  const d = new Date();
  const d0 = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const commits: Array<FakeCommit> = [-40 * DAY, -10 * DAY, -DAY - 2 * HOUR, -2 * HOUR].map((t: number, i: number) =>
    ({ date: new Date(d0 + t).toISOString(), subject: "change " + i + " (#" + (100 + i) + ")", files: runnerFiles() }));
  mirror = repoWith(commits);
  env = { PERF_PROJECTS_DIR: path.join(root, "projects"), PERF_LIB_URL: mirror, GITHUB_OUTPUT: path.join(tmp, "github-output"),
    PERF_DISCORD_WEBHOOK: "https://discord.com/api/webhooks/1/secret-token", PERF_CHROME_ROOT: path.join(tmp, "no-chrome") };
});

afterEach(() => {
  try {
    git(mirror, ["worktree", "prune"]);
  } catch(e) {
    // nothing to prune
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.rmSync(mirror, { recursive: true, force: true });
});

describe("gh main", () => {
  test("an unknown subcommand or option, or a missing value, is exit 2", async () => {
    expect(await main(["nope"], env)).toBe(2);
    expect(await main(["plan", "--bogus", "x"], env)).toBe(2);
    expect(await main(["send", "--dir"], env)).toBe(2);
  });

  test("plan: an input error writes failure.json and exits 2", async () => {
    expect(await main(["plan", "--work", w, "--runner-dir", r, "--out", out], { ...env, PERF_REPEATS: "0" })).toBe(2);
    expect(readJson(out + "/failure.json", null)).toEqual({ reason: "PERF_REPEATS must be a whole number from 1 to 9" });
  });

  test("plan: outputs for the workflow", async () => {
    expect(await main(["plan", "--work", w, "--runner-dir", r, "--out", out], env)).toBe(0);
    const o = read(env.GITHUB_OUTPUT as string);
    expect(o).toMatch(/^jobs=\[\{"suite":"core","id":"a\/one","key":"core-a_one","browser":false\}/m);
    expect(o).toMatch(/^cache_paths<<\S+\n.*node_modules\n/m);
    expect(fs.existsSync(out + "/plan.json")).toBe(true);
  });

  test("plan: a Creator night clones the library too", async () => {
    const commits: Array<FakeCommit> = [-40 * DAY, -10 * DAY, -DAY - 2 * HOUR, -2 * HOUR].map((t: number, i: number) =>
      ({ date: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()) + t).toISOString(), subject: "change " + i + " (#" + (100 + i) + ")",
        files: { "package.json": JSON.stringify({ name: "fake-creator", private: true, type: "module" }), "perf/manifest.ts": read(path.join(root, "test/fixtures/fake-creator/perf/manifest.ts")) } }));
    const creator = repoWith(commits);
    try {
      const e = { ...env, PERF_PROJECT: "survey-creator", PERF_LIB_URL: creator, PERF_SIBLING_URL: mirror };
      expect(await main(["plan", "--work", w, "--runner-dir", r, "--out", out], e)).toBe(0);
      const plan = readJson<{ project: string, specs: Array<{ lib?: unknown }> }>(out + "/plan.json", null as never);
      expect(plan.project).toBe("survey-creator");
      expect(plan.specs.every((s) => !!s.lib)).toBe(true);
      expect(fs.existsSync(path.join(w, "sibling"))).toBe(true);
    } finally {
      try {
        git(creator, ["worktree", "prune"]);
      } catch(e) {
        // nothing to prune
      }
      fs.rmSync(creator, { recursive: true, force: true });
    }
  });

  test("plan: a failure after the plan leaves only failure.json", async () => {
    const bad = { ...env, GITHUB_OUTPUT: path.join(tmp, "no-such-folder", "o") };
    expect(await main(["plan", "--work", w, "--runner-dir", r, "--out", out], bad)).toBe(0 + 2);
    expect(fs.existsSync(out + "/plan.json")).toBe(false);
    expect(fs.existsSync(out + "/failure.json")).toBe(true);
  });

  test("newestLogTail: the last lines of the newest log, prefixed with its name", () => {
    const logs = path.join(tmp, "logs");
    fs.mkdirSync(logs);
    fs.writeFileSync(path.join(logs, "old.log"), "old\n");
    fs.utimesSync(path.join(logs, "old.log"), new Date(1000), new Date(1000));
    fs.writeFileSync(path.join(logs, "install-x.log"), Array.from({ length: 50 }, (_x, i) => "line " + i).join("\n") + "\n");
    const t = newestLogTail(logs, 40);
    expect(t).toContain("install-x.log: line 49");
    expect(t).toContain("install-x.log: line 10");
    expect(t).not.toContain("line 9\n");
    expect(t).not.toContain("old");
    expect(newestLogTail(path.join(tmp, "none"), 40)).toBe("");
  });

  test("report: no plan at all is the plan job's failure, posted as not started", async () => {
    expect(await main(["report", "--plan-dir", empty, "--builds", empty, "--measures", empty, "--out", out], { ...env, RESULT_PLAN: "failure", PERF_PROJECT: "survey-creator" })).toBe(0);
    expect(readJson(out + "/discord/1-result/payload.json", null)).toMatchObject({ content: expect.stringMatching(/^❌ perf survey-creator nightly not started: the plan job failed/) });
  });

  test("report: an unreadable jobs file is a warning, not a failure", async () => {
    const jobs = path.join(tmp, "jobs.jsonl");
    fs.writeFileSync(jobs, "{not json\n");
    expect(await main(["report", "--plan-dir", empty, "--builds", empty, "--measures", empty, "--out", out, "--jobs", jobs], { ...env, RESULT_PLAN: "failure" })).toBe(0);
    expect(await main(["report", "--plan-dir", empty, "--builds", empty, "--measures", empty, "--out", out, "--jobs", path.join(tmp, "none")], { ...env, RESULT_PLAN: "failure" })).toBe(0);
  });

  test("report: a jobs file with a null line is unusable as a whole, the report still posts", async () => {
    const jobs = path.join(tmp, "jobs2.jsonl");
    fs.writeFileSync(jobs, '{"name":"measure x","html_url":"u","conclusion":"success"}\nnull\n');
    expect(await main(["report", "--plan-dir", empty, "--builds", empty, "--measures", empty, "--out", out, "--jobs", jobs], { ...env, RESULT_PLAN: "failure" })).toBe(0);
    expect(fs.existsSync(out + "/discord/1-result/payload.json")).toBe(true);
  });

  test("send --dry posts nothing and exits 0; without a webhook, exit 1", async () => {
    expect(await main(["send", "--dir", outbox, "--dry"], env)).toBe(0);
    expect(await main(["send", "--dir", outbox], { ...env, PERF_DISCORD_WEBHOOK: "" })).toBe(1);
  });

  test("history: nothing to commit exits 0", async () => {
    expect(await main(["history", "--from", path.join(tmp, "missing"), "--repo", mirror], env)).toBe(0);
    expect(await main(["history", "--from", empty], env)).toBe(0);
  });

  test("checkCores", () => {
    expect(() => checkCores(2, "2,3")).toThrow("expected 4 cores, got 2");
    expect(() => checkCores(2, undefined)).not.toThrow();
    expect(() => checkCores(4, "2,3")).not.toThrow();
  });

  test("path options become absolute; plain options stay as given", () => {
    const a = parseArgs("measure", ["--plan", "p/plan.json", "--key", "core-a_one", "--runner", "r", "--builds", "b", "--out", "m-out", "--cores", "2,3"]);
    expect(a.values["--out"]).toBe(path.resolve("m-out"));
    expect(a.values["--plan"]).toBe(path.resolve("p/plan.json"));
    expect(path.isAbsolute(a.values["--builds"])).toBe(true);
    expect(a.values["--key"]).toBe("core-a_one");
    expect(a.values["--cores"]).toBe("2,3");
    expect(parseArgs("build", ["--plan", "x", "--role", "today", "--work", "w", "--out", "o"]).values["--role"]).toBe("today");
  });
});
