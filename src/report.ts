import type { ResultFile, ResultEntry } from "./contract.ts";
import type { Project } from "./project.ts";
import type { BuildSpec, Role } from "./versions.ts";
import { pct, fixedMs, stripAnsi, dateUtc, timeUtc } from "./util/format.ts";
import { median as medianOf } from "./util/stats.ts";

export type Outcome =
  | { kind: "result", result: ResultFile, sec: number, log: string }
  | { kind: "build failed" | "suite failed", reason: string, log?: string }
  | { kind: "n/a", reason: string }
  | { kind: "same", as: Role }
  // reason: why a role got no job at all (the reference's build of the suite failed); none: stopped by a SIGTERM.
  | { kind: "not run", reason?: string };

export type Mark = "n/a" | "build failed" | "suite failed" | "same" | "not run";

// `counterDiffs` ("name build → today") is information for <suite>.md, except in a counterOnly row, where the work
// counters are the verdict (`counterVerdict`) and the time is information.
export interface Cell {
  median?: number;
  delta?: number;
  mark?: Mark;
  reason?: string;
  flags: Array<"jsonErrors">;
  counterDiffs: string[];
  counterVerdict?: Verdict;
  // A cell of the second run's plan (src/rerun.ts): confirmed keeps its highlight (median and delta are then from all
  // samples of both runs), unconfirmed and unchecked have none; `twice` is what each run gave, for <suite>.md.
  rerun?: "confirmed" | "unconfirmed" | "unchecked";
  twice?: Twice;
  // The pairs of an interleaved measurement (src/gh): each repeat's own medians. `rerun` then says whether every repeat
  // agreed with the pooled delta.
  repeats?: Array<Repeat>;
}

// One repeat of an interleaved measurement: the medians of today and of the build, and their delta.
export interface Repeat { today: number, build: number, delta?: number }

// The medians of a planned cell: the first run, the second (what of it was measured) and all samples together.
export interface Twice {
  first: { today: number, build: number, delta?: number };
  again: { today?: number, build?: number, delta?: number };
  both?: { today: number, build: number, delta?: number };
  // Why there is no second run of today or of the build ("yesterday failed (timeout 300 s)").
  missing: string[];
}

// The cells measured twice, per role, and what the second run gave: its result per role, or why it gave none.
export type RerunPlan = Partial<Record<Role, Array<string>>>;
export interface Rerun {
  plan: RerunPlan;
  results: Partial<Record<Role, ResultFile>>;
  failed?: Partial<Record<Role, string>>;
}

// counterOnly: the runner's flag on the reference's entry (the same runner measures every build): the action is too
// short or not repeatable to judge by time, "its time is reported, its counters judged".
export interface Row { id: string, cells: Partial<Record<Role, Cell>>, counterOnly?: boolean }

export type Verdict = "up" | "down";

export interface SuiteMatrix {
  suite: string;
  roles: Role[];
  rows: Row[];
  // Highlighted cells per role: up - slower than the build, down - faster.
  up: Partial<Record<Role, number>>;
  down: Partial<Record<Role, number>>;
  noisy: Role[];
  failed: Array<{ role: Role, kind: "build failed" | "suite failed", reason: string, log?: string, tail?: string[] }>;
  // Scenarios that failed or were killed on the reference build (the runner's skips are not here).
  failedToday: Array<{ id: string, error: string }>;
  incomplete: Partial<Record<Role, number>>;
  // Why a role's result is incomplete (the runner's reason), whether or not its unrun ids are rows.
  incompleteReason: Partial<Record<Role, string>>;
  notRun: Role[];
  notRunReason: Partial<Record<Role, string>>;
  na: Partial<Record<Role, Record<string, number>>>;
  flagged: Partial<Record<Role, number>>;
  sec: Partial<Record<Role, number>>;
  // Second runs that gave no result: "<role> <kind> (<reason>)".
  rerunFailed?: string[];
}

const RATIO = 0.25;
// A work counter of a counterOnly row changed: over 2% and over 1, as v1's judge had it for work counters.
const COUNTER_RATIO = 0.02;
const COUNTER_MIN = 1;

export function minDeltaOf(suite: string): number {
  return suite === "core" ? 2 : 8;
}

function clean(text: string): string {
  return text.replace(stripAnsi, "");
}

// The first line of an error without colour codes; the hang guard's kill and Playwright's timeout read the same.
export function naReason(text: string): string {
  const plain = clean(text);
  if (/Test timeout of 300000ms exceeded/.test(plain) || /killed after 300 s/.test(plain)) return "timeout 300 s";
  return plain.split(/\r?\n/).map((l: string) => l.trim()).find((l: string) => !!l) || "failed";
}

// up: slower than the build, down: faster. A counterOnly row by its work counters, any other row by its time: today's
// median is the build's median times (1 + delta), so the absolute difference is |median * delta|.
// A highlight from a second run counts only when that run confirmed it.
export function verdictOf(row: Row, role: Role, suite: string): Verdict | undefined {
  const c = row.cells[role];
  if (!c) return undefined;
  if (row.counterOnly) return c.counterVerdict;
  if (c.rerun === "unconfirmed" || c.rerun === "unchecked") return undefined;
  return timeVerdict(c.median, c.delta, suite);
}

export function timeVerdict(buildMedian: number | undefined, delta: number | undefined, suite: string): Verdict | undefined {
  if (delta === undefined || buildMedian === undefined) return undefined;
  if (Math.abs(delta) > RATIO && Math.abs(buildMedian * delta) > minDeltaOf(suite)) return delta > 0 ? "up" : "down";
  return undefined;
}

export function isHighlighted(row: Row, role: Role, suite: string): boolean {
  return verdictOf(row, role, suite) !== undefined;
}

function bump(map: Partial<Record<Role, number>>, role: Role): void {
  map[role] = (map[role] || 0) + 1;
}

// The work counters that differ, "name build → today", and what they say when the row is judged by them: any counter
// that grew over the thresholds makes it slower, only ones that fell make it faster.
export function compareCounters(today: ResultEntry, build: ResultEntry): { diffs: string[], verdict?: Verdict } {
  const diffs: string[] = [];
  let up = false;
  let down = false;
  for (const [name, c] of Object.entries(today.counters || {})) {
    const b = (build.counters || {})[name];
    if (c.kind !== "work" || !b || b.kind !== "work" || c.value === null || b.value === null) continue;
    if (c.value === b.value) continue;
    diffs.push(name + " " + b.value + " → " + c.value);
    if (c.value > b.value * (1 + COUNTER_RATIO) && c.value > b.value + COUNTER_MIN) up = true;
    if (c.value < b.value / (1 + COUNTER_RATIO) && c.value < b.value - COUNTER_MIN) down = true;
  }
  return { diffs: diffs, verdict: up ? "up" : down ? "down" : undefined };
}

// A cell that holds no measurement, only why.
export const markCell = (m: Mark, reason?: string): Cell => ({ mark: m, reason: reason, flags: [], counterDiffs: [] });

// Today over the build minus one; none when the build has no time.
export const deltaOf = (today: number, build: number): number | undefined => (build > 0 ? today / build - 1 : undefined);
// The samples of an entry, or its median when it has none.
export const samplesOf = (e: ResultEntry): number[] => (e.samples && e.samples.length > 0 ? e.samples : [e.median]);

// A planned cell after the second run: the medians of all samples of today and of the build when both were measured
// again; a confirmation needs the same verdict as the first run.
function measuredTwice(c: Cell, id: string, ref: Role, role: Role, t: ResultEntry, mine: ResultEntry, rerun: Rerun, suite: string): void {
  const first = { today: t.median, build: mine.median, delta: c.delta };
  const firstVerdict = timeVerdict(mine.median, c.delta, suite);
  const entry = (r: Role): ResultEntry | undefined => rerun.results[r]?.results.find((e: ResultEntry) => e.id === id);
  const why = (r: Role): string => {
    const failedRun = rerun.failed && rerun.failed[r];
    if (failedRun) return r + " " + failedRun;
    const file = rerun.results[r];
    if (!file) return r + " not run";
    const f = file.failed.find((x) => x.id === id);
    if (f) return r + " failed (" + naReason(f.error) + ")";
    if (file.incomplete && file.incomplete.unrun.indexOf(id) > -1) return r + " not run (" + file.incomplete.reason + ")";
    return r + " missing";
  };
  const rt = entry(ref);
  const rb = entry(role);
  const again = { today: rt?.median, build: rb?.median, delta: rt && rb ? deltaOf(rt.median, rb.median) : undefined };
  if (!rt || !rb) {
    c.rerun = "unchecked";
    c.twice = { first: first, again: again, missing: [rt ? "" : why(ref), rb ? "" : why(role)].filter((x: string) => !!x) };
    return;
  }
  const both = { today: medianOf(samplesOf(t).concat(samplesOf(rt))), build: medianOf(samplesOf(mine).concat(samplesOf(rb))), delta: undefined as number | undefined };
  both.delta = deltaOf(both.today, both.build);
  c.median = both.build;
  c.delta = both.delta;
  const v = timeVerdict(both.build, both.delta, suite);
  c.rerun = v !== undefined && v === firstVerdict ? "confirmed" : "unconfirmed";
  c.twice = { first: first, again: again, both: both, missing: [] };
}

// `rerun`: the second run of the suite (src/rerun.ts); without it, the first pass over the queue's results.
export function buildMatrix(suite: string, roles: Role[], outcomes: Partial<Record<Role, Outcome>>, rerun?: Rerun): SuiteMatrix {
  const m: SuiteMatrix = {
    suite: suite, roles: roles, rows: [], up: {}, down: {}, noisy: [], failed: [], failedToday: [], incomplete: {}, incompleteReason: {},
    notRun: [], notRunReason: {}, na: {}, flagged: {}, sec: {}
  };
  if (rerun && rerun.failed) {
    const lines = Object.entries(rerun.failed).map(([r, why]) => r + " " + why);
    if (lines.length > 0) m.rerunFailed = lines;
  }
  const ref = roles[0];
  const results: Partial<Record<Role, ResultFile>> = {};
  for (const role of roles) {
    const o = outcomes[role];
    if (!o) continue;
    if (o.kind === "result") {
      results[role] = o.result;
      m.sec[role] = o.sec;
      if (o.result.environment && o.result.environment.noisy) m.noisy.push(role);
      if (o.result.incomplete) {
        m.incomplete[role] = o.result.incomplete.unrun.length;
        m.incompleteReason[role] = o.result.incomplete.reason;
      }
    } else if (o.kind === "build failed" || o.kind === "suite failed") {
      m.failed.push({ role: role, kind: o.kind, reason: o.reason, log: o.log });
    } else if (o.kind === "not run") {
      m.notRun.push(role);
      if (o.reason) m.notRunReason[role] = o.reason;
    }
  }

  const today = results[ref];
  const todayById = new Map<string, ResultEntry>();
  const ids: string[] = [];
  if (today) {
    for (const e of today.results) {
      todayById.set(e.id, e);
      ids.push(e.id);
    }
    for (const f of today.failed) {
      ids.push(f.id);
      m.failedToday.push({ id: f.id, error: clean(f.error).trim() });
    }
    ids.sort((a: string, b: string) => a < b ? -1 : a > b ? 1 : 0);
  }
  const failedToday = new Map<string, string>(today ? today.failed.map((f): [string, string] => [f.id, f.error]) : []);

  const naCount = (role: Role, reason: string): void => {
    const per = m.na[role] || (m.na[role] = {});
    per[reason] = (per[reason] || 0) + 1;
  };

  for (const id of ids) {
    const row: Row = { id: id, cells: {} };
    if (todayById.get(id)?.counterOnly === true) row.counterOnly = true;
    for (const role of roles) {
      const o = outcomes[role];
      if (!o) continue;
      let c: Cell;
      if (o.kind === "result") {
        const r = o.result;
        const mine = r.results.find((e: ResultEntry) => e.id === id);
        if (role === ref) {
          if (mine) c = { median: mine.median, flags: [], counterDiffs: [] };
          else c = markCell("n/a", naReason(failedToday.get(id) || ""));
        } else if (mine) {
          const t = todayById.get(id);
          c = { median: mine.median, flags: [], counterDiffs: [] };
          if (t) {
            if (mine.median > 0) c.delta = t.median / mine.median - 1;
            if (t.jsonErrors !== mine.jsonErrors) c.flags.push("jsonErrors");
            const counters = compareCounters(t, mine);
            c.counterDiffs = counters.diffs;
            if (row.counterOnly && counters.verdict) c.counterVerdict = counters.verdict;
            if (rerun && !row.counterOnly && (rerun.plan[role] || []).indexOf(id) > -1) measuredTwice(c, id, ref, role, t, mine, rerun, suite);
          }
        } else {
          const failed = r.failed.find((f) => f.id === id);
          const skipped = r.skipped.find((s) => s.id === id);
          if (r.incomplete && r.incomplete.unrun.indexOf(id) > -1) c = markCell("not run", "not run (" + r.incomplete.reason + ")");
          else if (skipped) c = markCell("n/a", skipped.reason);
          else if (failed) c = markCell("n/a", naReason(failed.error));
          else c = markCell("n/a", "not in the result");
          if (c.mark === "n/a") naCount(role, c.reason as string);
        }
      } else if (o.kind === "same") {
        c = markCell("same", o.as);
      } else if (o.kind === "n/a") {
        c = markCell("n/a", o.reason);
        naCount(role, o.reason);
      } else {
        c = markCell(o.kind);
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

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number): string => String(n).split("").map((d: string) => SUP[Number(d)]).join("");
const esc = (s: string): string => s.replace(/\|/g, "\\|");

function median(v: number | undefined): string {
  if (v === undefined) return "—";
  return fixedMs(v, v < 1 ? 2 : v < 10 ? 2 : v < 100 ? 1 : 0, "—");
}

export function suiteMarkdown(project: Project, specs: Array<BuildSpec & { node?: string }>, m: SuiteMatrix, date: Date, note?: string): string {
  const out: string[] = [];
  const ref = m.roles[0];
  const minDelta = minDeltaOf(m.suite);
  out.push("# " + project.name + " · " + m.suite + " · " + timeUtc(date));
  if (note) out.push("", "> " + note);

  out.push("", "| build | commit | date | node | sec | n/a |", "|---|---|---|---|--:|--:|");
  for (const s of specs) {
    const node = s.node || (s.sameAs && specs.find((e) => e.role === s.sameAs)?.node) || "—";
    const sec = m.sec[s.role];
    const na = m.na[s.role];
    const naSum = na ? Object.values(na).reduce((a: number, b: number) => a + b, 0) : 0;
    const commit = "[" + s.sha.slice(0, 9) + "](" + project.repo + "/commit/" + s.sha + ")";
    out.push("| " + [s.role, commit, dateUtc(s.date), node, sec === undefined ? "—" : String(Math.round(sec)), sec === undefined ? "—" : String(naSum)].join(" | ") + " |");
  }
  const roleLines: string[] = [];
  for (const role of m.roles) {
    const n = m.incomplete[role];
    const why = m.notRunReason[role];
    if (why) roleLines.push("- " + role + " — not run: " + why);
    if (n === undefined) continue;
    const reason = m.incompleteReason[role] || "";
    roleLines.push("- " + role + " — incomplete: " + n + " unrun" + (reason ? " (" + reason + ")" : ""));
  }
  for (const line of m.rerunFailed || []) roleLines.push("- rerun: " + line);
  if (roleLines.length > 0) out.push("", ...roleLines);

  const notes: string[] = [];
  if (m.rows.length > 0) {
    const sorted = m.roles;
    out.push("", "| scenario | " + ref + ", ms | " + sorted.slice(1).join(" | ") + " |", "|---|--:|" + sorted.slice(1).map(() => "--:").join("|") + "|");
    for (const row of m.rows) {
      const cells: string[] = [esc(row.id) + (row.counterOnly ? " ᶜ" : "")];
      for (const role of sorted) {
        const c = row.cells[role];
        if (!c) cells.push("—");
        else if (role === ref) cells.push(c.mark ? "n/a" : median(c.median));
        else if (c.mark === "n/a") {
          const reason = c.reason as string;
          let i = notes.indexOf(reason);
          if (i < 0) i = notes.push(reason) - 1;
          cells.push("n/a" + sup(i + 1));
        } else if (c.mark === "same") cells.push("= " + (c.reason || ref));
        else if (c.mark) cells.push(c.mark);
        else {
          let t = pct(c.delta);
          const v = verdictOf(row, role, m.suite);
          if (row.counterOnly && v) t += v === "up" ? " 🔴 **work**" : " 🟢 **work**";
          else if (v) t = (v === "up" ? "🔴 **" : "🟢 **") + t + "**";
          if (c.repeats) {
            if (c.rerun === "confirmed") t += " ʳ";
          } else if (c.rerun) t += c.rerun === "unchecked" ? " ʳ?" : " ʳ";
          if (c.flags.length > 0) t += " ⚑";
          cells.push(t);
        }
      }
      out.push("| " + cells.join(" | ") + " |");
    }
  }
  if (notes.length > 0) out.push("", "n/a:", ...notes.map((r: string, i: number) => "- " + sup(i + 1) + " " + r));

  out.push("", "🔴 slower · 🟢 faster (over " + RATIO * 100 + "% and over " + minDelta + " ms)");
  if (m.rows.some((r: Row) => r.counterOnly)) {
    out.push("ᶜ counter-only: the time is for reference; judged by work counters (over " + COUNTER_RATIO * 100 + "% and over " + COUNTER_MIN + ")");
  }
  const longest = Math.max(0, ...m.rows.map((r: Row) => Math.max(0, ...Object.values(r.cells).map((c?: Cell) => (c && c.repeats ? c.repeats.length : 0)))));
  if (longest > 0) {
    out.push("ʳ every repeat agrees: all " + longest + " interleaved runs of each build on one machine are over the threshold in the same direction");
  }
  const twice = (state: Cell["rerun"]): boolean => m.rows.some((r: Row) => Object.values(r.cells).some((c?: Cell) => !!c && !c.repeats && (state ? c.rerun === state : !!c.rerun && c.rerun !== "unchecked")));
  if (twice(undefined)) out.push("ʳ measured twice: Δ from the medians of both runs, highlighted only when confirmed");
  if (twice("unchecked")) out.push("ʳ? not measured twice (stopped or failed): not highlighted");

  if (m.failedToday.length > 0) {
    out.push("", "## Failed on " + ref, ...m.failedToday.map((f) => "- " + f.id + ": " + (f.error.split(/\r?\n/)[0] || "failed")));
  }
  const flagged: string[] = [];
  const judged: string[] = [];
  const counters: string[] = [];
  for (const row of m.rows) {
    for (const role of m.roles) {
      const c = row.cells[role];
      if (!c) continue;
      if (c.flags.indexOf("jsonErrors") > -1) flagged.push("- " + row.id + " (" + role + "): jsonErrors differ from " + ref);
      if (c.counterDiffs.length > 0) (row.counterOnly ? judged : counters).push("- " + row.id + " (" + role + "): " + c.counterDiffs.join(", "));
    }
  }
  if (flagged.length > 0) out.push("", "## ⚑ jsonErrors differ", ...flagged);
  const measured: string[] = [];
  const ms = (today?: number, build?: number): string => "(" + median(today) + " / " + median(build) + " ms)";
  for (const row of m.rows) {
    for (const role of m.roles) {
      const c = row.cells[role];
      if (!c || !c.twice) continue;
      const w = c.twice;
      let line = "- " + row.id + " (" + role + "): first " + pct(w.first.delta) + " " + ms(w.first.today, w.first.build) + ", ";
      if (w.both) {
        line += "again " + pct(w.again.delta) + " " + ms(w.again.today, w.again.build) + ", both " + pct(w.both.delta) + " — " + (c.rerun === "confirmed" ? "confirmed" : "not confirmed");
      } else {
        const got = [w.again.today !== undefined ? ref + " " + median(w.again.today) + " ms" : "", w.again.build !== undefined ? role + " " + median(w.again.build) + " ms" : ""];
        line += "again: " + got.filter((x: string) => !!x).concat(w.missing).join(", ") + " — not measured twice";
      }
      measured.push(line);
    }
  }
  if (measured.length > 0) out.push("", "## Measured twice", ...measured);
  const repeated: string[] = [];
  for (const row of m.rows) {
    for (const role of m.roles) {
      const c = row.cells[role];
      if (!c || !c.repeats || (c.rerun !== "confirmed" && c.rerun !== "unconfirmed") || c.median === undefined || c.delta === undefined) continue;
      repeated.push("- " + row.id + " (" + role + "): " + c.repeats.map((x: Repeat) => pct(x.delta)).join(" · ") + " → " + pct(c.delta) + " " +
        ms(c.median * (1 + c.delta), c.median) + " — " + (c.rerun === "confirmed" ? "every repeat agrees" : "not every repeat agrees"));
    }
  }
  if (repeated.length > 0) out.push("", "## Repeats", ...repeated);
  if (judged.length > 0) out.push("", "## Work counters of ᶜ scenarios (judged)", ...judged);
  if (counters.length > 0) out.push("", "## Work counters (information)", ...counters);
  for (const f of m.failed) {
    out.push("", "## " + f.role + ": " + f.reason);
    // The reader has history/<run>/, where the night's logs/ is: the container's /out/logs path means nothing there.
    if (f.log) out.push("log: logs/" + f.log.split(/[\\/]/).pop());
    if (f.tail && f.tail.length > 0) out.push("", "```", ...f.tail, "```");
  }
  out.push("", "Δ = today / build − 1.", "");
  return out.join("\n");
}
