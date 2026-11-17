import { describe, test, expect, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseInputs, jobKey, jobsOf, checkLimit, makePlan, cachePaths, planOutputs } from "../../src/gh/plan.ts";
import { cloneBlobless, fetchCommit, checkoutAt } from "../../src/gh/lib.ts";
import { loadManifest } from "../../src/contract.ts";
import { loadProject } from "../../src/project.ts";
import { git } from "../../src/util/git.ts";
import { repoWith } from "../helpers/repo.ts";
import type { FakeCommit } from "../helpers/repo.ts";

const root = path.resolve(import.meta.dirname, "../..");
const fakeRunner = path.join(root, "test/fixtures/fake-runner");
const surveyLibrary = loadProject(path.join(root, "projects"), "survey-library");
const DAY = 86400000;
const HOUR = 3600000;

const cleanup: Array<{ dir: string, repo?: string }> = [];
afterEach(() => {
  for (const c of cleanup.splice(0).reverse()) {
    fs.rmSync(c.dir, { recursive: true, force: true });
    if (c.repo) git(c.repo, ["worktree", "prune"]);
  }
});

function tmpDir(repo?: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-plan-"));
  cleanup.push({ dir: dir, repo: repo });
  return dir;
}

function d0(): number {
  const n = new Date();
  return Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate());
}

// The fake runner as files of every commit, so a worktree of any commit has a manifest.
function runnerFiles(): Record<string, string> {
  const res: Record<string, string> = { "package.json": JSON.stringify({ name: "fake-project", private: true, type: "module" }),
    "packages/survey-react-ui/package.json": JSON.stringify({ name: "survey-react-ui", scripts: { build: "true" } }) };
  for (const f of ["manifest.ts", "suites.ts", "fake-suite.ts"]) res["perf/" + f] = fs.readFileSync(path.join(fakeRunner, "perf", f), "utf8");
  return res;
}

function library(offsets: Array<number>): string {
  const commits: Array<FakeCommit> = offsets.map((t: number, i: number) => ({ date: new Date(d0() + t).toISOString(), subject: "change " + i + " (#" + (100 + i) + ")", files: runnerFiles() }));
  const repo = repoWith(commits);
  cleanup.push({ dir: repo });
  return repo;
}

function opts(repo: string): { project: typeof surveyLibrary, repo: string, runnerDir: string, start: Date } {
  return { project: surveyLibrary, repo: repo, runnerDir: tmpDir(repo), start: new Date() };
}

describe("plan", () => {
  test("parseInputs: defaults and lists", () => {
    expect(parseInputs({})).toEqual({ kind: "nightly", suites: null, only: null, repeats: 5 });
    expect(parseInputs({ INPUT_SUITES: "core, react", INPUT_ONLY: " a/one  b/three " }))
      .toMatchObject({ suites: ["core", "react"], only: ["a/one", "b/three"] });
    expect(parseInputs({ INPUT_SUITES: "  ", INPUT_LABEL: "" })).toMatchObject({ suites: null, label: undefined });
  });

  test("parseInputs: today's rules for kind and ref", () => {
    expect(() => parseInputs({ INPUT_KIND: "on-demand" })).toThrow("an on-demand run needs a ref");
    expect(() => parseInputs({ INPUT_REF: "x" })).toThrow("a nightly takes no ref");
    expect(() => parseInputs({ INPUT_KIND: "weekly" })).toThrow("kind must be nightly or on-demand");
    for (const r of ["0", "10", "x"]) expect(() => parseInputs({ PERF_REPEATS: r })).toThrow("PERF_REPEATS must be a whole number from 1 to 9");
  });

  test("jobKey and jobsOf", () => {
    expect(jobKey("survey-js-ui", "records-plain/records/sort-header@ordersPaged")).toBe("survey-js-ui-records-plain_records_sort-header_ordersPaged");
    const m = loadManifest(fakeRunner);
    expect(jobsOf(m, [{ suite: "core", only: null }, { suite: "react", only: ["b/paint"] }]).map((j) => j.key + (j.browser ? "*" : "")))
      .toEqual(["core-a_one", "core-a_two", "core-b_three", "react-b_paint*"]);
    expect(Object.keys(jobsOf(m, [{ suite: "core", only: null }])[0])).toEqual(["suite", "id", "key", "browser"]);
    const clash = { ...m, suites: { core: { ...m.suites.core, ids: ["a/b", "a_b"] } } };
    expect(() => jobsOf(clash, [{ suite: "core", only: null }])).toThrow("two scenarios share the job key core-a_b: a/b and a_b");
  });

  test("checkLimit: 256 jobs per run", () => {
    expect(() => checkLimit(252, 4)).not.toThrow();
    expect(() => checkLimit(253, 4)).toThrow("253 scenario jobs and 4 build jobs exceed GitHub's 256 jobs per run");
  });

  test("makePlan: a nightly on the fake library", () => {
    const repo = library([-40 * DAY, -10 * DAY, -DAY - 2 * HOUR, -2 * HOUR]);
    const p = makePlan(parseInputs({}), opts(repo));
    expect(p.specs.map((s) => s.role)).toEqual(["today", "yesterday", "week", "month"]);
    expect(p.runnerSha).toBe(git(repo, ["rev-parse", "origin/master"]));
    expect(p.jobs.length).toBe(5);
    expect(p.runId).toMatch(/^\d{8}T\d{6}-[0-9a-f]{7}-nightly$/);
    expect(p.repeats).toBe(5);
    expect(p.manifest.contract).toBe(2);
    const out = planOutputs(p, { project: surveyLibrary, runnerDir: "/r", home: "/h", node: "24.15.0" });
    expect(Object.keys(out)).toEqual(["jobs", "reference", "older", "kind", "runner_sha", "cache_key", "cache_paths"]);
    expect(out.cache_key).toBe("tool-linux-node24.15.0-" + p.runnerSha);
    expect(JSON.parse(out.jobs)[0]).toEqual({ suite: "core", id: "a/one", key: "core-a_one", browser: false });
    expect(out.jobs.indexOf('{"suite":"core","id":"a/one","key":"core-a_one","browser":false}')).toBe(1);
  });

  test("makePlan: a young repo has no month, and older lists only what is built", () => {
    const young = library([-DAY - 2 * HOUR, -2 * HOUR]);
    const p = makePlan(parseInputs({}), opts(young));
    expect(p.specs.map((s) => s.role)).toEqual(["today", "yesterday"]);
    const out = planOutputs(p, { project: surveyLibrary, runnerDir: "/r", home: "/h", node: "24.15.0" });
    expect(JSON.parse(out.older)).toEqual([{ role: "yesterday", sha: p.specs[1].sha }]);
    expect(JSON.parse(out.reference)).toEqual({ role: "today", sha: p.specs[0].sha });
  });

  test("makePlan: an older build equal to today is not listed", () => {
    const repo = library([-40 * DAY]);
    const p = makePlan(parseInputs({}), opts(repo));
    expect(p.specs.map((s) => s.sameAs)).toEqual([undefined, "today", "today", "today"]);
    const out = planOutputs(p, { project: surveyLibrary, runnerDir: "/r", home: "/h", node: "24.15.0" });
    expect(JSON.parse(out.older)).toEqual([]);
  });

  test("makePlan: on-demand measures the branch against its merge-base with the branch's own runner", () => {
    const repo = library([-40 * DAY, -10 * DAY, -DAY - 2 * HOUR]);
    const tip = git(repo, ["rev-parse", "HEAD"]);
    const env = Object.assign({}, process.env, { GIT_AUTHOR_DATE: new Date().toISOString(), GIT_COMMITTER_DATE: new Date().toISOString() });
    const feature = execFileSync("git", ["commit-tree", tip + "^{tree}", "-p", tip, "-m", "feature work"], { cwd: repo, env: env, encoding: "utf8" }).trim();
    git(repo, ["update-ref", "refs/remotes/origin/feature", feature]);
    const p = makePlan(parseInputs({ INPUT_KIND: "on-demand", INPUT_REF: "feature" }), opts(repo));
    expect(p.specs.map((s) => s.role)).toEqual(["branch", "base"]);
    expect(p.specs[1].sha).toBe(tip);
    expect(p.runnerSha).toBe(p.specs[0].sha);
    expect(p.label).toBe("feature");
    expect(p.runId).toMatch(/-on-demand$/);
  });

  test("makePlan: unknown suite, id or ref", () => {
    const repo = library([-40 * DAY, -2 * HOUR]);
    const o = (): ReturnType<typeof opts> => opts(repo);
    expect(() => makePlan(parseInputs({ INPUT_SUITES: "x" }), o())).toThrow("unknown suite x");
    expect(() => makePlan(parseInputs({ INPUT_ONLY: "z/z" }), o())).toThrow("ids that are in no suite: z/z");
    expect(() => makePlan(parseInputs({ INPUT_KIND: "on-demand", INPUT_REF: "nope" }), o())).toThrow("unknown ref nope");
    expect(() => makePlan(parseInputs({ INPUT_KIND: "on-demand", INPUT_REF: "-x" }), o())).toThrow("bad ref -x");
  });

  test("cachePaths and the cache key", () => {
    expect(cachePaths("/r", surveyLibrary, "/h")).toEqual(["/r/node_modules", "/r/packages/survey-core/node_modules",
      "/r/perf/react19/node_modules", "/r/perf/vue3/node_modules", "/r/perf/angular/node_modules", "/h/.cache/ms-playwright"]);
  });

  test("lib: clone, fetch and checkout from a local repository", () => {
    const repo = library([-40 * DAY, -2 * HOUR]);
    const sha = git(repo, ["rev-parse", "HEAD"]);
    const a = tmpDir();
    checkoutAt(repo, sha, a);
    expect(git(a, ["rev-parse", "HEAD"])).toBe(sha);
    expect(fs.existsSync(path.join(a, "perf/manifest.ts"))).toBe(true);
    const b = tmpDir();
    fetchCommit(repo, sha, b);
    expect(git(b, ["cat-file", "-t", sha])).toBe("commit");
    const c = path.join(tmpDir(), "clone");
    cloneBlobless("file://" + repo, c);
    expect(git(c, ["cat-file", "-t", sha])).toBe("commit");
    expect(() => cloneBlobless("file:///nonexistent-perf-repo", path.join(tmpDir(), "x"))).toThrow("clone of file:///nonexistent-perf-repo failed:");
  });
});
