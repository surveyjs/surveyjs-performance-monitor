import * as fs from "node:fs";
import * as path from "node:path";
import { spawn, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { git, headCommit } from "./util/git.ts";
import { writeJsonAtomic } from "./util/json.ts";
import { utcStamp } from "./util/stamp.ts";
import type { Suite, ResultFile, ResultEntry } from "./library/contract.ts";
import { annotate } from "./library/contract.ts";
import type { Manifest } from "./library/manifest.ts";
import { loadManifest, parseOnly, idsOfSuite, packageOf, uiSourceDirs } from "./library/manifest.ts";
import type { Comparison, ScenarioVerdict, CompareInput, CounterVerdict } from "./judge/compare.ts";
import { judge, finalize, loadInput, markdownTable, compareFileOf } from "./judge/compare.ts";
import type { KnownChange } from "./judge/known.ts";
import { readKnown, writeKnown, applyNight } from "./judge/known.ts";
import { advanceRatchet, readRatchet, writeRatchet } from "./judge/reference.ts";
import type { Baseline, BaselineBuild } from "./judge/baseline.ts";
import { buildBaseline, writeBaseline, readBaseline, defaultTolerance } from "./judge/baseline.ts";
import { baselineFile, baselineFiles, newestBaseline, readJson, writeJson } from "./judge/state.ts";
import { environmentOf, readLoad, parseCpuList } from "./gate.ts";
import type { Message, SuiteReport, BisectReport } from "./discord.ts";
import { resultMessage, bisectMessage, plainMessage, limits, stripAnsi } from "./discord.ts";
import { installKeyOfDir, needsInstall, writeKey, installedList, depsDiff } from "./install-key.ts";
import type { BisectCandidate, LastNightly, NightSuite, PendingRecord } from "./plan.ts";
import { planSuites, planReruns, nextLastNightly, chooseBisects, measuredKey, pendingNight } from "./plan.ts";
import { repoUrl } from "./pr.ts";
import { firstParentRange, commitPr, rangePrs, search, markBisect, bisectDue } from "./bisect.ts";

// The container side of a night: slots, installs, builds, suites, compare, reruns, payloads, state, bisect.
// node src/nightly.ts [--runner <dir>] [--nightly] [--ref <ref>] [--sha <sha>] [--label <text>] [--suites a,b]
//   [--only ids] [--record] [--bisect <good>..<bad>] [--no-bisect] [--reinstall] [--repo <dir>] [--history <dir>]
//   [--host-run <dir>] [--image <tag>] [--dry-post]
// node src/nightly.ts --prepare --mirror <dir> --tool-sha <sha> [--suites a,b] [--only ids] [--bisect <good>..<bad>]
// The tests come from a survey-library checkout (the tool, or --runner): its perf/manifest.ts names the suites, their
// ids, budgets and commands (its perf/CONTRACT.md).
// PERF_STATE_DIR is required. Exit codes: 0 done, 1 the night has failing verdicts, 3 an infrastructure failure
// (posted), 2 a usage error; anything else is a crash, which run.sh posts.
const bisectBudgetMin = 40;
const maxBisects = 2;
const isWindows = process.platform === "win32";

export interface Options {
  runner?: string;
  kind: "nightly" | "on-demand" | "record";
  ref: string;
  sha?: string;
  label?: string;
  suites: Array<Suite>;
  only: Array<string> | null;
  bisect?: string;
  noBisect: boolean;
  reinstall: boolean;
  repo?: string;
  history?: string;
  // The host's folder of this run, read-only (run.sh): the gate result and the load samples.
  hostRun?: string;
  image: string;
  dryPost: boolean;
  // --prepare (run.sh, before the gate): fetch the state directory's clone from the mirror, move the tool to toolSha,
  // check the options against its manifest.
  prepare: boolean;
  mirror?: string;
  toolSha?: string;
}

export function parseArgs(argv: Array<string>): Options {
  const flag = (name: string): boolean => argv.indexOf(name) > -1;
  const opt = (name: string): string | undefined => {
    const i = argv.indexOf(name);
    if (i < 0) return undefined;
    if (argv[i + 1] === undefined || argv[i + 1].indexOf("--") === 0) throw new Error(name + " needs a value");
    return argv[i + 1];
  };
  const known = ["--runner", "--nightly", "--ref", "--sha", "--label", "--suites", "--only", "--record", "--bisect", "--no-bisect", "--reinstall",
    "--repo", "--history", "--host-run", "--image", "--dry-post", "--check-args", "--prepare", "--mirror", "--tool-sha"];
  argv.filter((a: string) => a.indexOf("--") === 0).forEach((a: string) => { if (known.indexOf(a) < 0) throw new Error("unknown option " + a); });
  const o: Options = {
    runner: opt("--runner"), kind: flag("--record") ? "record" : flag("--nightly") ? "nightly" : "on-demand", ref: opt("--ref") || "origin/master",
    sha: opt("--sha"), label: opt("--label"), suites: (opt("--suites") || "core,react,survey-js-ui").split(",").map((s: string) => s.trim()) as Array<Suite>,
    only: parseOnly(opt("--only")), bisect: opt("--bisect"), noBisect: flag("--no-bisect"), reinstall: flag("--reinstall"), repo: opt("--repo"),
    history: opt("--history"), hostRun: opt("--host-run"), image: opt("--image") || process.env.PERF_IMAGE || "local", dryPost: flag("--dry-post"),
    prepare: flag("--prepare"), mirror: opt("--mirror"), toolSha: opt("--tool-sha")
  };
  if (o.prepare && (!o.mirror || !o.toolSha)) throw new Error("--prepare needs --mirror <dir> and --tool-sha <sha>");
  if (o.bisect && !o.only) throw new Error("--bisect needs --only <id>");
  if (o.bisect && !/^.+?\.\..+$/.test(o.bisect)) throw new Error("--bisect takes <good>..<bad>");
  return o;
}

// A failure that stops the night before anything is judged, posted as such, never as a regression: "infrastructure"
// (installs, network, a checkout) or "build" (the target's survey-core does not build: a product failure).
class InfraError extends Error {
  log?: string;
  what: string;
  constructor(message: string, log?: string, what: string = "infrastructure failure") {
    super(message);
    this.log = log;
    this.what = what;
  }
}

// A ref of a local run: origin/<ref> when that exists (run.sh passes shas on the server), else as given.
function resolveRef(repo: string, ref: string): string {
  try {
    return git(repo, ["rev-parse", "--verify", "-q", "origin/" + ref + "^{commit}"]);
  } catch(e) {
    return git(repo, ["rev-parse", "--verify", ref + "^{commit}"]);
  }
}

function log(text: string): void {
  console.log("[" + new Date().toISOString().substring(11, 19) + "] " + text);
}

function tail(file: string, n: number): Array<string> {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").replace(stripAnsi, "").split(/\r?\n/).filter((l: string) => !!l.trim()).slice(-n);
}

// The lines of a build log that say what failed (the error lines, not the stack), else its last lines.
function errorLines(file: string, n: number): Array<string> {
  const lines = tail(file, 400).filter((l: string) => /error|ERR!|failed/i.test(l) && !/^\s+at /.test(l));
  return lines.length ? lines.slice(0, n) : tail(file, n);
}

interface RunResult { code: number | null, timedOut: boolean }

// Runs a command with its output appended to a log file; past timeoutMs it gets SIGTERM, and SIGKILL 30 s later.
function runLogged(cmd: string, args: Array<string>, options: { cwd: string, env?: NodeJS.ProcessEnv, logFile: string, timeoutMs?: number, echo?: boolean }): Promise<RunResult> {
  fs.mkdirSync(path.dirname(options.logFile), { recursive: true });
  const out = fs.openSync(options.logFile, "a");
  fs.writeSync(out, "$ " + cmd + " " + args.join(" ") + "   (in " + options.cwd + ")\n");
  return new Promise((resolve: (r: RunResult) => void) => {
    const proc = spawn(cmd, args, { cwd: options.cwd, env: options.env || process.env, stdio: ["ignore", "pipe", "pipe"] });
    let timedOut = false;
    let killer: NodeJS.Timeout | undefined;
    const timer = options.timeoutMs ? setTimeout(() => {
      timedOut = true;
      proc.kill("SIGTERM");
      killer = setTimeout(() => proc.kill("SIGKILL"), 30000);
    }, options.timeoutMs) : undefined;
    const write = (d: Buffer): void => {
      fs.writeSync(out, d);
      if (options.echo) process.stdout.write(d);
    };
    proc.stdout.on("data", write);
    proc.stderr.on("data", write);
    proc.on("error", (e: any) => { fs.writeSync(out, String(e) + "\n"); });
    proc.on("close", (code: number | null) => {
      if (timer) clearTimeout(timer);
      if (killer) clearTimeout(killer);
      fs.closeSync(out);
      resolve({ code: code, timedOut: timedOut });
    });
  });
}

// npm: on Windows through node and npm-cli.js, since npm.cmd needs a shell.
const npm = isWindows ? process.execPath : "npm";
const npmArgs = (args: Array<string>): Array<string> => (isWindows ? [path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js")].concat(args) : args);

// The paths of one run.
export interface Ctx {
  o: Options;
  state: string;
  tool: string;
  repo: string;
  history: string;
  runId: string;
  sha: string;
  started: Date;
  phases: Array<{ name: string, sec: number }>;
  logs: string;
  local: boolean;
  // The tool's perf/manifest.ts: suites, ids, budgets, commands, UI packages and this process's machine key.
  m: Manifest;
  // Where run.sh's gate.json and load.jsonl are: --host-run on the server, else the history folder (a local run).
  hostRun: string;
}

async function phase<T>(ctx: Ctx, name: string, fn: () => Promise<T>): Promise<T> {
  const t0 = Date.now();
  log("phase " + name);
  try {
    return await fn();
  } finally {
    ctx.phases.push({ name: name, sec: Math.round((Date.now() - t0) / 100) / 10 });
    writeJsonAtomic(path.join(ctx.history, "phases.json"), ctx.phases);
  }
}

function npmEnv(ctx: Ctx, ignoreScripts: boolean): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = Object.assign({}, process.env, { PUPPETEER_SKIP_DOWNLOAD: "true", HUSKY: "0" });
  if (!ctx.local) env.npm_config_cache = path.join(ctx.state, "npm-cache");
  if (ignoreScripts) env.npm_config_ignore_scripts = "true";
  return env;
}

// A folder is reinstalled only when its install key changes (or --reinstall).
async function install(ctx: Ctx, dir: string, name: string, ignoreScripts: boolean, extraArgs: Array<string> = []): Promise<boolean> {
  if (!needsInstall(dir, ctx.o.image, ctx.o.reinstall)) return false;
  const logFile = path.join(ctx.logs, "install-" + name + ".log");
  const t0 = Date.now();
  const r = await runLogged(npm, npmArgs(["install", "--no-audit", "--no-fund", "--no-package-lock"].concat(extraArgs)), { cwd: dir, env: npmEnv(ctx, ignoreScripts), logFile: logFile });
  if (r.code !== 0) throw new InfraError("npm install failed in " + name, logFile);
  writeKey(dir, installKeyOfDir(dir, ctx.o.image));
  log("installed " + name + " in " + Math.round((Date.now() - t0) / 1000) + " s");
  return true;
}

async function npmRun(ctx: Ctx, dir: string, script: string, logFile: string): Promise<boolean> {
  const r = await runLogged(npm, npmArgs(["run", script]), { cwd: dir, env: npmEnv(ctx, false), logFile: logFile });
  return r.code === 0;
}

// Slots: work/target and work/bisect are cleaned once per run; between bisect steps only a checkout and a
// clean that keeps node_modules and build/.
// core.longpaths: the screenshot etalons have long names, and a local state folder can be deep (Windows only).
function prepareSlot(repo: string, dir: string, sha: string, full: boolean): void {
  try {
    if (!fs.existsSync(path.join(dir, ".git"))) {
      fs.rmSync(dir, { recursive: true, force: true });
      git(repo, ["worktree", "prune"]);
      fs.mkdirSync(path.dirname(dir), { recursive: true });
      git(repo, ["-c", "core.longpaths=true", "worktree", "add", "--force", "--detach", dir, sha]);
      return;
    }
    git(dir, ["-c", "core.longpaths=true", "checkout", "--force", "--detach", sha]);
    git(dir, ["-c", "core.longpaths=true"].concat(full ? ["clean", "-ffdx", "-e", "node_modules"] : ["clean", "-ffd", "-e", "node_modules", "-e", "build"]));
  } catch(e: any) {
    throw new InfraError("checkout of " + sha.substring(0, 9) + " in " + path.basename(dir) + " failed: " + String(e.message || e).split("\n").filter((l: string) => /error|fatal/.test(l)).join(" ").substring(0, 300));
  }
}

// The state directory's own clone of survey-library: its origin is the host's bare mirror, mounted read-only, whose
// refs/remotes/origin/* and tags it copies. The host never runs git in the state directory (run.sh), so whatever a
// target writes here reaches no git the host runs.
export function syncRepo(repo: string, mirror: string): void {
  if (!fs.existsSync(path.join(repo, ".git"))) {
    fs.rmSync(repo, { recursive: true, force: true });
    fs.mkdirSync(repo, { recursive: true });
    git(repo, ["init", "--quiet"]);
    git(repo, ["remote", "add", "origin", mirror]);
  }
  git(repo, ["config", "remote.origin.url", mirror]);
  git(repo, ["config", "--replace-all", "remote.origin.fetch", "+refs/remotes/origin/*:refs/remotes/origin/*"]);
  git(repo, ["config", "--add", "remote.origin.fetch", "+refs/tags/*:refs/tags/*"]);
  git(repo, ["fetch", "--prune", "--quiet", "origin"]);
}

// The budgets of all the manifest's suites in whole minutes, whatever --suites says: run.sh sets the container's limit
// from it (its `budget: <B>` line in prepare.log).
export function budgetSum(m: Manifest): number {
  return Math.ceil(Object.keys(m.suites).reduce((n: number, s: string) => n + m.suites[s].budgetMin, 0));
}

// run.sh's prepare step, in a container without network before the gate: the clone, the tool at master, and the
// options checked against the tool's manifest, so a typo is not found an hour later as a crash.
function prepare(o: Options, state: string): number {
  const repo = path.join(state, "repo");
  const tool = path.join(state, "work", "tool");
  fs.mkdirSync(path.join(state, "home"), { recursive: true });
  syncRepo(repo, path.resolve(o.mirror as string));
  prepareSlot(repo, tool, o.toolSha as string, false);
  const m = loadManifest(tool);
  // A whole line with no time stamp: the host matches it exactly.
  console.log("budget: " + budgetSum(m));
  planSuites(m, o.bisect ? (o.only as Array<string>).slice(0, 1) : o.only, o.suites);
  log("prepared: tool " + (o.toolSha as string).substring(0, 9) + ", runner contract " + m.contract + "; options ok");
  return 0;
}

export interface TargetBuild {
  dir: string;
  core: string;
  ui: { [suite: string]: string | undefined };
  uiFailed: { [suite: string]: string };
  deps: Array<string>;
}

// Installs and builds a checkout for the given suites: root, survey-core, its build, then each UI's install and build.
// A failed survey-core build is an InfraError for the night (it stops the run); a failed UI build marks that suite.
// survey-core: build and build:i18n; the UIs also import survey-core/icons, so build:icons when a browser suite runs (an
// old ref without that script skips it).
async function buildCore(ctx: Ctx, core: string, logFile: string, forUi: boolean): Promise<boolean> {
  if (!await npmRun(ctx, core, "build", logFile) || !await npmRun(ctx, core, "build:i18n", logFile)) return false;
  const scripts = JSON.parse(fs.readFileSync(path.join(core, "package.json"), "utf8")).scripts || {};
  return !forUi || !scripts["build:icons"] || npmRun(ctx, core, "build:icons", logFile);
}

async function buildCheckout(ctx: Ctx, dir: string, suites: Array<Suite>, label: string, isTool: boolean, onlyUis?: Array<Suite>): Promise<TargetBuild> {
  const core = path.join(dir, "packages", "survey-core");
  await install(ctx, dir, label + "-root", !isTool);
  await install(ctx, core, label + "-survey-core", false);
  const coreLog = path.join(ctx.logs, "build-" + label + "-survey-core.log");
  if (!await buildCore(ctx, core, coreLog, suites.some((s: Suite) => s !== "core"))) throw new InfraError("survey-core does not build (" + label + ")", coreLog, "build failed");
  const res: TargetBuild = { dir: dir, core: path.join(core, "build"), ui: {}, uiFailed: {}, deps: [] };
  for (const s of suites) {
    if (s === "core" || (onlyUis && onlyUis.indexOf(s) < 0)) continue;
    const pkg = path.join(dir, "packages", packageOf(ctx.m, s));
    await install(ctx, pkg, label + "-" + packageOf(ctx.m, s), false);
    const uiLog = path.join(ctx.logs, "build-" + label + "-" + packageOf(ctx.m, s) + ".log");
    if (await npmRun(ctx, pkg, "build", uiLog)) res.ui[s] = path.join(pkg, "build");
    else res.uiFailed[s] = uiLog;
  }
  const dirs = [dir, core].concat(suites.filter((s: Suite) => s !== "core").map((s: Suite) => path.join(dir, "packages", packageOf(ctx.m, s))));
  res.deps = installedList(dirs);
  return res;
}

// The tool (the runner): root, survey-core, perf/react19; the UIs when the tool's survey-core build exists (their
// devDependency links to it). The Playwright check: the installed @playwright/test must be the image's.
async function installTool(ctx: Ctx): Promise<void> {
  await install(ctx, ctx.tool, "tool-root", false);
  await install(ctx, path.join(ctx.tool, "packages", "survey-core"), "tool-survey-core", false);
  await install(ctx, path.join(ctx.tool, "perf", "react19"), "tool-react19", false);
  if (fs.existsSync(path.join(ctx.tool, "packages", "survey-core", "build", "package.json"))) {
    for (const s of ["react", "survey-js-ui"] as Array<Suite>) await install(ctx, path.join(ctx.tool, "packages", packageOf(ctx.m, s)), "tool-" + packageOf(ctx.m, s), false);
  }
  checkPlaywright(ctx);
}

function checkPlaywright(ctx: Ctx): void {
  const want = process.env.PW_VERSION;
  const file = path.join(ctx.tool, "node_modules", "@playwright", "test", "package.json");
  const have = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")).version : null;
  if (want && have !== want) throw new InfraError("@playwright/test " + have + " in the tool, the image has " + want + ": rebuild the image");
  log("@playwright/test " + have + (want ? " (image " + want + ")" : " (no PW_VERSION: not in the image)"));
}

interface SuiteRun {
  suite: Suite;
  file: string;
  status: string;
  result?: ResultFile;
  logFile: string;
}

function suiteEnv(ctx: Ctx, extra: { [name: string]: string | undefined }): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = Object.assign({}, process.env, { PERF_RESULTS_DIR: ctx.history });
  ["PERF_ONLY", "PERF_RESULT_FILE", "PERF_CORE_DIR", "PERF_UI_DIR", "PERF_TARGET_COMMIT"].forEach((k: string) => { delete env[k]; });
  for (const k in extra) if (extra[k] !== undefined) env[k] = extra[k];
  return env;
}

// One suite run in fresh processes: over its budget + 50% it gets SIGTERM and writes incomplete. After it,
// annotate writes the environment block from the sampler's lines.
async function runSuite(ctx: Ctx, suite: Suite, file: string, env: { [name: string]: string | undefined }, logName: string): Promise<SuiteRun> {
  const logFile = path.join(ctx.logs, logName + ".log");
  const fullEnv = suiteEnv(ctx, Object.assign({ PERF_RESULT_FILE: file }, env));
  const sm = ctx.m.suites[suite];
  const timeoutMs = sm.budgetMin * 1.5 * 60000;
  const from = Date.now() / 1000;
  const r = await runLogged(process.execPath, [path.join(ctx.tool, sm.script)].concat(sm.args), { cwd: path.join(ctx.tool, sm.cwd), env: fullEnv, logFile: logFile,
    timeoutMs: timeoutMs });
  const to = Date.now() / 1000;
  if (env.PERF_ONLY === "calibration") return { suite: suite, file: file, status: r.code === 0 ? "ok" : "failed", logFile: logFile };
  if (!fs.existsSync(file)) return { suite: suite, file: file, status: r.timedOut ? "timed out" : "failed (no result file, exit " + r.code + ")", logFile: logFile };
  const result = annotate(file, environment(ctx, from, to));
  const status = r.timedOut ? "timed out" : "ok";
  log(suite + " (" + logName + "): " + result.results.length + " measured, " + result.failed.length + " failed, " + Math.round(to - from) + " s" + (r.timedOut ? ", timed out" : ""));
  return { suite: suite, file: file, status: status, result: result, logFile: logFile };
}

function environment(ctx: Ctx, from: number, to: number): any {
  const gateFile = path.join(ctx.hostRun, "gate.json");
  const gate = fs.existsSync(gateFile) ? readJson<any>(gateFile, null) : null;
  const num = (v: string | undefined): number | undefined => (v ? Number(v) : undefined);
  return environmentOf(readLoad(path.join(ctx.hostRun, "load.jsonl")), { from: from, to: to, pinned: parseCpuList(process.env.PERF_CPUS),
    maxOther: num(process.env.PERF_MAX_OTHER_CORES), gate: gate, requireSamples: !ctx.local });
}

// A message directory: payload.json, the files, files.txt (their order), then "ready" for run.sh.
export function writeMessage(dir: string, m: Message, sources: { [name: string]: string }): void {
  fs.mkdirSync(dir, { recursive: true });
  const names: Array<string> = [];
  m.files.forEach((f: string) => {
    const name = path.basename(f);
    const src = sources[name] || f;
    if (!fs.existsSync(src) || fs.statSync(src).size > limits.fileBytes) return;
    if (path.resolve(src) !== path.resolve(dir, name)) fs.copyFileSync(src, path.join(dir, name));
    names.push(name);
  });
  m.payload.attachments = names.map((n: string, i: number) => ({ id: i, filename: n }));
  writeJsonAtomic(path.join(dir, "payload.json"), m.payload);
  fs.writeFileSync(path.join(dir, "files.txt"), names.join("\n") + (names.length ? "\n" : ""));
  fs.writeFileSync(path.join(dir, "ready"), new Date().toISOString() + "\n");
}

// The exact curl argv run.sh uses, with the webhook replaced by <webhook> (--dry-post).
export function curlArgv(dir: string): Array<string> {
  const names = fs.readFileSync(path.join(dir, "files.txt"), "utf8").split(/\r?\n/).filter((s: string) => !!s);
  const argv = ["curl", "--fail-with-body", "-sS", "-D", "<hdr>", "-K", "<(printf 'url = \"%s\"\\n' '<webhook>?wait=true')",
    "-F", "payload_json=<payload.json;type=application/json"];
  names.forEach((n: string, i: number) => argv.push("-F", "files[" + i + "]=@" + n));
  return argv;
}

function printDry(dir: string): void {
  console.log("\n--- dry post " + path.basename(dir) + " (cd " + dir + ") ---");
  console.log(curlArgv(dir).join(" "));
  console.log(fs.readFileSync(path.join(dir, "payload.json"), "utf8"));
}

// du over the worktrees' node_modules takes seconds on Linux and half an hour on Windows: not measured there.
function stateSize(state: string): string {
  if (isWindows) return "n/a";
  try {
    const kb = Number(execFileSync("du", ["-sk", state], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 60000 }).split(/\s/)[0]);
    return kb > 1048576 ? (kb / 1048576).toFixed(1) + " GB" : Math.round(kb / 1024) + " MB";
  } catch(e) {
    return "n/a";
  }
}

function tarResults(ctx: Ctx, files: Array<string>, name: string = "results.tar.gz"): string | undefined {
  const out = path.join(ctx.history, name);
  const rel = files.filter((f: string) => fs.existsSync(f)).map((f: string) => path.relative(ctx.history, f).split(path.sep).join("/"));
  if (!rel.length) return undefined;
  try {
    execFileSync("tar", ["-czf", name].concat(rel), { cwd: ctx.history, stdio: "ignore" });
    return out;
  } catch(e) {
    log("tar failed: " + String(e).split("\n")[0]);
    return undefined;
  }
}

interface Judged {
  suite: Suite;
  run: SuiteRun;
  input?: CompareInput;
  first?: Comparison;
  final?: Comparison;
  known?: KnownChange;
  baseline?: Baseline;
}

function previousResultOf(ctx: Ctx, suite: Suite): string | undefined {
  const last = readJson<LastNightly | null>(path.join(ctx.state, "last-nightly.json"), null);
  const f = last && last.suites[suite] ? last.suites[suite].lastJudged.result : undefined;
  return f && fs.existsSync(f) ? f : undefined;
}

function unstableOf(b: Baseline | undefined): Array<string> {
  return b ? Object.keys(b.scenarios).filter((id: string) => b.scenarios[id].unstable).sort() : [];
}

// The target of the night: the tool itself when the ref is the tool's commit on the server, else work/target.
async function buildTarget(ctx: Ctx, suites: Array<Suite>): Promise<TargetBuild> {
  const toolSha = headCommit(ctx.tool);
  if (!ctx.local && toolSha === ctx.sha) {
    log("target = tool (" + ctx.sha.substring(0, 9) + ")");
    // The same clean as a target slot: no build output or untracked file survives from an earlier night.
    git(ctx.tool, ["clean", "-ffdxq", "-e", "node_modules"]);
    return buildCheckout(ctx, ctx.tool, suites, "tool", true);
  }
  const dir = path.join(ctx.state, "work", "target");
  prepareSlot(ctx.repo, dir, ctx.sha, true);
  return buildCheckout(ctx, dir, suites, "target", false);
}

function depsNote(ctx: Ctx, list: Array<string>): string | undefined {
  const file = path.join(ctx.state, "deps-last.json");
  const prev = readJson<{ list: Array<string> } | null>(file, null);
  if (ctx.o.kind === "nightly") writeJson(file, { list: list, commit: ctx.sha });
  if (!prev) return undefined;
  const diff = depsDiff(prev.list, list);
  return diff ? "dependencies changed: " + diff : undefined;
}

// --- the night ---------------------------------------------------------------------------------------------------

async function night(ctx: Ctx): Promise<number> {
  const plan = planSuites(ctx.m, ctx.o.only, ctx.o.suites);
  if (!plan.length) throw new Error("no suite has any of the requested ids");
  // A new machine key: the next nightly records the pending suites, at most twice, and runs the other suites as a
  // night; after two attempts the night is judged as usual (times not judged for those suites) and the post asks for a
  // --record by hand.
  const pendingFile = path.join(ctx.state, "record-pending.json");
  const pn = pendingNight(plan, readJson<PendingRecord | null>(pendingFile, null), ctx.o.kind, ctx.o.only, gateRefused(ctx));
  const notes: Array<string> = pn.note ? [pn.note] : [];
  if (pn.countAttempt) {
    const pending = readJson<PendingRecord>(pendingFile, { suites: [], since: "" });
    writeJson(pendingFile, Object.assign({}, pending, { attempts: (pending.attempts || 0) + 1 }));
  }
  if (pn.record.length) log("new machine key: recording " + pn.record.map((p: { suite: Suite }) => p.suite).join(","));
  if (pn.record.length && !pn.night.length) return (await record(ctx, pn.record, "new machine key: recording")).code;
  if (!ctx.local) await phase(ctx, "install tool", () => installTool(ctx));
  else checkPlaywright(ctx);
  const target = await phase(ctx, "build target", () => buildTarget(ctx, plan.map((p: { suite: Suite }) => p.suite)));
  // The record first, on the same build; its extra rounds leave room for the night's suites and reruns.
  const reserveMs = (pn.night.reduce((n: number, p: { suite: Suite }) => n + ctx.m.suites[p.suite].budgetMin * 1.5, 0) + 30) * 60000;
  const recorded = pn.record.length ? await record(ctx, pn.record, "new machine key: recording", { target: target, reserveMs: reserveMs }) : undefined;
  if (recorded) notes.push(...recorded.lines.map((l: string) => l.replace(/\*\*/g, "")));
  const last = readJson<LastNightly | null>(path.join(ctx.state, "last-nightly.json"), null);
  const previousCommit = last && last.lastRun ? last.lastRun.commit : undefined;
  const judged: Array<Judged> = [];
  for (const p of pn.night) {
    const suite = p.suite;
    if (target.uiFailed[suite]) {
      judged.push({ suite: suite, run: { suite: suite, file: "", status: "build failed", logFile: target.uiFailed[suite] } });
      continue;
    }
    const file = path.join(ctx.history, suite + ".json");
    const run = await phase(ctx, "suite " + suite, () => runSuite(ctx, suite, file, {
      PERF_CORE_DIR: target.core, PERF_UI_DIR: target.ui[suite], PERF_TARGET_COMMIT: ctx.sha, PERF_KIND: ctx.o.kind, PERF_LABEL: ctx.o.label || ctx.o.kind,
      PERF_REF: ctx.o.ref, PERF_PREVIOUS_COMMIT: previousCommit, PERF_ONLY: p.only ? p.only.join(",") : undefined, PERF_MACHINE_EXTRA: process.env.PERF_MACHINE_EXTRA
    }, "suite-" + suite));
    judged.push({ suite: suite, run: run });
  }
  // Compare, all reruns at the end, compare again.
  const known = readKnown(ctx.state);
  for (const j of judged) {
    if (!j.run.result) continue;
    j.input = Object.assign(loadInput(j.run.file, ctx.state, previousResultOf(ctx, j.suite)), { known: known });
    j.baseline = j.input.baseline;
    j.first = judge(j.input);
  }
  const steps = planReruns(judged.filter((j: Judged) => !!j.first).map((j: Judged) => ({ suite: j.suite, reruns: j.first!.reruns, result: j.run.result! })));
  const rerunFiles: { [suite: string]: Array<ResultFile> } = {};
  if (steps.length) {
    await phase(ctx, "reruns", async() => {
      let n = 0;
      for (const s of steps) {
        n++;
        const file = path.join(ctx.history, "reruns", s.suite + "-" + n + ".json");
        const ids = s.ids === "calibration" ? "calibration" : s.ids.join(",");
        const r = await runSuite(ctx, s.suite, file, Object.assign({}, s.env, { PERF_KIND: "rerun", PERF_LABEL: "rerun", PERF_REF: ctx.o.ref, PERF_ONLY: ids,
          PERF_MACHINE_EXTRA: process.env.PERF_MACHINE_EXTRA }), "rerun-" + n + "-" + s.suite + (s.ids === "calibration" ? "-calibration" : ""));
        if (r.result) (rerunFiles[s.suite] = rerunFiles[s.suite] || []).push(r.result);
      }
    });
  }
  for (const j of judged) {
    if (!j.first || !j.input) continue;
    j.final = j.first.reruns.length ? finalize(j.first, j.input, rerunFiles[j.suite] || []) : j.first;
    writeJsonAtomic(compareFileOf(j.run.file, j.suite), j.final);
  }
  // State: only a nightly moves known.json, the ratchet and last-nightly.json.
  const date = ctx.started.toISOString();
  const pendingRecord: Array<string> = [];
  if (ctx.o.kind === "nightly") {
    for (const j of judged) {
      if (!j.final || !j.run.result) continue;
      j.known = applyNight(known, j.suite, j.final.verdicts, ctx.sha, date);
      if (j.baseline) {
        const ratchet = readRatchet(ctx.state, j.suite, j.final.machineKey);
        advanceRatchet(ratchet, j.baseline, known, j.suite, j.final.verdicts, date);
        writeRatchet(ctx.state, j.suite, j.final.machineKey, ratchet);
      } else if (newestBaseline(ctx.state, j.suite) && measuredKey(j.run.result)) pendingRecord.push(j.suite);
    }
    writeKnown(ctx.state, known);
    // A pending record keeps its attempts: it is not restarted every night.
    if (pendingRecord.length && !fs.existsSync(pendingFile)) writeJson(pendingFile, { suites: pendingRecord, since: date, attempts: 0 });
    // Complete: not stopped, and no scenario failed (a failed one is a hole the next night's "vs previous" would miss).
    const nightSuites: Array<NightSuite> = judged.filter((j: Judged) => !!j.run.result && !!j.final).map((j: Judged) => ({ suite: j.suite,
      complete: !j.run.result!.incomplete && j.run.status === "ok" && j.run.result!.failed.length === 0, noisy: !!j.final!.noisy, hasReference: !!j.baseline, result: j.run.file }));
    writeJson(path.join(ctx.state, "last-nightly.json"), nextLastNightly(last, { kind: ctx.o.kind, commit: ctx.sha, date: date, runId: ctx.runId, suites: nightSuites }));
  }
  // Message 1: the result.
  const summary = path.join(ctx.history, "summary.md");
  fs.writeFileSync(summary, "# " + ctx.o.kind + " " + ctx.sha.substring(0, 9) + " " + date + "\n\n" + judged.map((j: Judged) => "## " + j.suite + "\n\n" +
    (j.final ? markdownTable(j.final) : j.run.status) + "\n").join("\n"));
  const resultFiles = judged.filter((j: Judged) => !!j.run.result).flatMap((j: Judged) => [j.run.file, compareFileOf(j.run.file, j.suite)])
    .concat(fs.existsSync(path.join(ctx.history, "reruns")) ? fs.readdirSync(path.join(ctx.history, "reruns")).map((f: string) => path.join(ctx.history, "reruns", f)) : []);
  const tar = tarResults(ctx, resultFiles);
  const dn = depsNote(ctx, target.deps);
  if (dn) notes.push(dn);
  if (pendingRecord.length) notes.push("new machine key for " + pendingRecord.join(", ") + ": the next nightly records a baseline");
  // Bisect: new regressions, and known ones a past night skipped (the budget, an error or a timeout); at most 2 and
  // 40 minutes a night. A night that recorded a baseline has used the time: they stay due for the next night.
  const candidates: Array<BisectCandidate> = [];
  judged.forEach((j: Judged) => {
    const due = j.known ? j.known.added.concat(j.known.still.filter((s: any) => bisectDue(s.entry))) : [];
    due.forEach((a: any) => {
      const v = j.final!.verdicts.filter((x: ScenarioVerdict) => x.id === a.id)[0];
      if (v) candidates.push({ suite: j.suite, id: a.id, verdict: v, lastOkCommit: a.entry.lastOkCommit, counter: a.entry.kind === "counter" ? a.entry.counter : undefined });
    });
  });
  const bisectNow = ctx.o.kind === "nightly" && !ctx.o.noBisect && candidates.length > 0;
  if (bisectNow && recorded) notes.push("bisect postponed to the next night: this night recorded a baseline");
  const reports: Array<SuiteReport> = judged.map((j: Judged): SuiteReport => {
    const r: SuiteReport = { suite: j.suite, status: j.run.status, comparison: j.final, known: j.known, unstable: unstableOf(j.baseline) };
    if (j.run.status === "build failed") r.buildLog = { pkg: packageOf(ctx.m, j.suite), tail: errorLines(j.run.logFile, 10) };
    if (!j.run.result && j.run.status !== "build failed") r.notes = tail(j.run.logFile, 5);
    if (j.known && j.known.still.length) {
      r.firstBad = {};
      j.known.still.forEach((s: any) => { if (s.entry.firstBad) r.firstBad![s.id] = { sha: s.entry.firstBad.sha, pr: s.entry.firstBad.pr, title: "", url: s.entry.firstBad.pr ? repoUrl + "/pull/" + s.entry.firstBad.pr : repoUrl + "/commit/" + s.entry.firstBad.sha }; });
    }
    if (!j.baseline && !newestBaseline(ctx.state, j.suite)) (r.notes = r.notes || []).push("no baseline yet: results without verdicts (run.sh --record)");
    return r;
  });
  // A failed build attaches build-<pkg>.log.
  const sources: { [name: string]: string } = {};
  const files = [summary].concat(tar ? [tar] : []).map((f: string) => path.basename(f));
  files.forEach((name: string) => { sources[name] = path.join(ctx.history, name); });
  if (recorded) Object.keys(recorded.files).forEach((name: string) => { sources[name] = recorded.files[name]; files.push(name); });
  judged.filter((j: Judged) => j.run.status === "build failed").forEach((j: Judged) => {
    const name = "build-" + packageOf(ctx.m, j.suite) + ".log";
    sources[name] = j.run.logFile;
    files.push(name);
  });
  const newRegression = judged.some((j: Judged) => !!j.known && j.known.added.length > 0);
  const msg = resultMessage({ kind: ctx.o.kind, label: ctx.o.label || ctx.o.kind, ref: ctx.o.ref, commit: ctx.sha, date: date,
    durationMin: (Date.now() - ctx.started.getTime()) / 60000, range: ctx.o.kind === "nightly" ? rangePrs(ctx.repo, previousCommit || null, ctx.sha) : [],
    rangeFrom: previousCommit, suites: reports, notes: notes, roleId: process.env.PERF_DISCORD_ROLE_ID, newRegression: newRegression,
    footer: "run " + ctx.runId + " \u00b7 state " + stateSize(ctx.state), files: files });
  const dir1 = path.join(ctx.history, "discord", "1-result");
  writeMessage(dir1, msg, sources);
  if (ctx.o.dryPost) printDry(dir1);
  if (bisectNow && !recorded) {
    fs.writeFileSync(path.join(ctx.history, "bisect-started"), new Date().toISOString() + "\n");
    await phase(ctx, "bisect", () => bisectNight(ctx, candidates, judged, target));
  }
  return Math.max(recorded ? recorded.code : 0, judged.some((j: Judged) => !!j.final && j.final.failed) ? 1 : 0);
}

// --- bisect ------------------------------------------------------------------------------------------------------

interface Built {
  core: string;
  ui: { [suite: string]: string };
  uiFrom: { [suite: string]: string };
  deps: Array<string>;
}

// Builds commits in work/bisect and keeps each build in work/builds/<sha>, so ends measured alternately are built once.
// A step builds survey-core, and a UI only when its sources changed since the last UI build.
function bisectBuilder(ctx: Ctx, suite: Suite): (sha: string) => Promise<Built | null> {
  const slot = path.join(ctx.state, "work", "bisect");
  const cache = path.join(ctx.state, "work", "builds");
  const built: { [sha: string]: Built | null } = {};
  let cleaned = false;
  let lastUi: { sha: string, dir: string } | undefined;
  const copy = (from: string, to: string): void => {
    fs.rmSync(to, { recursive: true, force: true });
    fs.cpSync(from, to, { recursive: true });
  };
  return async(sha: string): Promise<Built | null> => {
    if (built[sha] !== undefined) return built[sha];
    log("bisect build " + sha.substring(0, 9));
    prepareSlot(ctx.repo, slot, sha, !cleaned);
    cleaned = true;
    const dirs = [slot, path.join(slot, "packages", "survey-core")];
    await install(ctx, slot, "bisect-root", true);
    await install(ctx, dirs[1], "bisect-survey-core", false);
    const name = sha.substring(0, 9);
    const coreLog = path.join(ctx.logs, "bisect-build-" + name + "-survey-core.log");
    if (!await buildCore(ctx, dirs[1], coreLog, suite !== "core")) {
      built[sha] = null;
      return null;
    }
    const res: Built = { core: path.join(cache, sha, "survey-core"), ui: {}, uiFrom: {}, deps: [] };
    copy(path.join(dirs[1], "build"), res.core);
    if (suite !== "core") {
      const pkg = path.join(slot, "packages", packageOf(ctx.m, suite));
      dirs.push(pkg);
      const srcs = uiSourceDirs(ctx.m, suite);
      let same = false;
      if (lastUi) {
        try {
          git(slot, ["diff", "--quiet", lastUi.sha, sha, "--"].concat(Array.from(new Set(srcs))));
          same = true;
        } catch(e) {
          same = false;
        }
      }
      if (same && lastUi) {
        res.ui[suite] = lastUi.dir;
        res.uiFrom[suite] = lastUi.sha;
      } else {
        await install(ctx, pkg, "bisect-" + packageOf(ctx.m, suite), false);
        const uiLog = path.join(ctx.logs, "bisect-build-" + name + "-" + packageOf(ctx.m, suite) + ".log");
        if (!await npmRun(ctx, pkg, "build", uiLog)) {
          built[sha] = null;
          return null;
        }
        res.ui[suite] = path.join(cache, sha, packageOf(ctx.m, suite));
        copy(path.join(pkg, "build"), res.ui[suite]);
        lastUi = { sha: sha, dir: res.ui[suite] };
      }
    }
    res.deps = installedList(dirs);
    built[sha] = res;
    return res;
  };
}

function measureOf(ctx: Ctx, suite: Suite, id: string, counter: string | undefined, build: (sha: string) => Promise<Built | null>): (sha: string) => Promise<number | null> {
  let n = 0;
  return async(sha: string): Promise<number | null> => {
    const b = await build(sha);
    if (!b) return null;
    n++;
    const file = path.join(ctx.history, "bisect", suite + "-" + id.replace(/[^a-z0-9.-]+/gi, "_") + "-" + n + "-" + sha.substring(0, 9) + ".json");
    const r = await runSuite(ctx, suite, file, { PERF_CORE_DIR: b.core, PERF_UI_DIR: b.ui[suite], PERF_TARGET_COMMIT: sha, PERF_KIND: "bisect", PERF_LABEL: "bisect",
      PERF_ONLY: id, PERF_MACHINE_EXTRA: process.env.PERF_MACHINE_EXTRA }, "bisect-" + n + "-" + sha.substring(0, 9));
    const e = r.result ? r.result.results.filter((x: ResultEntry) => x.id === id)[0] : undefined;
    // The build was fine: a skipped or failed scenario is not "unbuildable"; the bisect stops and says which it was.
    if (!e) {
      const res = r.result;
      const skip = res ? res.skipped.filter((x: any) => x.id === id)[0] : undefined;
      const fail = res ? res.failed.filter((x: any) => x.id === id)[0] : undefined;
      throw new Error("the scenario was " + (skip ? "skipped at " + sha.substring(0, 9) + ": " + skip.reason : fail ? "failed at " + sha.substring(0, 9) + ": " +
        String(fail.error).split("\n")[0].substring(0, 200) : "not measured at " + sha.substring(0, 9) + " (" + r.status + ")"));
    }
    const v = counter ? (e.counters[counter] ? e.counters[counter].value : null) : e.median;
    log("bisect " + sha.substring(0, 9) + ": " + (counter ? counter + " " : "") + v);
    return v;
  };
}

async function runOneBisect(ctx: Ctx, c: BisectCandidate, good: string, bad: string, deadline: number, reference: number | null, tolerance: number,
  seed?: { sha: string, target: TargetBuild }): Promise<BisectReport> {
  let commits: Array<string>;
  try {
    commits = firstParentRange(ctx.repo, good, bad);
  } catch(e: any) {
    return { suite: c.suite, id: c.id, status: "not-in-range", message: String(e.message || e) };
  }
  log("bisect " + c.suite + " " + c.id + ": " + commits.length + " commits " + good.substring(0, 9) + ".." + bad.substring(0, 9));
  const builder = bisectBuilder(ctx, c.suite);
  const build = seed ? async(sha: string): Promise<Built | null> => {
    // The bad end is tonight's target: its build is already there.
    if (sha === seed.sha && (c.suite === "core" || seed.target.ui[c.suite])) {
      const ui: { [s: string]: string } = {};
      if (c.suite !== "core") ui[c.suite] = seed.target.ui[c.suite] as string;
      return { core: seed.target.core, ui: ui, uiFrom: {}, deps: seed.target.deps };
    }
    return builder(sha);
  } : builder;
  const ends: { [sha: string]: Array<string> } = {};
  const measure = measureOf(ctx, c.suite, c.id, c.counter, async(sha: string) => {
    const b = await build(sha);
    if (b) ends[sha] = b.deps;
    return b;
  });
  let report: BisectReport;
  try {
    report = await search(commits, measure, { suite: c.suite, id: c.id, reference: reference, tolerance: tolerance, counter: !!c.counter,
      deadline: deadline, prOf: (sha: string) => commitPr(ctx.repo, sha) });
  } finally {
    // The build copies serve one bisect only (about 50 MB a commit).
    fs.rmSync(path.join(ctx.state, "work", "builds"), { recursive: true, force: true });
  }
  if (report.status === "not-in-range" && ends[commits[0]] && ends[commits[commits.length - 1]]) {
    const diff = depsDiff(ends[commits[0]], ends[commits[commits.length - 1]]);
    if (diff) report.message += " (" + diff + ")";
  }
  return report;
}

async function bisectNight(ctx: Ctx, candidates: Array<BisectCandidate>, judged: Array<Judged>, target: TargetBuild): Promise<void> {
  const deadline = Date.now() + bisectBudgetMin * 60000;
  const reports: Array<BisectReport> = [];
  const known = readKnown(ctx.state);
  const entryOf = (c: BisectCandidate): any => (known.entries[c.suite] || {})[c.counter ? c.id + "#" + c.counter : c.id];
  // Without a last ok commit there is no range: reported, and no bisect slot taken.
  candidates.filter((c: BisectCandidate) => !c.lastOkCommit).forEach((c: BisectCandidate) => {
    reports.push({ suite: c.suite, id: c.id, status: "not-in-range", message: "no last ok commit for this scenario" });
    const entry = entryOf(c);
    if (entry) entry.bisect = "not-in-range";
  });
  const { chosen, skipped } = chooseBisects(candidates.filter((c: BisectCandidate) => !!c.lastOkCommit), maxBisects);
  for (const c of chosen) {
    const entry = entryOf(c);
    if (Date.now() > deadline) {
      reports.push({ suite: c.suite, id: c.id, status: "skipped (budget)", message: "the night's bisect budget is used up" });
    } else {
      const tol = c.verdict.tolerance || defaultTolerance;
      // A counter candidate is any of the scenario's regressed counters, not only the one the verdict shows.
      const cv = c.counter ? c.verdict.counters.filter((x: CounterVerdict) => x.name === c.counter)[0] : undefined;
      const ref = c.counter ? (cv && cv.ref !== null ? cv.ref : c.verdict.counterReference || 0) : (c.verdict.reference || 0);
      reports.push(await runOneBisect(ctx, c, c.lastOkCommit as string, ctx.sha, deadline, ref, tol, { sha: ctx.sha, target: target }));
    }
    const r = reports[reports.length - 1];
    if (entry) {
      markBisect(entry, r.status);
      if (r.firstBad) entry.firstBad = { sha: r.firstBad.sha, pr: r.firstBad.pr };
    }
  }
  // Skipped for the budget: "skipped", so a later night bisects it; covered by another suite's or the whole-suite
  // bisect: "covered", so it is not queued again.
  skipped.forEach((s: { c: BisectCandidate, reason: string }) => {
    reports.push({ suite: s.c.suite, id: s.c.id, status: "skipped (budget)", message: s.reason });
    const entry = entryOf(s.c);
    if (entry) markBisect(entry, s.reason.indexOf("budget") === 0 ? "skipped (budget)" : "covered");
  });
  writeKnown(ctx.state, known);
  writeBisectMessage(ctx, reports);
}

function writeBisectMessage(ctx: Ctx, reports: Array<BisectReport>): void {
  const dir = path.join(ctx.history, "discord", "2-bisect");
  writeJsonAtomic(path.join(ctx.history, "bisect.json"), reports);
  const m = bisectMessage(reports, { kind: ctx.o.kind, commit: ctx.sha }, []);
  writeMessage(dir, m, {});
  if (ctx.o.dryPost) printDry(dir);
}

// run.sh --bisect <good>..<bad> --only <id>: the cheapest requested suite that has the id.
async function onDemandBisect(ctx: Ctx): Promise<number> {
  // Split on the first "..": tags have dots (v3.2.2..master).
  const at = (ctx.o.bisect as string).indexOf("..");
  const goodRef = (ctx.o.bisect as string).substring(0, at);
  const badRef = (ctx.o.bisect as string).substring(at + 2);
  const good = resolveRef(ctx.repo, goodRef);
  const bad = resolveRef(ctx.repo, badRef);
  const id = (ctx.o.only as Array<string>)[0];
  const plan = planSuites(ctx.m, [id], ctx.o.suites);
  const order: Array<Suite> = ["core", "survey-js-ui", "react"];
  const suite = order.filter((s: Suite) => plan.some((p: { suite: Suite }) => p.suite === s))[0];
  const start = plainMessage("\ud83d\udd0e on-demand bisect of `" + id + "` in " + suite + ", " + good.substring(0, 9) + ".." + bad.substring(0, 9) + ": started");
  const dir1 = path.join(ctx.history, "discord", "1-result");
  writeMessage(dir1, start, {});
  if (ctx.o.dryPost) printDry(dir1);
  if (!ctx.local) await phase(ctx, "install tool", () => installTool(ctx));
  // The reference comes from this machine's baseline: the manifest's key of this process (no Chromium), with any
  // Chromium major for a browser suite (its version is known only once Playwright runs); the newest such file.
  const escaped = ctx.m.machine.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const keyPattern = new RegExp("^" + (suite === "core" ? escaped : escaped.replace("chromiumnone", "chromium\\d+")) + "$");
  const bf = baselineFiles(ctx.state, suite).filter((f: string) => keyPattern.test(path.basename(f).substring(suite.length + 1).replace(/\.json$/, "")))[0];
  const b = bf ? readBaseline(bf) : undefined;
  const s = b ? b.scenarios[id] : undefined;
  const reference = s ? s.median : null;
  const tolerance = s ? Math.max(defaultTolerance, s.noiseTol || 0) : defaultTolerance;
  const c: BisectCandidate = { suite: suite, id: id, verdict: { id: id, verdict: "regression", counters: [], tags: [], judgedOk: false, okAgainstFrozen: false,
    countersOk: false, counterValues: {} }, lastOkCommit: good };
  fs.writeFileSync(path.join(ctx.history, "bisect-started"), new Date().toISOString() + "\n");
  const report = await phase(ctx, "bisect", () => runOneBisect(ctx, c, good, bad, Date.now() + bisectBudgetMin * 60000, reference, tolerance));
  writeBisectMessage(ctx, [report]);
  return report.status === "found" ? 0 : 1;
}

// --- record ------------------------------------------------------------------------------------------------------

// 5 interleaved rounds (core, react, survey-js-ui, core, ...), then the baseline; a scenario with fewer than 4 clean
// runs is recorded again, at most twice. With --only: baseline --update <ids>.
// The gate gave up (a busy server): every run would be noisy, and a record of noisy runs is refused.
function gateRefused(ctx: Ctx): string | undefined {
  const gate = readJson<any>(path.join(ctx.hostRun, "gate.json"), null);
  return gate && gate.ok === false ? gate.reason || "gate" : undefined;
}

// A record inside a night (a pending record): the night's build, room left for the night's suites, and no message of
// its own: its lines and files go into the night's.
interface InNight {
  target: TargetBuild;
  reserveMs: number;
}

interface RecordOutcome {
  code: number;
  lines: Array<string>;
  files: { [name: string]: string };
}

async function record(ctx: Ctx, plan: Array<{ suite: Suite, only: Array<string> | null }>, reason?: string, inNight?: InNight): Promise<RecordOutcome> {
  const busy = gateRefused(ctx);
  if (busy) {
    const m = plainMessage("\u23f8\ufe0f record" + (reason ? " (" + reason + ")" : "") + " not started: the server was busy (" + busy + "); it is not counted as an attempt");
    writeMessage(path.join(ctx.history, "discord", "1-result"), m, {});
    if (ctx.o.dryPost) printDry(path.join(ctx.history, "discord", "1-result"));
    return { code: 0, lines: [], files: {} };
  }
  if (!inNight && !ctx.local) await phase(ctx, "install tool", () => installTool(ctx));
  else if (!inNight) checkPlaywright(ctx);
  const target = inNight ? inNight.target : await phase(ctx, "build target", () => buildTarget(ctx, plan.map((p: { suite: Suite }) => p.suite)));
  const runs: { [suite: string]: Array<ResultFile> } = {};
  const rounds = async(label: string, only: { [suite: string]: Array<string> | null }): Promise<void> => {
    for (let k = 1; k <= 5; k++) {
      for (const p of plan) {
        if (target.uiFailed[p.suite] || only[p.suite] === undefined || (only[p.suite] && !only[p.suite]!.length)) continue;
        const file = path.join(ctx.history, "record", p.suite + "-" + label + "-r" + k + ".json");
        const r = await runSuite(ctx, p.suite, file, { PERF_CORE_DIR: target.core, PERF_UI_DIR: target.ui[p.suite], PERF_TARGET_COMMIT: ctx.sha, PERF_KIND: "record",
          PERF_LABEL: "record", PERF_REF: ctx.o.ref, PERF_ONLY: only[p.suite] ? only[p.suite]!.join(",") : undefined, PERF_MACHINE_EXTRA: process.env.PERF_MACHINE_EXTRA },
        "record-" + label + "-" + p.suite + "-r" + k);
        if (r.result) (runs[p.suite + "/" + label] = runs[p.suite + "/" + label] || []).push(r.result);
      }
    }
  };
  const first: { [suite: string]: Array<string> | null } = {};
  plan.forEach((p: { suite: Suite, only: Array<string> | null }) => { first[p.suite] = p.only; });
  const roundsStart = Date.now();
  await phase(ctx, "record rounds", () => rounds("a", first));
  const roundsMs = Date.now() - roundsStart;
  const lines: Array<string> = [];
  let failed = false;
  const builds: { [suite: string]: BaselineBuild } = {};
  const recorded: Array<string> = [];
  // A noisy run (other work on the server) is left out like a slow-calibration run; the 4-run minimum decides the rest.
  const quiet = (s: string, label: string): Array<ResultFile> => {
    const list = runs[s + "/" + label] || [];
    const kept = list.filter((r: ResultFile) => !(r.environment && r.environment.noisy));
    if (kept.length < list.length) lines.push("**" + s + "**: " + (list.length - kept.length) + " noisy run(s) of round " + label + " left out");
    return kept;
  };
  // Each suite's baseline is written as soon as it exists, so a timeout in the extra rounds loses only those rounds.
  const write = (s: string, b: BaselineBuild, update?: Array<string>): void => {
    const { knownRemoved } = writeBaseline(ctx.state, b, { update: update });
    if (knownRemoved.length) lines.push("**" + s + "**: known.json entries removed: " + knownRemoved.length);
    if (recorded.indexOf(s) < 0) recorded.push(s);
  };
  for (const p of plan) {
    const list = quiet(p.suite, "a");
    if (!list.length) { lines.push("**" + p.suite + "**: no usable record runs (" + (target.uiFailed[p.suite] ? "build failed" : "failed or noisy") + ")"); failed = true; continue; }
    try {
      const prev = p.only ? readBaseline(baselineFile(ctx.state, p.suite, list[0].machine.key)) : undefined;
      if (p.only && !prev) throw new Error("--only needs an existing baseline for " + p.suite);
      builds[p.suite] = buildBaseline(list, { update: p.only || undefined }, prev);
      write(p.suite, builds[p.suite], p.only || undefined);
    } catch(e: any) {
      lines.push("**" + p.suite + "**: " + String(e.message || e));
      failed = true;
    }
  }
  const deadline = Number(process.env.PERF_DEADLINE || 0) * 1000;
  const roundIds = plan.reduce((n: number, p: { suite: Suite, only: Array<string> | null }) => n + (p.only ? p.only.length : idsOfSuite(ctx.m, p.suite).length), 0);
  for (let again = 1; again <= 2; again++) {
    const todo: { [suite: string]: Array<string> | null } = {};
    Object.keys(builds).forEach((s: string) => { if (builds[s].rerecord.length) todo[s] = builds[s].rerecord; });
    if (!Object.keys(todo).length) break;
    // An extra round runs only when it fits before run.sh's limit (estimated from round a, by the number of ids), with
    // the night's suites still to come in a pending record.
    const ids = Object.keys(todo).reduce((n: number, s: string) => n + (todo[s] as Array<string>).length, 0);
    const estimate = roundsMs * ids / Math.max(1, roundIds);
    if (deadline && Date.now() + estimate + 5 * 60000 + (inNight ? inNight.reserveMs : 0) > deadline) {
      lines.push("record again " + again + " skipped: about " + Math.round(estimate / 60000) + " min would not fit before the time limit");
      break;
    }
    const label = again === 1 ? "b" : "c";
    await phase(ctx, "record again " + again, () => rounds(label, todo));
    Object.keys(todo).forEach((s: string) => {
      const list = quiet(s, label);
      if (!list.length) return;
      try {
        builds[s] = buildBaseline(list, { update: todo[s] as Array<string> }, builds[s].baseline);
        write(s, builds[s], todo[s] as Array<string>);
      } catch(e: any) {
        lines.push("**" + s + "** record again: " + String(e.message || e));
      }
    });
  }
  for (const p of plan) {
    const b = builds[p.suite];
    if (!b) continue;
    const n = Object.keys(b.baseline.scenarios).length;
    const unstable = unstableOf(b.baseline);
    lines.push("**" + p.suite + "**: " + n + " scenarios, " + unstable.length + " unstable \u2192 `" + path.basename(baselineFile(ctx.state, p.suite, b.baseline.machineKey)) + "`");
    if (unstable.length) lines.push("unstable: " + unstable.map((id: string) => "`" + id + "`").join(", "));
    if (b.rerecord.length) lines.push("record again by hand: `" + b.rerecord.join(",") + "`");
  }
  // A suite leaves record-pending.json once its baseline is written; the file goes with the last one.
  const pendingFile = path.join(ctx.state, "record-pending.json");
  const pending = readJson<PendingRecord | null>(pendingFile, null);
  if (pending) {
    const left = pending.suites.filter((s: string) => recorded.indexOf(s) < 0);
    if (left.length) writeJson(pendingFile, Object.assign({}, pending, { suites: left }));
    else fs.rmSync(pendingFile, { force: true });
  }
  const summary = path.join(ctx.history, inNight ? "record-summary.md" : "summary.md");
  fs.writeFileSync(summary, "# record " + ctx.sha.substring(0, 9) + "\n\n" + lines.join("\n") + "\n");
  const recordDir = path.join(ctx.history, "record");
  const tar = tarResults(ctx, fs.existsSync(recordDir) ? fs.readdirSync(recordDir).map((f: string) => path.join(recordDir, f)) : [], inNight ? "record.tar.gz" : "results.tar.gz");
  if (inNight) {
    const files: { [name: string]: string } = {};
    files[path.basename(summary)] = summary;
    if (tar) files[path.basename(tar)] = tar;
    return { code: failed ? 1 : 0, lines: ["record" + (reason ? " (" + reason + ")" : "") + (failed ? ": failed" : "") + ":"].concat(lines), files: files };
  }
  const head = (failed ? "\u274c" : "\ud83d\udccf") + " record" + (reason ? " (" + reason + ")" : "") + " \u00b7 `" + ctx.sha.substring(0, 9) + "` \u00b7 " +
    Math.round((Date.now() - ctx.started.getTime()) / 60000) + " min";
  const m = plainMessage(head + "\n" + lines.join("\n"), [summary].concat(tar ? [tar] : []).map((f: string) => path.basename(f)));
  const sources: { [name: string]: string } = { "summary.md": summary };
  if (tar) sources["results.tar.gz"] = tar;
  const dir1 = path.join(ctx.history, "discord", "1-result");
  writeMessage(dir1, m, sources);
  if (ctx.o.dryPost) printDry(dir1);
  return { code: failed ? 1 : 0, lines: lines, files: sources };
}

// --- housekeeping ------------------------------------------------------------------------------------------------

function housekeeping(ctx: Ctx): void {
  if (ctx.o.kind !== "nightly") return;
  const keep = Number(process.env.PERF_KEEP_DAYS || 90);
  const dir = path.join(ctx.state, "history");
  const limit = Date.now() - keep * 86400000;
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((name: string) => {
      const m = /^(\d{4})(\d{2})(\d{2})T/.exec(name);
      if (m && Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])) < limit) fs.rmSync(path.join(dir, name), { recursive: true, force: true });
    });
  }
  if (ctx.local) return;
  const mark = path.join(ctx.state, "npm-cache", ".perf-verified");
  if (!fs.existsSync(mark) || fs.statSync(mark).mtimeMs < Date.now() - 7 * 86400000) {
    try {
      execFileSync(npm, npmArgs(["cache", "verify"]), { env: npmEnv(ctx, false), stdio: "ignore" });
      fs.writeFileSync(mark, new Date().toISOString() + "\n");
    } catch(e) {
      log("npm cache verify failed");
    }
  }
}

function infraMessage(ctx: Ctx, e: InfraError): void {
  const dir = path.join(ctx.history, "discord", "1-result");
  if (fs.existsSync(path.join(dir, "ready"))) return;
  // A fixed template: the error is ours, the log goes in a file.
  const logs: { [name: string]: string } = {};
  if (e.log) logs[path.basename(e.log)] = e.log;
  const m = plainMessage("\u274c " + ctx.o.kind + " \u00b7 `" + ctx.sha.substring(0, 9) + "` \u00b7 " + e.what + ": " + e.message.replace(/[`<>@*_~|\\]/g, ""), Object.keys(logs));
  writeMessage(dir, m, logs);
  if (ctx.o.dryPost) printDry(dir);
}

export async function main(argv: Array<string>): Promise<number> {
  const o = parseArgs(argv);
  const stateEnv = process.env.PERF_STATE_DIR;
  if (!stateEnv) throw new Error("PERF_STATE_DIR is required (a scratchpad folder for local runs)");
  const state = path.resolve(stateEnv);
  // --prepare moves the tool first: its manifest is read after.
  if (o.prepare) return prepare(o, state);
  const tool = o.runner ? path.resolve(o.runner) : path.join(state, "work", "tool");
  const m = loadManifest(tool);
  // --check-args: the options against this parser and the tool's manifest, with no git (a local check).
  if (argv.indexOf("--check-args") > -1) {
    planSuites(m, o.bisect ? (o.only as Array<string>).slice(0, 1) : o.only, o.suites);
    console.log("options ok");
    return 0;
  }
  const repo = o.repo ? path.resolve(o.repo) : o.runner ? tool : path.join(state, "repo");
  const sha = o.sha || resolveRef(repo, o.bisect ? o.bisect.substring(o.bisect.indexOf("..") + 2) : o.ref);
  const started = new Date();
  const runId = utcStamp(started) + "-" + sha.substring(0, 7) + "-" + (o.bisect ? "bisect" : o.kind);
  const history = o.history ? path.resolve(o.history) : path.join(state, "history", runId);
  if (!o.history && fs.existsSync(history)) throw new Error("history directory exists: " + history);
  fs.mkdirSync(history, { recursive: true });
  const ctx: Ctx = { o: o, state: state, tool: tool, repo: repo, history: history, runId: path.basename(history), sha: sha, started: started, phases: [],
    logs: path.join(history, "logs"), local: !!o.runner, m: m, hostRun: o.hostRun ? path.resolve(o.hostRun) : history };
  log(o.kind + (o.bisect ? " bisect " + o.bisect : "") + " of " + o.ref + " " + sha.substring(0, 9) + "; runner " + tool + "; state " + state + "; history " + history);
  let code = 0;
  try {
    if (o.bisect) code = await onDemandBisect(ctx);
    else if (o.kind === "record") code = (await record(ctx, planSuites(m, o.only, o.suites))).code;
    else code = await night(ctx);
  } catch(e: any) {
    if (!(e instanceof InfraError)) throw e;
    log("infrastructure failure: " + e.message);
    infraMessage(ctx, e);
    code = 3;
  } finally {
    housekeeping(ctx);
    log("phases: " + ctx.phases.map((p: { name: string, sec: number }) => p.name + " " + p.sec + " s").join(", "));
  }
  return code;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then((code: number) => { process.exitCode = code; }, (e: any) => {
    console.error(e && e.stack ? e.stack : String(e));
    process.exitCode = 2;
  });
}
