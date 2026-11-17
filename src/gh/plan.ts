// The plan job of the GitHub workflow: which builds the run measures, which scenario jobs it fans out to, and the
// outputs the other jobs read.
import * as path from "node:path";
import { nightlyBuilds, onDemandBuilds } from "../versions.ts";
import type { BuildSpec } from "../versions.ts";
import { loadManifest, planSuites, isBrowser } from "../contract.ts";
import type { Manifest } from "../contract.ts";
import type { Project } from "../project.ts";
import { git } from "../util/git.ts";
import { utcStamp } from "../util/format.ts";
import { InfraError, UsageError } from "../errors.ts";

export interface Inputs {
  kind: "nightly" | "on-demand";
  ref?: string;
  label?: string;
  suites: string[] | null;
  only: string[] | null;
  repeats: number;
}

export interface Job { suite: string, id: string, key: string, browser: boolean }

export interface RunPlan {
  project: string;
  kind: "nightly" | "on-demand";
  label?: string;
  ref?: string;
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

function listOf(v: string | undefined): string[] | null {
  const items = (v || "").split(/[\s,]+/).filter((s: string) => s !== "");
  return items.length > 0 ? items : null;
}

// The dispatch inputs (INPUT_*) and PERF_REPEATS from the environment; blank means absent.
export function parseInputs(env: NodeJS.ProcessEnv): Inputs {
  const kind = env.INPUT_KIND || "nightly";
  if (kind !== "nightly" && kind !== "on-demand") throw new UsageError("kind must be nightly or on-demand");
  const ref = (env.INPUT_REF || "").trim() || undefined;
  if (kind === "on-demand" && !ref) throw new UsageError("an on-demand run needs a ref");
  if (kind === "nightly" && ref) throw new UsageError("a nightly takes no ref");
  const raw = env.PERF_REPEATS === undefined || env.PERF_REPEATS === "" ? "5" : env.PERF_REPEATS;
  if (!/^[1-9]$/.test(raw)) throw new UsageError("PERF_REPEATS must be a whole number from 1 to 9");
  const label = (env.INPUT_LABEL || "").trim() || undefined;
  return { kind: kind, ref: ref, label: label, suites: listOf(env.INPUT_SUITES), only: listOf(env.INPUT_ONLY), repeats: Number(raw) };
}

// The name of a scenario's job and artifact: only letters, digits and "-".
export function jobKey(suite: string, id: string): string {
  return (suite + "-" + id).replace(/[^A-Za-z0-9-]/g, "_");
}

// One job per scenario of the chosen suites (`only` null: all the suite's ids). Two ids with one key stop the plan.
export function jobsOf(m: Manifest, chosen: Array<{ suite: string, only: string[] | null }>): Job[] {
  const jobs: Job[] = [];
  const seen: { [key: string]: string } = {};
  for (const c of chosen) {
    const sm = m.suites[c.suite];
    const ids = c.only ? sm.ids.filter((id: string) => (c.only as string[]).indexOf(id) > -1) : sm.ids;
    for (const id of ids) {
      const key = jobKey(c.suite, id);
      if (key in seen) throw new UsageError("two scenarios share the job key " + key + ": " + seen[key] + " and " + id);
      seen[key] = id;
      jobs.push({ suite: c.suite, id: id, key: key, browser: isBrowser(sm) });
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

function resolveRef(repo: string, ref: string): string {
  if (!/^(?!-)[A-Za-z0-9._\/-]+$/.test(ref)) throw new UsageError("bad ref " + ref);
  for (const name of ["origin/" + ref, ref]) {
    try {
      return git(repo, ["rev-parse", "--verify", "-q", name + "^{commit}"]);
    } catch(e) {
      // try the next name
    }
  }
  throw new UsageError("unknown ref " + ref);
}

// Decides the run: the builds, the runner (checked out as a worktree of `repo` in runnerDir, whose manifest lists
// the scenarios) and the jobs.
export function makePlan(i: Inputs, o: { project: Project, repo: string, runnerDir: string, start: Date }): RunPlan {
  const branch = o.project.branch;
  let specs: BuildSpec[];
  let runnerSha: string;
  if (i.kind === "nightly") {
    specs = nightlyBuilds(o.repo, o.start, branch);
    if (specs.length === 0 || specs[0].role !== "today") throw new InfraError("no commit of origin/" + branch + " before midnight UTC");
    runnerSha = git(o.repo, ["rev-parse", "--verify", "origin/" + branch + "^{commit}"]);
  } else {
    runnerSha = resolveRef(o.repo, i.ref as string);
    specs = onDemandBuilds(o.repo, runnerSha, branch);
    if (specs[0].role !== "branch") throw new InfraError("no commit of origin/" + branch + " before midnight UTC");
  }
  git(o.repo, ["worktree", "add", "--detach", "--", o.runnerDir, runnerSha]);
  const manifest = loadManifest(o.runnerDir);
  let chosen: Array<{ suite: string, only: string[] | null }>;
  try {
    chosen = planSuites(manifest, i.only, i.suites);
  } catch(e) {
    throw new UsageError((e as Error).message);
  }
  const jobs = jobsOf(manifest, chosen);
  checkLimit(jobs.length, specs.filter((s: BuildSpec) => !s.sameAs).length);
  const plan: RunPlan = {
    project: o.project.name,
    kind: i.kind,
    start: o.start.toISOString(),
    runId: runIdOf(o.start, runnerSha, i.kind),
    runnerSha: runnerSha,
    repeats: i.repeats,
    specs: specs,
    manifest: manifest,
    suites: chosen.map((c: { suite: string }) => c.suite),
    jobs: jobs,
  };
  const label = i.label || i.ref;
  if (label) plan.label = label;
  if (i.ref) plan.ref = i.ref;
  return plan;
}

// The folders the measuring jobs cache: every node_modules of the runner and the Playwright browsers.
export function cachePaths(runnerDir: string, p: Project, home: string): string[] {
  const dirs = p.tool.dirs.concat(p.tool.optional).map((d: string) => path.posix.join(runnerDir, d, "node_modules"));
  return dirs.concat([path.posix.join(home, ".cache/ms-playwright")]);
}

// The job outputs of the plan, all strings: the matrix, the reference build, the older builds that are built, the
// kind, the runner sha and the cache key and paths.
export function planOutputs(p: RunPlan, o: { project: Project, runnerDir: string, home: string, node: string }): Record<string, string> {
  const first = p.specs[0];
  const older = p.specs.slice(1).filter((s: BuildSpec) => !s.sameAs).map((s: BuildSpec) => ({ role: s.role, sha: s.sha }));
  return {
    jobs: JSON.stringify(p.jobs),
    reference: JSON.stringify({ role: first.role, sha: first.sha }),
    older: JSON.stringify(older),
    kind: p.kind,
    runner_sha: p.runnerSha,
    cache_key: "tool-linux-node" + o.node + "-" + p.runnerSha,
    cache_paths: cachePaths(o.runnerDir, o.project, o.home).join("\n"),
  };
}
