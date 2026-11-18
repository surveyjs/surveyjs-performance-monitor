// The command line of the GitHub workflow: every job of .github/workflows/night.yml calls one subcommand.
//   node src/gh/main.ts plan --work <dir> --runner-dir <dir> --out <dir>
//   node src/gh/main.ts build --plan <file> --role <role> --work <dir> --out <dir>
//   node src/gh/main.ts runner --plan <file> --dir <dir>
//   node src/gh/main.ts tool --plan <file> --runner <dir> --logs <dir>
//   node src/gh/main.ts measure --plan <file> --key <key> --runner <dir> --builds <dir> --out <dir> [--cores <list>]
//   node src/gh/main.ts report --plan-dir <dir> --builds <dir> --measures <dir> --out <dir> [--jobs <file>] [--lib <dir>] [--sibling <dir>]
//   node src/gh/main.ts send --dir <dir> [--dry]
//   node src/gh/main.ts history --from <dir> [--repo <dir>]
// Exit codes: 0 done, 2 a usage error (or a plan that did not start), 1 a failure or a crash. No subcommand prints the
// environment.
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";
import { cloneBlobless, fetchCommit, checkoutAt } from "./lib.ts";
import { parseInputs, makePlan, planOutputs } from "./plan.ts";
import type { RunPlan } from "./plan.ts";
import { buildRole } from "./build.ts";
import { measureScenario } from "./measure.ts";
import { runReport } from "./report-job.ts";
import type { JobInfo } from "./report-job.ts";
import { sendOutbox } from "./send.ts";
import { commitHistory } from "./history.ts";
import { installTool, npmFor, siblingStubs } from "../builds.ts";
import { chromePath } from "../overview.ts";
import { loadProject, projectsDir } from "../project.ts";
import type { Project } from "../project.ts";
import type { Role } from "../versions.ts";
import { readJson, writeJsonAtomic } from "../util/json.ts";
import { InfraError, UsageError } from "../errors.ts";

const FLAGS: Record<string, string[]> = { send: ["--dry"] };
const VALUED: Record<string, string[]> = {
  plan: ["--work", "--runner-dir", "--out"],
  build: ["--plan", "--role", "--work", "--out"],
  runner: ["--plan", "--dir"],
  tool: ["--plan", "--runner", "--logs"],
  measure: ["--plan", "--key", "--runner", "--builds", "--out", "--cores"],
  report: ["--plan-dir", "--builds", "--measures", "--out", "--jobs", "--lib", "--sibling"],
  send: ["--dir"],
  history: ["--from", "--repo"],
};
// The options each subcommand needs.
const REQUIRED: Record<string, string[]> = {
  plan: ["--work", "--runner-dir", "--out"],
  build: ["--plan", "--role", "--work", "--out"],
  runner: ["--plan", "--dir"],
  tool: ["--plan", "--runner", "--logs"],
  measure: ["--plan", "--key", "--runner", "--builds", "--out"],
  report: ["--plan-dir", "--builds", "--measures", "--out"],
  send: ["--dir"],
  history: ["--from"],
};

// Options whose value is not a path.
const PLAIN = ["--role", "--key", "--cores"];

interface Args { values: Record<string, string>, flags: Record<string, boolean> }

// Reads the options of `cmd`; every path-valued option becomes absolute, because the suites and Chrome run in other folders.
export function parseArgs(cmd: string, argv: string[]): Args {
  const values: Record<string, string> = {};
  const flags: Record<string, boolean> = {};
  const valued = VALUED[cmd];
  const flagNames = FLAGS[cmd] || [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (valued.indexOf(a) > -1) {
      const v = argv[i + 1];
      if (v === undefined || v.indexOf("--") === 0) throw new UsageError(a + " needs a value");
      values[a] = PLAIN.indexOf(a) > -1 ? v : path.resolve(v);
      i++;
    } else if (flagNames.indexOf(a) > -1) {
      flags[a] = true;
    } else {
      throw new UsageError("unknown option " + a);
    }
  }
  for (const r of REQUIRED[cmd]) if (values[r] === undefined) throw new UsageError(r + " is required");
  return { values: values, flags: flags };
}

// Stops a worker that has fewer than 4 cores when the run pins to `cores` (the measuring jobs pin to two of four).
export function checkCores(n: number, cores: string | undefined): void {
  if (cores && n < 4) throw new InfraError("expected 4 cores, got " + n);
}

function readPlan(file: string): RunPlan {
  const plan = readJson<RunPlan | null>(file, null);
  if (!plan) throw new UsageError("no plan at " + file);
  return plan;
}

function projectOf(env: NodeJS.ProcessEnv, name?: string): Project {
  return loadProject(projectsDir(env), name || env.PERF_PROJECT || "survey-library");
}

function libUrl(env: NodeJS.ProcessEnv, p: Project): string {
  return env.PERF_LIB_URL || p.repo;
}

// The clone URL of the library repository of a two-repo project; PERF_SIBLING_URL overrides it (tests).
export function siblingUrl(env: NodeJS.ProcessEnv, p: Project): string {
  if (!p.library) throw new UsageError("a one-repo project has no library repository");
  return env.PERF_SIBLING_URL || p.library.repo;
}

function messageOf(e: unknown): string {
  return (e as Error) && (e as Error).message ? (e as Error).message : String(e);
}

// A heredoc delimiter that does not occur in `value`.
function delimiterFor(value: string): string {
  for (;;) {
    const d = "PERF_EOF_" + randomBytes(8).toString("hex");
    if (value.indexOf(d) < 0) return d;
  }
}

function outputLines(outputs: Record<string, string>): string {
  let text = "";
  for (const k of Object.keys(outputs)) {
    const v = outputs[k];
    if (k === "cache_paths") {
      const d = delimiterFor(v);
      text += k + "<<" + d + "\n" + v + "\n" + d + "\n";
    } else {
      text += k + "=" + v + "\n";
    }
  }
  return text;
}

function cmdPlan(a: Args, env: NodeJS.ProcessEnv): number {
  const out = a.values["--out"];
  try {
    const project = projectOf(env);
    const inputs = parseInputs(env);
    const lib = path.join(a.values["--work"], "lib");
    fs.mkdirSync(a.values["--work"], { recursive: true });
    cloneBlobless(libUrl(env, project), lib);
    let sibling: string | undefined;
    if (project.library) {
      sibling = path.join(a.values["--work"], "sibling");
      cloneBlobless(siblingUrl(env, project), sibling);
    }
    const plan = makePlan(inputs, { project: project, repo: lib, sibling: sibling, runnerDir: a.values["--runner-dir"], start: new Date() });
    fs.mkdirSync(out, { recursive: true });
    const outputs = planOutputs(plan, { project: project, runnerDir: a.values["--runner-dir"], home: env.HOME || os.homedir(), node: process.versions.node });
    writeJsonAtomic(path.join(out, "plan.json"), plan);
    if (env.GITHUB_OUTPUT) fs.appendFileSync(env.GITHUB_OUTPUT, outputLines(outputs));
    return 0;
  } catch(e) {
    const reason = messageOf(e);
    fs.mkdirSync(out, { recursive: true });
    fs.rmSync(path.join(out, "plan.json"), { force: true });
    writeJsonAtomic(path.join(out, "failure.json"), { reason: reason });
    console.error("not started: " + reason);
    return 2;
  }
}

async function cmdBuild(a: Args, env: NodeJS.ProcessEnv): Promise<number> {
  const plan = readPlan(a.values["--plan"]);
  const role = a.values["--role"] as Role;
  const spec = plan.specs.find((s) => s.role === role);
  if (!spec) throw new UsageError("the plan has no build " + role);
  const project = projectOf(env, plan.project);
  const repo = path.join(a.values["--work"], "repo");
  fetchCommit(libUrl(env, project), spec.sha, repo);
  let libRepo: string | undefined;
  if (project.library) {
    if (!spec.lib) throw new UsageError("the plan has no library commit for " + role);
    libRepo = path.join(a.values["--work"], "sibling-repo");
    fetchCommit(siblingUrl(env, project), spec.lib.sha, libRepo);
  }
  const rec = await buildRole({ plan: plan, project: project, role: role, repo: repo, libRepo: libRepo, work: a.values["--work"], out: a.values["--out"] });
  if (rec.failed) console.error(role + " build failed: " + rec.failed);
  return rec.failed && role === plan.specs[0].role ? 1 : 0;
}

function cmdRunner(a: Args, env: NodeJS.ProcessEnv): number {
  const plan = readPlan(a.values["--plan"]);
  checkoutAt(libUrl(env, projectOf(env, plan.project)), plan.runnerSha, a.values["--dir"]);
  siblingStubs(a.values["--dir"], plan.manifest);
  return 0;
}

async function cmdTool(a: Args, env: NodeJS.ProcessEnv): Promise<number> {
  const plan = readPlan(a.values["--plan"]);
  const project = projectOf(env, plan.project);
  const runner = a.values["--runner"];
  try {
    await installTool(npmFor({ logs: a.values["--logs"] }), runner, project);
    return 0;
  } catch(e) {
    console.error(messageOf(e));
    const tail = newestLogTail(a.values["--logs"], 40);
    if (tail) console.error(tail);
    return 1;
  }
}

// The last `lines` lines of the most recently modified file of `dir`, prefixed with its name ("" when there is none).
export function newestLogTail(dir: string, lines: number): string {
  try {
    const files = fs.readdirSync(dir).map((f: string) => ({ f: f, p: path.join(dir, f) }))
      .filter((x: { p: string }) => fs.statSync(x.p).isFile())
      .map((x: { f: string, p: string }) => ({ f: x.f, p: x.p, t: fs.statSync(x.p).mtimeMs }))
      .sort((x: { t: number }, y: { t: number }) => y.t - x.t);
    if (files.length === 0) return "";
    const text = fs.readFileSync(files[0].p, "utf8").replace(/\n+$/, "");
    return files[0].f + ":\n" + text.split("\n").slice(-lines).map((l: string) => files[0].f + ": " + l).join("\n");
  } catch(e) {
    return "";
  }
}

async function cmdMeasure(a: Args, env: NodeJS.ProcessEnv): Promise<number> {
  const plan = readPlan(a.values["--plan"]);
  const job = plan.jobs.find((j) => j.key === a.values["--key"]);
  if (!job) throw new UsageError("the plan has no job " + a.values["--key"]);
  const project = projectOf(env, plan.project);
  const ac = new AbortController();
  const onSignal = (): void => {
    console.log("stop signal: the running measurement stops");
    ac.abort();
  };
  process.on("SIGTERM", onSignal);
  process.on("SIGINT", onSignal);
  try {
    const cores = a.values["--cores"];
    checkCores(os.availableParallelism(), cores);
    fs.mkdirSync(a.values["--out"], { recursive: true });
    await measureScenario({ plan: plan, project: project, job: job, runner: a.values["--runner"], builds: a.values["--builds"], out: a.values["--out"],
      slot: cores || null, signal: ac.signal });
    return 0;
  } catch(e) {
    console.error(messageOf(e));
    return 1;
  } finally {
    process.removeListener("SIGTERM", onSignal);
    process.removeListener("SIGINT", onSignal);
  }
}

// `gh api --jq` prints one compact JSON object per line; any problem means no list.
function readJobs(file: string | undefined): JobInfo[] | undefined {
  if (!file) return undefined;
  const unusable = (why: string): undefined => {
    console.error("warning: --jobs " + file + " unusable (" + why + "); the report goes on without job links");
    return undefined;
  };
  let lines: string[];
  try {
    lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  } catch(e) {
    return unusable("unreadable");
  }
  const jobs: JobInfo[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "") continue;
    let v: unknown;
    try {
      v = JSON.parse(lines[i]);
    } catch(e) {
      return unusable("line " + (i + 1) + ": not JSON");
    }
    const j = v as Record<string, unknown> | null;
    if (typeof v !== "object" || j === null || typeof j.name !== "string" || typeof j.html_url !== "string"
      || (j.conclusion !== null && typeof j.conclusion !== "string")) return unusable("line " + (i + 1) + ": not a job object");
    jobs.push(j as unknown as JobInfo);
  }
  return jobs;
}

async function cmdReport(a: Args, env: NodeJS.ProcessEnv): Promise<number> {
  const planFile = path.join(a.values["--plan-dir"], "plan.json");
  const plan = readJson<RunPlan | null>(planFile, null);
  let lib: string | undefined;
  if (plan && a.values["--lib"]) {
    try {
      cloneBlobless(libUrl(env, projectOf(env, plan.project)), a.values["--lib"]);
      lib = a.values["--lib"];
    } catch(e) {
      console.error("warning: no commit list: " + messageOf(e));
    }
  }
  let sibling: string | undefined;
  if (plan && a.values["--sibling"]) {
    const project = projectOf(env, plan.project);
    if (project.library) {
      try {
        cloneBlobless(siblingUrl(env, project), a.values["--sibling"]);
        sibling = a.values["--sibling"];
      } catch(e) {
        console.error("warning: no library commit list: " + messageOf(e));
      }
    }
  }
  const runUrl = (env.GITHUB_SERVER_URL || "https://github.com") + "/" + (env.GITHUB_REPOSITORY || "") + "/actions/runs/" + (env.GITHUB_RUN_ID || "");
  const k = await runReport({
    planDir: a.values["--plan-dir"], buildsDir: a.values["--builds"], measuresDir: a.values["--measures"], out: a.values["--out"],
    results: { plan: env.RESULT_PLAN || "", buildToday: env.RESULT_BUILD_TODAY || "", buildOlder: env.RESULT_BUILD_OLDER || "", measure: env.RESULT_MEASURE || "" },
    kind: "nightly", project: (plan && plan.project) || env.PERF_PROJECT || "survey-library", runUrl: runUrl, projectsDir: projectsDir(env), now: new Date(),
    jobs: readJobs(a.values["--jobs"]), lib: lib, sibling: sibling,
    // Chromium under Playwright's own folder; a test points PERF_CHROME_ROOT elsewhere.
    chrome: chromePath(env.PERF_CHROME_ROOT),
  });
  console.log(k);
  return 0;
}

async function cmdSend(a: Args, env: NodeJS.ProcessEnv): Promise<number> {
  try {
    const project = projectOf(env);
    await sendOutbox(a.values["--dir"], { webhook: env[project.discordEnv], envName: project.discordEnv, dry: !!a.flags["--dry"], summary: env.GITHUB_STEP_SUMMARY });
    return 0;
  } catch(e) {
    console.error(messageOf(e));
    return 1;
  }
}

// The <project>/<run id> folders two levels under `from`, sorted.
function runFolders(from: string): string[] {
  const res: string[] = [];
  if (!fs.existsSync(from)) return res;
  for (const p of fs.readdirSync(from, { withFileTypes: true })) {
    if (!p.isDirectory()) continue;
    for (const r of fs.readdirSync(path.join(from, p.name), { withFileTypes: true })) if (r.isDirectory()) res.push(p.name + "/" + r.name);
  }
  return res.sort();
}

async function cmdHistory(a: Args): Promise<number> {
  const from = a.values["--from"];
  const folders = runFolders(from);
  try {
    const r = await commitHistory({ repo: a.values["--repo"] || process.cwd(), from: from, branch: "history", message: "report " + (folders.join(", ") || "nothing") });
    console.log(r);
    return 0;
  } catch(e) {
    console.error(messageOf(e));
    return 1;
  }
}

// Runs one subcommand and returns the exit code: 2 for a usage error, 1 for a failure.
export async function main(argv: string[], env: NodeJS.ProcessEnv = process.env): Promise<number> {
  const cmd = argv[0];
  if (!cmd || !(cmd in VALUED)) {
    console.error("usage: main.ts <" + Object.keys(VALUED).join("|") + "> [options]");
    return 2;
  }
  let a: Args;
  try {
    a = parseArgs(cmd, argv.slice(1));
  } catch(e) {
    if (!(e instanceof UsageError)) throw e;
    console.error(e.message);
    return 2;
  }
  try {
    switch(cmd) {
      case "plan": return cmdPlan(a, env);
      case "build": return await cmdBuild(a, env);
      case "runner": return cmdRunner(a, env);
      case "tool": return await cmdTool(a, env);
      case "measure": return await cmdMeasure(a, env);
      case "report": return await cmdReport(a, env);
      case "send": return await cmdSend(a, env);
      default: return await cmdHistory(a);
    }
  } catch(e) {
    if (!(e instanceof UsageError)) throw e;
    console.error(e.message);
    return 2;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then((code: number) => { process.exitCode = code; }, (e: unknown) => {
    console.error((e as Error) && (e as Error).stack ? (e as Error).stack : String(e));
    // Not 2, the usage error: a crash.
    process.exitCode = 1;
  });
}
