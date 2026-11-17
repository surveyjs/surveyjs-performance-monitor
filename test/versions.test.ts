import { describe, test, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { nightlyBuilds, onDemandBuilds, cloneRepo } from "../src/versions.ts";
import { prOf, commitRange } from "../src/pr.ts";
import { InfraError } from "../src/errors.ts";
import { git } from "../src/util/git.ts";
import { repoWith } from "./helpers/repo.ts";

const dates = ["2026-10-01T12:00:00Z", "2026-10-12T12:00:00Z", "2026-11-03T12:00:00Z", "2026-11-09T22:00:00Z", "2026-11-10T23:00:00Z", "2026-11-11T00:30:00Z"];
const set = (o?: { branch?: string }) => repoWith(dates.map((d: string, i: number) => ({ date: d, subject: "c" + i })), o);
const start = new Date("2026-11-11T02:00:00Z");
const subj = (repo: string, sha: string) => git(repo, ["log", "-1", "--format=%s", sha]);

describe("nightlyBuilds", () => {
  test("nightly picks the last first-parent commit before each cut from midnight UTC", () => {
    const repo = set();
    const b = nightlyBuilds(repo, start, "master");
    expect(b.map((x) => x.role)).toEqual(["today", "yesterday", "week", "month"]);
    expect(b.map((x) => subj(repo, x.sha))).toEqual(["c4", "c3", "c2", "c0"]);
    expect(new Date(b[0].date).toISOString()).toBe("2026-11-10T23:00:00.000Z");
  });

  test("a commit after midnight UTC is not today", () => {
    const repo = set();
    const last = git(repo, ["rev-parse", "HEAD"]);
    expect(nightlyBuilds(repo, start, "master").map((x) => x.sha)).not.toContain(last);
  });

  test("the start time within the day does not change the choice", () => {
    const repo = set();
    const a = nightlyBuilds(repo, new Date("2026-11-11T02:00:00Z"), "master");
    const b = nightlyBuilds(repo, new Date("2026-11-11T02:59:00Z"), "master");
    expect(a.map((x) => x.sha)).toEqual(b.map((x) => x.sha));
  });

  test("today of a night is yesterday of the next one", () => {
    const repo = set();
    const a = nightlyBuilds(repo, new Date("2026-11-11T02:00:00Z"), "master");
    const b = nightlyBuilds(repo, new Date("2026-11-12T02:00:00Z"), "master");
    expect(a.find((x) => x.role === "today")!.sha).toBe(b.find((x) => x.role === "yesterday")!.sha);
  });

  test("equal commits are marked sameAs", () => {
    const repo = repoWith([{ date: "2026-10-01T12:00:00Z", subject: "only" }]);
    const b = nightlyBuilds(repo, start, "master");
    const by = (r: string) => b.find((x) => x.role === r)!;
    expect(by("today").sameAs).toBeUndefined();
    expect(by("yesterday").sameAs).toBe("today");
    expect(by("week").sameAs).toBe("today");
    expect(by("month").sameAs).toBe("today");
  });

  test("a role without a commit before its date is left out", () => {
    const repo = repoWith([{ date: "2026-11-03T12:00:00Z", subject: "a" }, { date: "2026-11-10T12:00:00Z", subject: "b" }]);
    expect(nightlyBuilds(repo, start, "master").map((x) => x.role)).toEqual(["today", "yesterday", "week"]);
  });

  test("first parent only", () => {
    const repo = repoWith([{ date: "2026-10-01T12:00:00Z", subject: "base" }]);
    const env = (d: string) => Object.assign({}, process.env, { GIT_AUTHOR_DATE: d, GIT_COMMITTER_DATE: d });
    const run = (args: Array<string>, d: string) => execFileSync("git", args, { cwd: repo, env: env(d), stdio: "ignore" });
    run(["checkout", "-q", "-b", "side"], dates[0]);
    run(["commit", "-q", "--allow-empty", "-m", "side-commit"], "2026-11-04T12:00:00Z");
    run(["checkout", "-q", "master"], dates[0]);
    run(["commit", "-q", "--allow-empty", "-m", "main-commit"], "2026-11-02T12:00:00Z");
    run(["merge", "-q", "--no-ff", "-m", "merge", "side"], "2026-11-08T12:00:00Z");
    git(repo, ["update-ref", "refs/remotes/origin/master", "HEAD"]);
    const week = nightlyBuilds(repo, start, "master").find((x) => x.role === "week")!;
    expect(subj(repo, week.sha)).toBe("main-commit");
  });

  test("the branch comes from the project", () => {
    const a = nightlyBuilds(set(), start, "master");
    const repo = set({ branch: "main" });
    const b = nightlyBuilds(repo, start, "main");
    expect(b.map((x) => subj(repo, x.sha))).toEqual(a.map((x) => subj(repo, x.sha)));
    expect(() => nightlyBuilds(repo, start, "master")).toThrow(InfraError);
    expect(() => nightlyBuilds(repo, start, "master")).toThrow(/no origin\/master in the repo/);
    const sha = git(repo, ["rev-parse", "HEAD"]);
    expect(onDemandBuilds(repo, sha, "main").map((x) => x.role)).toEqual(["branch", "base"]);
  });

  test("an option-like branch is not read as a git flag", () => {
    const repo = set();
    expect(() => nightlyBuilds(repo, start, "--all")).toThrow(/no origin\/--all in the repo/);
  });
});

describe("onDemandBuilds", () => {
  test("on-demand: branch and its merge-base", () => {
    const repo = repoWith([{ date: "2026-11-04T12:00:00Z", subject: "base" }, { date: "2026-11-05T12:00:00Z", subject: "m1" }]);
    const base = git(repo, ["rev-parse", "HEAD~1"]);
    git(repo, ["checkout", "-q", "-b", "feature", base]);
    execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@e", "commit", "-q", "--allow-empty", "-m", "f1"], { cwd: repo });
    execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@e", "commit", "-q", "--allow-empty", "-m", "f2"], { cwd: repo });
    const tip = git(repo, ["rev-parse", "HEAD"]);
    const b = onDemandBuilds(repo, tip, "master");
    expect(b.map((x) => x.role)).toEqual(["branch", "base"]);
    expect(b[0].sha).toBe(tip);
    expect(b[1].sha).toBe(base);
    expect(b[1].sameAs).toBeUndefined();
  });

  test("base equal to the branch is sameAs", () => {
    const repo = repoWith([{ date: "2026-11-04T12:00:00Z", subject: "base" }]);
    const sha = git(repo, ["rev-parse", "HEAD"]);
    const b = onDemandBuilds(repo, sha, "master");
    expect(b[1].sameAs).toBe("branch");
  });
});

describe("pr", () => {
  test("commit range with PR numbers", () => {
    const repo = repoWith([
      { date: "2026-11-01T12:00:00Z", subject: "root" },
      { date: "2026-11-02T12:00:00Z", subject: "fix: x (#12277)" },
      { date: "2026-11-03T12:00:00Z", subject: "Merge pull request #12 from a/b" },
    ]);
    const from = git(repo, ["rev-parse", "HEAD~2"]);
    const r = commitRange(repo, from, "HEAD", "https://github.com/acme/widgets");
    expect(r.map((x) => x.pr)).toEqual([12, 12277]);
    expect(r[1].title).toBe("fix: x");
  });

  test("PR links follow the project repo", () => {
    const url = "https://github.com/acme/widgets";
    expect(prOf("abc", "fix: x (#12)", undefined, url).url).toBe(url + "/pull/12");
    expect(prOf("abc", "plain", undefined, url).url).toBe(url + "/commit/abc");
  });
});

describe("cloneRepo", () => {
  test("a clone of the mirror has origin/<branch> and the tags", () => {
    const mirror = set();
    git(mirror, ["tag", "v1.0.0"]);
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "perf-clone-"));
    const dir = path.join(tmp, "repo");
    cloneRepo(mirror, dir);
    expect(git(dir, ["rev-parse", "origin/master"])).toBe(git(mirror, ["rev-parse", "master"]));
    expect(git(dir, ["rev-parse", "v1.0.0^{commit}"])).toBe(git(mirror, ["rev-parse", "v1.0.0^{commit}"]));
    expect(nightlyBuilds(dir, start, "master").map((x) => x.sha)).toEqual(nightlyBuilds(mirror, start, "master").map((x) => x.sha));
    expect(() => cloneRepo(mirror, dir)).toThrow();
  });
});
