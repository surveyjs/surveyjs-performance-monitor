// The plan job of the GitHub workflow: which builds the run measures, which scenario jobs it fans out to, and the
// outputs the other jobs read.
import * as path from "node:path";
import { nightlyBuilds, pairedBuilds } from "../versions.ts";
import type { BuildSpec } from "../versions.ts";
import { loadManifest, suitesOf, isBrowser, expectedProduct } from "../contract.ts";
import type { Manifest } from "../contract.ts";
import type { Project } from "../project.ts";
import { git } from "../util/git.ts";
import { utcStamp } from "../util/format.ts";
import { InfraError, UsageError } from "../errors.ts";

export interface Inputs {
  repeats: number;
}

export interface Job { suite: string, id: string, key: string, browser: boolean }

export interface RunPlan {
  project: string;
  kind: "nightly";
  start: string;
  runId: string;
  runnerSha: string;
  repeats: number;
  specs: BuildSpec[];
  manifest: Manifest;
  suites: string[];
  jobs: Job[];
}

// GitHub's limit of jobs in one workflow run.
export const MAX_JOBS = 256;

// PERF_REPEATS from the environment; blank means the default, 5.
export function parseInputs(env: NodeJS.ProcessEnv): Inputs {
  const raw = env.PERF_REPEATS === undefined || env.PERF_REPEATS === "" ? "5" : env.PERF_REPEATS;
  if (!/^[1-9]$/.test(raw)) throw new UsageError("PERF_REPEATS must be a whole number from 1 to 9");
  return { repeats: Number(raw) };
}

// The name of a scenario's job and artifact: only letters, digits and "-".
export function jobKey(suite: string, id: string): string {
  return (suite + "-" + id).replace(/[^A-Za-z0-9-]/g, "_");
}

// One job per scenario of the given suites. Two ids with one key stop the plan.
export function jobsOf(m: Manifest, suites: string[]): Job[] {
  const jobs: Job[] = [];
  const seen: { [key: string]: string } = {};
  for (const suite of suites) {
    const sm = m.suites[suite];
    for (const id of sm.ids) {
      const key = jobKey(suite, id);
      if (key in seen) throw new UsageError("two scenarios share the job key " + key + ": " + seen[key] + " and " + id);
      seen[key] = id;
      jobs.push({ suite: suite, id: id, key: key, browser: isBrowser(sm) });
    }
  }
  return jobs;
}

// Stops a plan that does not fit the 256 jobs of a run: the scenario jobs and the build jobs count together.
export function checkLimit(jobs: number, builds: number): void {
  if (jobs + builds > MAX_JOBS) throw new UsageError(jobs + " scenario jobs and " + builds + " build jobs exceed GitHub's " + MAX_JOBS + " jobs per run");
}

// <UTC start as YYYYMMDDTHHMMSS>-<sha7>-<kind>
export function runIdOf(start: Date, sha: string, kind: string): string {
  return utcStamp(start) + "-" + sha.slice(0, 7) + "-" + kind;
}

// Decides the night: the builds, the runner (checked out as a worktree of `repo` in runnerDir, whose manifest lists
// the scenarios) and one job per scenario of every suite. A two-repo project also needs `sibling`, the library clone.
export function makePlan(i: Inputs, o: { project: Project, repo: string, sibling?: string, runnerDir: string, start: Date }): RunPlan {
  const branch = o.project.branch;
  let specs: BuildSpec[];
  if (o.project.library) {
    if (!o.sibling) throw new UsageError("a two-repo project needs the library clone");
    specs = pairedBuilds(o.repo, o.sibling, o.start, branch, o.project.library.branch);
  } else {
    specs = nightlyBuilds(o.repo, o.start, branch);
  }
  if (specs.length === 0 || specs[0].role !== "today") throw new InfraError("no commit of origin/" + branch + " before midnight UTC");
  const runnerSha = git(o.repo, ["rev-parse", "--verify", "origin/" + branch + "^{commit}"]);
  git(o.repo, ["worktree", "add", "--detach", "--", o.runnerDir, runnerSha]);
  const manifest = loadManifest(o.runnerDir, expectedProduct(o.project));
  const suites = suitesOf(manifest);
  const jobs = jobsOf(manifest, suites);
  checkLimit(jobs.length, specs.filter((s: BuildSpec) => !s.sameAs).length);
  const plan: RunPlan = {
    project: o.project.name,
    kind: "nightly",
    start: o.start.toISOString(),
    runId: runIdOf(o.start, runnerSha, "nightly"),
    runnerSha: runnerSha,
    repeats: i.repeats,
    specs: specs,
    manifest: manifest,
    suites: suites,
    jobs: jobs,
  };
  return plan;
}

// The folders the measuring jobs cache: every node_modules of the runner and the Playwright browsers.
export function cachePaths(runnerDir: string, p: Project, home: string): string[] {
  const dirs = p.tool.dirs.concat(p.tool.optional).map((d: string) => path.posix.join(runnerDir, d, "node_modules"));
  return dirs.concat([path.posix.join(home, ".cache/ms-playwright")]);
}

// The job outputs of the plan, all strings: the matrix, the reference build, the older builds that are built, the
// runner sha and the cache key and paths.
export function planOutputs(p: RunPlan, o: { project: Project, runnerDir: string, home: string, node: string }): Record<string, string> {
  const first = p.specs[0];
  const older = p.specs.slice(1).filter((s: BuildSpec) => !s.sameAs).map((s: BuildSpec) => ({ role: s.role, sha: s.sha }));
  return {
    jobs: JSON.stringify(p.jobs),
    reference: JSON.stringify({ role: first.role, sha: first.sha }),
    older: JSON.stringify(older),
    runner_sha: p.runnerSha,
    cache_key: "tool-" + o.project.name + "-linux-node" + o.node + "-" + p.runnerSha,
    cache_paths: cachePaths(o.runnerDir, o.project, o.home).join("\n"),
  };
}
