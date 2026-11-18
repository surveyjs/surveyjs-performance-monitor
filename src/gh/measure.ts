// The measuring job of the GitHub workflow: one scenario on one machine. Today's build against each older build in
// turn, every pair run `repeats` times interleaved (A B B A A B B A A B), all on this one worker.
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { buildFromRecord, readRecord, suiteOutcomes } from "./build.ts";
import type { BuildRecord } from "./build.ts";
import type { Job, RunPlan } from "./plan.ts";
import type { Project } from "../project.ts";
import type { Outcome } from "../report.ts";
import { runSuite } from "../runner.ts";
import type { Build } from "../builds.ts";
import type { BuildSpec, Role } from "../versions.ts";
import { writeJsonAtomic } from "../util/json.ts";

export type Side = "today" | "build";

// `file` is relative to the job's out folder; `median` is set only when the run measured the scenario.
export interface PairStep { repeat: number, side: Side, file: string, start: string, end: string, sec: number, outcome: Outcome["kind"], median?: number }

export interface Stop { side: Side, kind: "failed" | "skipped" | "incomplete" | "suite failed" | "missing", reason: string }

export interface PairOf { role: Role, sha: string, steps: PairStep[], stop?: Stop }

// Written after every run. `end` is written last: a file without it belongs to a worker that did not finish.
export interface PairFile {
  suite: string;
  id: string;
  key: string;
  repeats: number;
  machine: { model: string, cores: number };
  start: string;
  end?: string;
  pairs: PairOf[];
  todayStop?: Stop;
}

export const PAIR = "pair.json";

// The order of one pair's runs: A B B A A B B A A B for 5 repeats (A today, B the older build).
export function pairOrder(repeats: number): Array<{ repeat: number, side: Side }> {
  const order: Array<{ repeat: number, side: Side }> = [];
  for (let n = 1; n <= repeats; n++) {
    const sides: Side[] = n % 2 === 1 ? ["today", "build"] : ["build", "today"];
    for (const side of sides) order.push({ repeat: n, side: side });
  }
  return order;
}

// What a run says about one scenario: its median, or why the pair stops.
export function checkRun(o: Outcome, id: string): { median?: number, stop?: Omit<Stop, "side"> } {
  if (o.kind !== "result") {
    return { stop: { kind: "suite failed", reason: ("reason" in o && o.reason) || o.kind } };
  }
  const r = o.result;
  const failed = r.failed.find((f: { id: string, error: string }) => f.id === id);
  if (failed) return { stop: { kind: "failed", reason: failed.error } };
  const skipped = r.skipped.find((s: { id: string, reason: string }) => s.id === id);
  if (skipped) return { stop: { kind: "skipped", reason: skipped.reason } };
  const entry = r.results.find((e: { id: string }) => e.id === id);
  if (entry) return { median: entry.median };
  if (r.incomplete) return { stop: { kind: "incomplete", reason: r.incomplete.reason } };
  return { stop: { kind: "missing", reason: "not in the result" } };
}

export interface MeasureOptions {
  plan: RunPlan;
  project: Project;
  job: Job;
  runner: string;
  // Holds build-<role>/ with each build's record.
  builds: string;
  out: string;
  slot: string | null;
  machine?: PairFile["machine"];
  signal?: AbortSignal;
}

function firstLine(e: unknown): string {
  return String(e instanceof Error ? e.message : e).split("\n")[0];
}

function defaultMachine(): PairFile["machine"] {
  const model = os.cpus()[0]?.model || "unknown";
  return { model: model, cores: os.availableParallelism() };
}

// Measures the job's scenario: today against each older build, `plan.repeats` times each, and writes pair.json after
// every run. A signal that aborts leaves the file without `end`.
export async function measureScenario(o: MeasureOptions): Promise<PairFile> {
  const { plan, project, job } = o;
  const records: Partial<Record<Role, BuildRecord>> = {};
  for (const s of plan.specs) {
    const rec = readRecord(path.join(o.builds, "build-" + s.role));
    if (rec) records[s.role] = rec;
  }
  const outcomes = suiteOutcomes(plan.specs, records, job.suite);
  const pf: PairFile = { suite: job.suite, id: job.id, key: job.key, repeats: plan.repeats, machine: o.machine || defaultMachine(),
    start: new Date().toISOString(), pairs: [] };
  const save = (): void => writeJsonAtomic(path.join(o.out, PAIR), pf);
  const finish = (): PairFile => {
    pf.end = new Date().toISOString();
    save();
    return pf;
  };
  save();
  const reference = plan.specs[0];
  const refNone = outcomes[reference.role];
  if (refNone) {
    pf.todayStop = { side: "today", kind: "skipped", reason: ("reason" in refNone && refNone.reason) || refNone.kind };
    return finish();
  }
  const older = plan.specs.slice(1).filter((s: BuildSpec) => !outcomes[s.role]);

  const runStep = async (spec: BuildSpec, side: Side, repeat: number, pairRole: Role): Promise<{ outcome: Outcome, step: PairStep } | null> => {
    const rec = records[spec.role] as BuildRecord;
    const b: Build = buildFromRecord(rec, path.join(o.builds, "build-" + spec.role));
    const isToday = side === "today";
    const rel = path.join(pairRole, (isToday ? "today" : pairRole) + "-" + repeat + ".json");
    const file = path.join(o.out, rel);
    const logFile = path.join(o.out, "logs", pairRole + "-" + side + "-" + repeat + ".log");
    const t0 = Date.now();
    const start = new Date(t0).toISOString();
    let outcome: Outcome;
    try {
      outcome = await runSuite({ runner: o.runner, m: plan.manifest, suite: job.suite, build: b, file: file, logFile: logFile,
        slot: o.slot, signal: o.signal,
        env: { resultFile: file, core: b.core as string, ui: b.ui[job.suite], kind: isToday ? plan.kind : "bisect",
          label: isToday ? reference.role : spec.role, ref: "origin/" + project.branch,
          targetCommit: b.sha, only: [job.id],
          extra: { ...b.targets?.[job.suite], ...(b.lib ? { PERF_LIB_COMMIT: b.lib } : {}) } } });
    } catch(e) {
      outcome = { kind: "suite failed", reason: firstLine(e), log: logFile };
    }
    // An abort that cut the run short drops it; a run that finished all the same is kept.
    if (o.signal?.aborted && (outcome.kind !== "result" || outcome.result.incomplete)) return null;
    const t1 = Date.now();
    const step: PairStep = { repeat: repeat, side: side, file: rel, start: start, end: new Date(t1).toISOString(),
      sec: outcome.kind === "result" ? Math.round(outcome.sec * 10) / 10 : Math.round((t1 - t0) / 100) / 10, outcome: outcome.kind };
    return { outcome: outcome, step: step };
  };

  for (const spec of older) {
    if (o.signal?.aborted) return pf;
    const pair: PairOf = { role: spec.role, sha: spec.sha, steps: [] };
    fs.mkdirSync(path.join(o.out, spec.role), { recursive: true });
    pf.pairs.push(pair);
    save();
    for (const { repeat, side } of pairOrder(plan.repeats)) {
      if (o.signal?.aborted) return pf;
      const ran = await runStep(side === "today" ? reference : spec, side, repeat, spec.role);
      if (!ran) return pf;
      const check = checkRun(ran.outcome, job.id);
      if (check.median !== undefined) ran.step.median = check.median;
      pair.steps.push(ran.step);
      if (o.signal?.aborted) {
        save();
        return pf;
      }
      if (check.stop) {
        const stop: Stop = { side: side, kind: check.stop.kind, reason: check.stop.reason };
        if (side === "today") {
          pf.todayStop = stop;
          return finish();
        }
        pair.stop = stop;
        save();
        break;
      }
      save();
    }
  }
  return finish();
}
