// One job "suite × build" (the project's perf/CONTRACT.md, "Running a suite").
import * as fs from "node:fs";
import * as path from "node:path";
import { runLogged } from "./util/proc.ts";
import { readResult } from "./contract.ts";
import type { Manifest, SuiteManifest } from "./contract.ts";
import type { Build } from "./builds.ts";
import type { Outcome } from "./report.ts";

export interface SuiteParams {
  resultFile: string;
  core: string;
  ui?: string;
  kind: string;
  label: string;
  ref: string;
  targetCommit: string;
  only: Array<string> | null;
  // Further variables of a two-repo build (the other targets, the library commit), set last.
  extra?: Record<string, string>;
}

// Every inherited PERF_* is dropped, then the contract's variables of this job are set.
export function suiteEnv(base: NodeJS.ProcessEnv, p: SuiteParams): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const k of Object.keys(base)) if (!/^PERF_/.test(k)) env[k] = base[k];
  env.PERF_RESULT_FILE = p.resultFile;
  env.PERF_CORE_DIR = p.core;
  if (p.ui) env.PERF_UI_DIR = p.ui;
  env.PERF_KIND = p.kind;
  env.PERF_LABEL = p.label;
  env.PERF_REF = p.ref;
  env.PERF_TARGET_COMMIT = p.targetCommit;
  if (p.only) env.PERF_ONLY = p.only.join(",");
  Object.assign(env, p.extra);
  return env;
}

// `node <runner>/<script> ...args` in <runner>/<cwd>: script and cwd are both relative to the checkout root, not to
// each other. A slot pins the suite to its cores with taskset.
export function suiteCommand(runner: string, sm: SuiteManifest, slot?: string | null): { cmd: string, args: Array<string>, cwd: string } {
  const node = [process.execPath, path.join(runner, sm.script)].concat(sm.args);
  const cwd = path.join(runner, sm.cwd);
  return slot ? { cmd: "taskset", args: ["-c", slot].concat(node), cwd: cwd } : { cmd: node[0], args: node.slice(1), cwd: cwd };
}

function firstLine(e: unknown): string {
  return String((e as Error) && (e as Error).message || e).split("\n")[0];
}

export interface RunSuiteOptions {
  runner: string;
  m: Manifest;
  suite: string;
  build: Build;
  file: string;
  logFile: string;
  env: SuiteParams;
  slot?: string | null;
  signal?: AbortSignal;
}

// One suite on one build. No time limit; an abort sends the suite SIGTERM, and it writes what it has as incomplete.
export async function runSuite(o: RunSuiteOptions): Promise<Outcome> {
  const sm = o.m.suites[o.suite];
  const c = suiteCommand(o.runner, sm, o.slot);
  const env = suiteEnv(process.env, Object.assign({}, o.env, { resultFile: o.file }));
  fs.rmSync(o.file, { force: true });
  fs.mkdirSync(path.dirname(o.logFile), { recursive: true });
  fs.appendFileSync(o.logFile, "# " + o.suite + " on " + o.build.role + " " + o.build.sha.substring(0, 9) + " (" + o.env.kind + ")" + (o.slot ? ", cores " + o.slot : "") + "\n");
  const from = Date.now() / 1000;
  const r = await runLogged(c.cmd, c.args, { cwd: c.cwd, env: env, logFile: o.logFile, signal: o.signal });
  const to = Date.now() / 1000;
  if (!fs.existsSync(o.file)) return { kind: "suite failed", reason: "no result file (exit " + r.code + ")", log: o.logFile };
  let result;
  try {
    result = readResult(o.file);
  } catch(e) {
    return { kind: "suite failed", reason: "unreadable result file: " + firstLine(e), log: o.logFile };
  }
  return { kind: "result", result: result, sec: to - from, log: o.logFile };
}
