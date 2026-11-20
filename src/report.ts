import type { ResultFile, ResultEntry, Counters } from "./contract.ts";
import type { Project } from "./project.ts";
import type { Role } from "./versions.ts";
import { pct, fixedMs, stripAnsi, timeUtc } from "./util/format.ts";
import { median as medianOf, mean, sd, t995 } from "./util/stats.ts";

export type Outcome =
  | { kind: "result", result: ResultFile, sec: number, log: string }
  | { kind: "build failed" | "suite failed", reason: string, log?: string }
  | { kind: "n/a", reason: string }
  | { kind: "same", as: Role }
  // reason: why a role got no job at all (the reference's build of the suite failed).
  | { kind: "not run", reason?: string };

export type Mark = "n/a" | "build failed" | "suite failed" | "same" | "not run";

// A difference of a counter of another kind than work: "name build → today" and its kind.
export interface KindDiff { kind: string, text: string }

// One judged counter whose medians over the repeats differ: both medians, and a verdict when it changed the same way
// over its kind's thresholds in every repeat (today's run i against the build's run i).
export interface CounterChange { name: string, kind: string, build: number, today: number, verdict?: Verdict }

// `counterDiffs` ("name build → today") are the work counters' differences, `kindDiffs` the other kinds'; the counter
// that decided comes first in its list. A leak or heap counter that changed in every repeat is a verdict
// (`counterVerdict`, decided by a counter of `counterKind`): in a counterOnly row the only one, in any other row next
// to the time's. Work and render counters are information, never a verdict.
// `counterChanges` are the same differences per counter, with each one's verdict; `counterValues` (today's cell only)
// are today's counters, the medians over all its runs.
export interface Cell {
  median?: number;
  delta?: number;
  mark?: Mark;
  reason?: string;
  flags: Array<"jsonErrors">;
  counterDiffs: string[];
  kindDiffs?: KindDiff[];
  counterVerdict?: Verdict;
  counterKind?: string;
  counterChanges?: CounterChange[];
  counterValues?: Record<string, number>;
  // The pairs of an interleaved measurement (src/gh): each repeat's own medians. `rerun` says whether the repeats
  // confirm a change: confirmed keeps its highlight, unconfirmed has none. With two or more repeats the cell has the
  // 99% `interval` of today / build − 1 (repeatsVerdict) and is judged by it alone; with one repeat, by the pooled
  // delta and every repeat over 25% (timeVerdict).
  rerun?: "confirmed" | "unconfirmed";
  repeats?: Array<Repeat>;
  interval?: [number, number];
}

// One repeat of an interleaved measurement: the medians of today and of the build, and their delta.
export interface Repeat { today: number, build: number, delta?: number }

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
}

const RATIO = 0.25;
// A leak counter (growth per sample) changed by 1 or more; a heap counter (KB per sample) over 25% and over 16 KB.
const LEAK_MIN = 1;
const HEAP_RATIO = 0.25;
const HEAP_MIN = 16;

// The counter kinds the monitor lists (what a kind counts: the runner's perf/CONTRACT.md); other kinds (dom, unknown)
// are neither listed nor judged. Only leak and heap are judged: work (calls in survey-core) and render (layouts and
// style recalcs) are the amount of work, whose cost the time shows, so they are information.
const LISTED_KINDS = ["work", "render", "leak", "heap"];
const listed = (kind: string): boolean => LISTED_KINDS.indexOf(kind) > -1;

// The rule of each judged kind: a change over the ratio and over the minimum, or by the minimum or more (`atLeast`).
interface CounterRule { ratio: number, min: number, atLeast?: boolean }
const COUNTER_RULES: Record<string, CounterRule> = {
  leak: { ratio: 0, min: LEAK_MIN, atLeast: true },
  // Not 0 without a leak and a few percent apart between runs (JIT code, V8's caches).
  heap: { ratio: HEAP_RATIO, min: HEAP_MIN }
};

const ruleOf = (kind: string): CounterRule | undefined => (Object.prototype.hasOwnProperty.call(COUNTER_RULES, kind) ? COUNTER_RULES[kind] : undefined);

function directionOf(rule: CounterRule, today: number, build: number): Verdict | undefined {
  const grew = rule.atLeast ? today - build >= rule.min : today > build + rule.min;
  const fell = rule.atLeast ? build - today >= rule.min : today < build - rule.min;
  if (today > build * (1 + rule.ratio) && grew) return "up";
  if (today < build / (1 + rule.ratio) && fell) return "down";
  return undefined;
}

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

// up: slower than the build, down: faster. A counterOnly row by its counters, any other row by its time and its
// counters, slower first: today's median is the build's median times (1 + delta), so the absolute difference is
// |median * delta|. A highlight of an interleaved measurement counts only when every repeat agreed.
export function verdictOf(row: Row, role: Role, suite: string): Verdict | undefined {
  const c = row.cells[role];
  if (!c) return undefined;
  if (row.counterOnly) return c.counterVerdict;
  const t = cellTimeVerdict(c, suite);
  if (t === "up" || c.counterVerdict === "up") return "up";
  return t || c.counterVerdict;
}

// The verdict of a cell's time alone: none for an unconfirmed one. A cell with an interval is judged by it alone.
export function cellTimeVerdict(c: Cell, suite: string): Verdict | undefined {
  if (c.rerun === "unconfirmed") return undefined;
  if (c.interval) return c.rerun === "confirmed" ? (c.interval[0] > 0 ? "up" : "down") : undefined;
  return timeVerdict(c.median, c.delta, suite);
}

// The time rule of two or more repeats. Each repeat gives l = ln(today / build); a change is the mean of l, with the
// 99% t-interval of that mean. A change of PRACTICAL or more (and over the suite's ms) is a candidate: confirmed when
// the interval's end nearer to zero is still past CONFIDENT and past the suite's ms, else unconfirmed.
// Why not the fixed 25%: on the history of 2026-11-17..20 the repeats of one pair were 1.5-2.4% apart (the median SD
// of l per suite), so the fixed 25% left out changes of 5-20% that every repeat showed. Replayed on those six nights,
// this rule kept every highlight of the 25% rule, and about 0.01 a night would come from the noise alone.
const PRACTICAL = 0.05;
const CONFIDENT = 0.02;
const percent = (v: number): string => Math.round(v * 100) + "%";

export interface RepeatsJudgement { interval: [number, number], rerun?: "confirmed" | "unconfirmed" }

// `buildMedian` is the cell's median (all the build's samples), the base of the ms floor as in timeVerdict. Undefined
// for fewer than two usable repeats: there is no interval then.
export function repeatsVerdict(repeats: Repeat[], buildMedian: number, suite: string): RepeatsJudgement | undefined {
  const logs = repeats.filter((r: Repeat) => r.today > 0 && r.build > 0).map((r: Repeat) => Math.log(r.today / r.build));
  if (logs.length < 2) return undefined;
  const m = mean(logs);
  const half = t995(logs.length - 1) * sd(logs) / Math.sqrt(logs.length);
  const j: RepeatsJudgement = { interval: [Math.exp(m - half) - 1, Math.exp(m + half) - 1] };
  // The ms of a change by `l` in the direction of the mean, against the build's median.
  const ms = (l: number): number => buildMedian * Math.abs(Math.exp(Math.sign(m) * l) - 1);
  const size = Math.abs(m);
  if (size < Math.log(1 + PRACTICAL) || !(ms(size) > minDeltaOf(suite))) return j;
  const near = size - half;
  j.rerun = near > Math.log(1 + CONFIDENT) && ms(near) > minDeltaOf(suite) ? "confirmed" : "unconfirmed";
  return j;
}

// Whether a matrix has cells judged by repeatsVerdict: the legends then name that rule.
export function judgedByInterval(m: SuiteMatrix): boolean {
  return m.rows.some((r: Row) => Object.values(r.cells).some((c?: Cell) => !!c && !!c.interval));
}

// The interval rule's thresholds for a legend: "5%", "2%".
export function intervalLegend(): { practical: string, confident: string } {
  return { practical: percent(PRACTICAL), confident: percent(CONFIDENT) };
}

export function timeVerdict(buildMedian: number | undefined, delta: number | undefined, suite: string): Verdict | undefined {
  if (delta === undefined || buildMedian === undefined) return undefined;
  if (Math.abs(delta) > RATIO && Math.abs(buildMedian * delta) > minDeltaOf(suite)) return delta > 0 ? "up" : "down";
  return undefined;
}

export interface CounterJudgement { diffs: string[], kindDiffs: KindDiff[], verdict?: Verdict, kind?: string }

// The listed counters that differ, "name build → today" (work ones in `diffs`, the other kinds in `kindDiffs`), and
// what the judged ones (leak, heap) say by their kind's rule: any counter that grew over its thresholds makes it
// slower, only ones that fell make it faster. `kind` is the kind of the first counter that decided.
function judgeCounters(today: { counters: Counters }, build: { counters: Counters }): CounterJudgement {
  const diffs: string[] = [];
  const kindDiffs: KindDiff[] = [];
  let upKind: string | undefined;
  let downKind: string | undefined;
  for (const [name, c] of Object.entries(today.counters || {})) {
    const b = (build.counters || {})[name];
    if (!listed(c.kind) || !b || b.kind !== c.kind || c.value === null || b.value === null) continue;
    if (c.value === b.value) continue;
    const text = name + " " + b.value + " → " + c.value;
    if (c.kind === "work") diffs.push(text);
    else kindDiffs.push({ kind: c.kind, text: text });
    const rule = ruleOf(c.kind);
    const d = rule ? directionOf(rule, c.value, b.value) : undefined;
    if (d === "up" && upKind === undefined) upKind = c.kind;
    if (d === "down" && downKind === undefined) downKind = c.kind;
  }
  return { diffs: diffs, kindDiffs: kindDiffs, verdict: upKind ? "up" : downKind ? "down" : undefined, kind: upKind || downKind };
}

// One run against one run: the differences (another kind than work with its kind in brackets) and the verdict.
export function compareCounters(today: ResultEntry, build: ResultEntry): { diffs: string[], verdict?: Verdict } {
  const j = judgeCounters(today, build);
  return { diffs: j.diffs.concat(j.kindDiffs.map((d: KindDiff) => d.text + " (" + d.kind + ")")), verdict: j.verdict };
}

// Every counter's median over the runs.
function pooledCounters(runs: ResultEntry[]): { counters: Counters } {
  const counters: Counters = {};
  for (const [name, c] of Object.entries((runs[0] && runs[0].counters) || {})) {
    const values = runs.map((r: ResultEntry) => (r.counters || {})[name]).filter((x) => !!x && x.kind === c.kind && typeof x.value === "number")
      .map((x) => x.value as number);
    counters[name] = { value: values.length > 0 ? medianOf(values) : null, kind: c.kind };
  }
  return { counters: counters };
}

// The medians of every counter over the runs, by name (counters without a number left out).
export function counterValuesOf(runs: ResultEntry[]): Record<string, number> {
  const values: Record<string, number> = {};
  for (const [name, c] of Object.entries(pooledCounters(runs).counters)) {
    if (c.value !== null) values[name] = c.value;
  }
  return values;
}

// The listed counters of an interleaved measurement whose medians over the repeats differ, in today's order. A counter
// of a judged kind (leak, heap) has a verdict when the medians' direction by its kind's rule is the direction of every
// repeat, as for the time; work and render never have one.
export function counterChangesOfRepeats(today: ResultEntry[], build: ResultEntry[]): CounterChange[] {
  const n = Math.min(today.length, build.length);
  const t = pooledCounters(today.slice(0, n)).counters;
  const b = pooledCounters(build.slice(0, n)).counters;
  const changes: CounterChange[] = [];
  for (const [name, c] of Object.entries(t)) {
    const bc = b[name];
    if (!listed(c.kind) || !bc || bc.kind !== c.kind || c.value === null || bc.value === null || c.value === bc.value) continue;
    const change: CounterChange = { name: name, kind: c.kind, build: bc.value, today: c.value };
    const rule = ruleOf(c.kind);
    const d = rule ? directionOf(rule, c.value, bc.value) : undefined;
    let agreed = !!rule && d !== undefined;
    for (let i = 0; i < n && agreed; i++) {
      const ti = (today[i].counters || {})[name];
      const bi = (build[i].counters || {})[name];
      agreed = !!ti && !!bi && ti.kind === c.kind && bi.kind === c.kind && ti.value !== null && bi.value !== null &&
        directionOf(rule as CounterRule, ti.value, bi.value) === d;
    }
    if (agreed) change.verdict = d;
    changes.push(change);
  }
  return changes;
}

// The counters of an interleaved measurement: the differences of the medians over the repeats, and a verdict when one
// and the same leak or heap counter changed in every repeat (counterChangesOfRepeats): slower when one grew, faster
// when one fell and none grew. The counter that decided comes first in `kindDiffs`.
export function counterVerdictOfRepeats(today: ResultEntry[], build: ResultEntry[]): CounterJudgement {
  const n = Math.min(today.length, build.length);
  const pooled = judgeCounters(pooledCounters(today.slice(0, n)), pooledCounters(build.slice(0, n)));
  const changes = counterChangesOfRepeats(today, build);
  const decided = changes.find((c: CounterChange) => c.verdict === "up") || (pooled.verdict === "up" ? undefined : changes.find((c: CounterChange) => c.verdict === "down"));
  if (!decided) return { diffs: pooled.diffs, kindDiffs: pooled.kindDiffs, verdict: undefined, kind: undefined };
  const text = decided.name + " " + decided.build + " → " + decided.today;
  const first = <T>(list: T[], is: (x: T) => boolean): T[] => list.filter(is).concat(list.filter((x: T) => !is(x)));
  return {
    diffs: pooled.diffs,
    kindDiffs: first(pooled.kindDiffs, (d: KindDiff) => d.kind === decided.kind && d.text === text),
    verdict: decided.verdict,
    kind: decided.kind
  };
}

// A cell that holds no measurement, only why.
export const markCell = (m: Mark, reason?: string): Cell => ({ mark: m, reason: reason, flags: [], counterDiffs: [] });

// Today over the build minus one; none when the build has no time.
export const deltaOf = (today: number, build: number): number | undefined => (build > 0 ? today / build - 1 : undefined);
// The samples of an entry, or its median when it has none.
export const samplesOf = (e: ResultEntry): number[] => (e.samples && e.samples.length > 0 ? e.samples : [e.median]);

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number): string => String(n).split("").map((d: string) => SUP[Number(d)]).join("");
const esc = (s: string): string => s.replace(/\|/g, "\\|");
// The builds' names in <suite>.md, as in overview.png: an older build by its age in days.
const LABEL: Record<Role, string> = { today: "today", yesterday: "1D", week: "7D", month: "30D" };
const label = (r: string): string => LABEL[r as Role] || r;

function median(v: number | undefined): string {
  if (v === undefined) return "—";
  return fixedMs(v, v < 1 ? 2 : v < 10 ? 2 : v < 100 ? 1 : 0, "—");
}

// The Counters table: a row per scenario and counter with a verdict in some older build, the counters in today's order;
// the scenario's name on its first row only. A build's cell is its value (bold with the verdict's colour when there is one), `=` when the counter did not change,
// `—` when the build has no value. `shown` names each scenario's counters in the table.
function countersTable(m: SuiteMatrix): { lines: string[], shown: Map<string, Set<string>> } {
  const ref = m.roles[0];
  const older = m.roles.slice(1);
  const lines: string[] = [];
  const shown = new Map<string, Set<string>>();
  for (const row of m.rows) {
    const changesOf = (role: Role): CounterChange[] => (row.cells[role] && !row.cells[role]!.mark && row.cells[role]!.counterChanges) || [];
    const judged = new Set<string>();
    for (const role of older) changesOf(role).forEach((x: CounterChange) => { if (x.verdict) judged.add(x.name); });
    if (judged.size === 0) continue;
    const values = (row.cells[ref] && row.cells[ref]!.counterValues) || {};
    const names = Object.keys(values).filter((n: string) => judged.has(n)).concat([...judged].filter((n: string) => !(n in values)));
    shown.set(row.id, judged);
    names.forEach((name: string, i: number) => {
      const first = older.map((role: Role) => changesOf(role).find((x: CounterChange) => x.name === name)).find((x?: CounterChange) => !!x) as CounterChange;
      const cells = older.map((role: Role): string => {
        const c = row.cells[role];
        if (!c || c.mark) return "—";
        const x = changesOf(role).find((y: CounterChange) => y.name === name);
        if (!x) return c.counterValues && name in c.counterValues ? "=" : "—";
        const v = String(x.build);
        return (x.verdict ? (x.verdict === "up" ? "🔴 **" : "🟢 **") + v + "**" : v) + (c.flags.length > 0 ? " ⚑" : "");
      });
      const scenario = i === 0 ? esc(row.id) + (row.counterOnly ? " ᶜ" : "") : "";
      lines.push("| " + [scenario, esc(name), String(name in values ? values[name] : first.today), ...cells].join(" | ") + " |");
    });
  }
  if (lines.length === 0) return { lines: lines, shown: shown };
  const head = ["| scenario | counter | " + label(ref) + " | " + older.map(label).join(" | ") + " |", "|---|---|--:|" + older.map(() => "--:").join("|") + "|"];
  return { lines: head.concat(lines), shown: shown };
}

// A Repeats table per older build with rows, in the builds' order: a row per highlighted or unconfirmed cell, its pooled
// delta, its 99% interval when the table has intervals (repeatsVerdict), a column per repeat, and whether the repeats
// confirm it (then its time is judged).
function repeatsTables(m: SuiteMatrix): string[][] {
  const tables: string[][] = [];
  for (const role of m.roles.slice(1)) {
    const cells = m.rows.map((row: Row) => ({ id: row.id, c: row.cells[role] }))
      .filter((x) => !!x.c && !!x.c.repeats && (x.c.rerun === "confirmed" || x.c.rerun === "unconfirmed") && x.c.delta !== undefined);
    if (cells.length === 0) continue;
    const n = Math.max(...cells.map((x) => (x.c!.repeats as Repeat[]).length));
    const nums = Array.from({ length: n }, (_: unknown, i: number) => String(i + 1));
    const withInterval = cells.some((x) => !!x.c!.interval);
    const interval = (c: Cell): string => (c.interval ? pct(c.interval[0]) + ".." + pct(c.interval[1]) : "—");
    const lines = cells.map((x) => {
      const reps = x.c!.repeats as Repeat[];
      return "| " + [esc(x.id), pct(x.c!.delta), ...(withInterval ? [interval(x.c!)] : []), ...nums.map((_: string, i: number) => (reps[i] ? pct(reps[i].delta) : "—")),
        x.c!.rerun === "confirmed" ? "🟢" : "🔴"].join(" | ") + " |";
    });
    const head = "| scenario | Δ | " + (withInterval ? "99% | " : "") + nums.join(" | ") + " | confirmed |";
    const align = "|---|--:|" + (withInterval ? "--:|" : "") + nums.map(() => "--:|").join("") + "---|";
    tables.push(["## Repeats " + label(role), "", head, align, ...lines]);
  }
  return tables;
}

export function suiteMarkdown(project: Project, m: SuiteMatrix, date: Date, note?: string): string {
  const out: string[] = [];
  const ref = m.roles[0];
  const minDelta = minDeltaOf(m.suite);
  out.push("# " + project.name + " · " + m.suite + " · " + timeUtc(date));
  if (note) out.push("", "> " + note);

  const roleLines: string[] = [];
  for (const role of m.roles) {
    const n = m.incomplete[role];
    const why = m.notRunReason[role];
    if (why) roleLines.push("- " + label(role) + " — not run: " + why);
    if (n === undefined) continue;
    const reason = m.incompleteReason[role] || "";
    roleLines.push("- " + label(role) + " — incomplete: " + n + " unrun" + (reason ? " (" + reason + ")" : ""));
  }
  if (roleLines.length > 0) out.push("", ...roleLines);

  const notes: string[] = [];
  if (m.rows.length > 0) {
    const sorted = m.roles;
    out.push("", "| scenario | " + label(ref) + ", ms | " + sorted.slice(1).map(label).join(" | ") + " |", "|---|--:|" + sorted.slice(1).map(() => "--:").join("|") + "|");
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
        } else if (c.mark === "same") cells.push("= " + label(c.reason || ref));
        else if (c.mark) cells.push(c.mark);
        else {
          // Only the time: a counterOnly row's time is not judged; the counters are in their own table.
          let t = pct(c.delta);
          const tv = row.counterOnly ? undefined : cellTimeVerdict(c, m.suite);
          if (tv) t = (tv === "up" ? "🔴 **" : "🟢 **") + t + "**";
          if (c.flags.length > 0) t += " ⚑";
          cells.push(t);
        }
      }
      out.push("| " + cells.join(" | ") + " |");
    }
  }
  if (notes.length > 0) out.push("", "n/a:", ...notes.map((r: string, i: number) => "- " + sup(i + 1) + " " + r));

  const table = countersTable(m);
  const repeats = repeatsTables(m);
  const byInterval = judgedByInterval(m);
  out.push("", byInterval
    ? "🔴 slower · 🟢 faster: a change of " + percent(PRACTICAL) + " or more whose 99% interval over the repeats clears " + percent(CONFIDENT) + " and " + minDelta + " ms"
    : "🔴 slower · 🟢 faster (over " + RATIO * 100 + "% and over " + minDelta + " ms), in every repeat");
  if (m.rows.some((r: Row) => r.counterOnly)) {
    out.push("ᶜ counter-only: the time is for reference; judged by leak and heap counters");
  }
  if (m.rows.some((r: Row) => Object.values(r.cells).some((c?: Cell) => !!c && c.flags.indexOf("jsonErrors") > -1))) {
    out.push("⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today");
  }
  if (table.lines.length > 0) {
    out.push("Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by " + LEAK_MIN + " or more per sample; heap: over " +
      HEAP_RATIO * 100 + "% and over " + HEAP_MIN + " KB per sample) · = as today");
  }
  if (repeats.length > 0) {
    out.push(byInterval
      ? "confirmed: 🟢 the 99% interval clears " + percent(CONFIDENT) + " and " + minDelta + " ms · 🔴 it does not (its time is not judged)"
      : "confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)");
  }

  if (m.failedToday.length > 0) {
    out.push("", "## Failed on " + label(ref), ...m.failedToday.map((f) => "- " + f.id + ": " + (f.error.split(/\r?\n/)[0] || "failed")));
  }
  const flagged: string[] = [];
  // The counters that changed without a verdict, of every kind, except the ones the Counters table shows.
  const info: string[] = [];
  for (const row of m.rows) {
    const shown = table.shown.get(row.id) || new Set<string>();
    for (const role of m.roles) {
      const c = row.cells[role];
      if (!c) continue;
      if (c.flags.indexOf("jsonErrors") > -1) flagged.push("- " + row.id + " (" + label(role) + "): jsonErrors differ from " + label(ref));
      const diffs = c.counterDiffs.map((d: string): KindDiff => ({ kind: "work", text: d })).concat(c.kindDiffs || [])
        .filter((d: KindDiff) => !shown.has(d.text.split(" ")[0])).map((d: KindDiff) => d.text + " (" + d.kind + ")");
      if (diffs.length > 0) info.push("- " + row.id + " (" + label(role) + "): " + diffs.join(", "));
    }
  }
  if (flagged.length > 0) out.push("", "## ⚑ jsonErrors differ", ...flagged);
  if (table.lines.length > 0) out.push("", "## Counters", "", ...table.lines);
  for (const r of repeats) out.push("", ...r);
  if (info.length > 0) out.push("", "## Counters (information)", ...info);
  for (const f of m.failed) {
    out.push("", "## " + label(f.role) + ": " + f.reason);
    // The log is the file attached to the Discord post; a build log is also in the run's artifact buildlog-<role>.
    if (f.log) out.push("log: " + f.log.split(/[\\/]/).pop() + " (attached to the post" + (f.kind === "build failed" ? "; artifact buildlog-" + f.role : "") + ")");
    if (f.tail && f.tail.length > 0) out.push("", "```", ...f.tail, "```");
  }
  out.push("", "Δ = today / build − 1.", "");
  return out.join("\n");
}
