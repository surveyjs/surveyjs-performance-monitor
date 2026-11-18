// The report's matrix from the measuring jobs' files: pair.json and the result file of every run. The SuiteMatrix
// of src/report.ts, which the markdown, the verdicts and the Discord message read.
// A false alarm is worse than a miss: a highlight needs the pooled delta and every repeat's own medians over the
// threshold in the same direction, and partial data never gives one.
import * as fs from "node:fs";
import * as path from "node:path";
import { readResult } from "../contract.ts";
import type { ResultFile, ResultEntry } from "../contract.ts";
import { PAIR } from "./measure.ts";
import type { PairFile, Stop } from "./measure.ts";
import { markCell, naReason, timeVerdict, verdictOf, compareCounters, deltaOf, samplesOf } from "../report.ts";
import type { Outcome, SuiteMatrix, Row, Cell, Repeat } from "../report.ts";
import type { Role } from "../versions.ts";
import { median } from "../util/stats.ts";
import { stripAnsi } from "../util/format.ts";

// `today` and `build` hold the measured runs (the steps with a median), in repeat order.
export interface LoadedPair { role: Role, today: ResultFile[], build: ResultFile[], stop?: Stop }

export type Missing = "worker failed" | "cancelled";

export interface ScenarioInput { id: string, missing?: Missing, todayStop?: Stop, pairs: LoadedPair[] }

// Reads one scenario's job folder. A missing or unreadable pair.json or step file, or a pair.json without `end` (a
// worker that did not finish), gives `missing` and no pairs.
export function loadScenario(dir: string, id: string, missing?: Missing): ScenarioInput {
  const gone: ScenarioInput = { id: id, missing: missing || "worker failed", pairs: [] };
  const pairs: LoadedPair[] = [];
  let pf: PairFile | null;
  try {
    pf = JSON.parse(fs.readFileSync(path.join(dir, PAIR), "utf8")) as PairFile | null;
    if (!pf || typeof pf !== "object" || !pf.end || !Array.isArray(pf.pairs)) return gone;
    for (const p of pf.pairs) {
      const lp: LoadedPair = { role: p.role, today: [], build: [] };
      for (const s of p.steps) {
        if (s.median === undefined) continue;
        lp[s.side].push(readResult(path.join(dir, s.file)));
      }
      if (p.stop) lp.stop = p.stop;
      pairs.push(lp);
    }
  } catch(e) {
    return gone;
  }
  const sc: ScenarioInput = { id: id, pairs: pairs };
  if (pf.todayStop) sc.todayStop = pf.todayStop;
  return sc;
}

function bump(map: Partial<Record<Role, number>>, role: Role): void {
  map[role] = (map[role] || 0) + 1;
}

const entriesOf = (files: ResultFile[], id: string): ResultEntry[] =>
  files.map((f: ResultFile) => f.results.find((e: ResultEntry) => e.id === id)).filter((e?: ResultEntry): e is ResultEntry => !!e);

// The matrix of one suite from its scenarios' pairs. `ref` is roles[0]; a role with an outcome (same, n/a, a failed
// build) is shown by it, a role without one by its pairs.
export function pairMatrix(suite: string, roles: Role[], outcomes: Partial<Record<Role, Outcome>>, scenarios: ScenarioInput[], repeats: number): SuiteMatrix {
  const m: SuiteMatrix = {
    suite: suite, roles: roles, rows: [], up: {}, down: {}, failed: [], failedToday: [], incomplete: {}, incompleteReason: {},
    notRun: [], notRunReason: {}, na: {}, flagged: {}
  };
  const ref = roles[0];
  for (const role of roles) {
    const o = outcomes[role];
    if (!o) continue;
    if (o.kind === "build failed" || o.kind === "suite failed") m.failed.push({ role: role, kind: o.kind, reason: o.reason, log: o.log });
    else if (o.kind === "not run") {
      m.notRun.push(role);
      if (o.reason) m.notRunReason[role] = o.reason;
    }
  }
  if (outcomes[ref]) return m;

  const naCount = (role: Role, reason: string): void => {
    const per = m.na[role] || (m.na[role] = {});
    per[reason] = (per[reason] || 0) + 1;
  };
  const notRun = (role: Role, c: Cell, reason: string): Cell => {
    bump(m.incomplete, role);
    m.incompleteReason[role] = reason;
    return c;
  };
  const sorted = scenarios.slice().sort((a: ScenarioInput, b: ScenarioInput) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  for (const sc of sorted) {
    const row: Row = { id: sc.id, cells: {} };
    const todayRuns = (): ResultEntry[] => entriesOf(([] as ResultFile[]).concat(...sc.pairs.map((p: LoadedPair) => p.today)), sc.id);
    const firstToday = sc.pairs.map((p: LoadedPair) => entriesOf(p.today, sc.id)[0]).find((e?: ResultEntry) => !!e);
    if (firstToday?.counterOnly === true) row.counterOnly = true;

    for (const role of roles) {
      const o = outcomes[role];
      let c: Cell;
      if (o && o.kind !== "result") {
        if (o.kind === "same") c = markCell("same", o.as);
        else if (o.kind === "n/a") {
          c = markCell("n/a", o.reason);
          naCount(role, o.reason);
        } else c = markCell(o.kind);
      } else if (sc.missing) {
        c = notRun(role, markCell("not run", "not run (" + sc.missing + ")"), sc.missing);
      } else if (role === ref) {
        const stop = sc.todayStop;
        if (stop && (stop.kind === "failed" || stop.kind === "suite failed" || stop.kind === "incomplete")) {
          m.failedToday.push({ id: sc.id, error: stop.reason.replace(stripAnsi, "").trim() });
          c = markCell("n/a", naReason(stop.reason));
        } else if (stop) c = markCell("n/a", stop.reason);
        else {
          const samples = ([] as number[]).concat(...todayRuns().map(samplesOf));
          c = samples.length > 0 ? { median: median(samples), flags: [], counterDiffs: [] } : { flags: [], counterDiffs: [] };
        }
      } else {
        const p = sc.pairs.find((x: LoadedPair) => x.role === role);
        c = pairCell(sc.id, role, p, row, suite, repeats, naCount, notRun);
      }
      row.cells[role] = c;
    }
    m.rows.push(row);
    for (const role of roles) {
      const c = row.cells[role];
      if (!c || role === ref) continue;
      if (c.flags.length > 0) bump(m.flagged, role);
      const v = verdictOf(row, role, suite);
      if (v) bump(v === "up" ? m.up : m.down, role);
    }
  }
  return m;
}

// One older build's cell of a scenario from its pair; the rules of the plan, in order.
function pairCell(id: string, role: Role, p: LoadedPair | undefined, row: Row, suite: string, repeats: number,
  naCount: (role: Role, reason: string) => void, notRun: (role: Role, c: Cell, reason: string) => Cell): Cell {
  const empty = (): Cell => ({ flags: [], counterDiffs: [] });
  if (!p) return empty();
  const t = entriesOf(p.today, id);
  const b = entriesOf(p.build, id);
  if (!p.stop && p.today.length === repeats && p.build.length === repeats && t.length === repeats && b.length === repeats) {
    const buildMedian = median(([] as number[]).concat(...b.map(samplesOf)));
    const todayMedian = median(([] as number[]).concat(...t.map(samplesOf)));
    const c: Cell = { median: buildMedian, delta: deltaOf(todayMedian, buildMedian), flags: [], counterDiffs: [] };
    c.repeats = t.map((e: ResultEntry, i: number): Repeat => ({ today: e.median, build: b[i].median, delta: deltaOf(e.median, b[i].median) }));
    if (t[0].jsonErrors !== b[0].jsonErrors) c.flags.push("jsonErrors");
    const counters = compareCounters(t[0], b[0]);
    c.counterDiffs = counters.diffs;
    if (row.counterOnly) {
      if (counters.verdict) c.counterVerdict = counters.verdict;
    } else {
      const v = timeVerdict(c.median, c.delta, suite);
      if (v !== undefined) {
        c.rerun = (c.repeats as Repeat[]).every((r: Repeat) => timeVerdict(r.build, r.delta, suite) === v) ? "confirmed" : "unconfirmed";
      }
    }
    return c;
  }
  const stop = p.stop;
  if (stop) {
    let reason: string | undefined;
    if (stop.kind === "failed") reason = naReason(stop.reason);
    else if (stop.kind === "skipped") reason = stop.reason;
    else if (stop.kind === "suite failed") reason = "suite failed: " + stop.reason;
    else if (stop.kind === "missing") reason = "not in the result";
    if (reason !== undefined) {
      naCount(role, reason);
      return markCell("n/a", reason);
    }
    return notRun(role, markCell("not run", "not run (" + stop.reason + ")"), stop.reason);
  }
  return empty();
}
