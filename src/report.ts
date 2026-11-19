import type { ResultFile, ResultEntry, Counters } from "./contract.ts";
import type { Project } from "./project.ts";
import type { Role } from "./versions.ts";
import { pct, fixedMs, stripAnsi, timeUtc } from "./util/format.ts";
import { median as medianOf } from "./util/stats.ts";

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

// `counterDiffs` ("name build → today") are the work counters' differences, `kindDiffs` the other kinds'. A counter
// change that every repeat confirms is a verdict (`counterVerdict`, decided by a counter of `counterKind`): in a
// counterOnly row the only one, in any other row next to the time's.
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
  // The pairs of an interleaved measurement (src/gh): each repeat's own medians. `rerun` then says whether every repeat
  // agreed with the pooled delta: confirmed keeps its highlight, unconfirmed has none.
  rerun?: "confirmed" | "unconfirmed";
  repeats?: Array<Repeat>;
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
// A work counter changed: over 2% and over 1.
const COUNTER_RATIO = 0.02;
const COUNTER_MIN = 1;
// A leak counter (growth per sample) changed by 1 or more; a heap counter (KB per sample) over 25% and over 16 KB.
const LEAK_MIN = 1;
const HEAP_RATIO = 0.25;
const HEAP_MIN = 16;

// The rule of each counter kind the monitor judges (what a kind counts: the runner's perf/CONTRACT.md). A change over
// the ratio and over the minimum, or by the minimum or more (`atLeast`). Other kinds (dom, unknown) are neither listed
// nor judged.
interface CounterRule { ratio: number, min: number, atLeast?: boolean }
const COUNTER_RULES: Record<string, CounterRule> = {
  work: { ratio: COUNTER_RATIO, min: COUNTER_MIN },
  // Layouts and style recalcs: a frame inside an action may add one.
  render: { ratio: COUNTER_RATIO, min: COUNTER_MIN },
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

// The verdict of a cell's time alone: none for an unconfirmed one.
export function cellTimeVerdict(c: Cell, suite: string): Verdict | undefined {
  if (c.rerun === "unconfirmed") return undefined;
  return timeVerdict(c.median, c.delta, suite);
}

export function timeVerdict(buildMedian: number | undefined, delta: number | undefined, suite: string): Verdict | undefined {
  if (delta === undefined || buildMedian === undefined) return undefined;
  if (Math.abs(delta) > RATIO && Math.abs(buildMedian * delta) > minDeltaOf(suite)) return delta > 0 ? "up" : "down";
  return undefined;
}

export interface CounterJudgement { diffs: string[], kindDiffs: KindDiff[], verdict?: Verdict, kind?: string }

// The counters that differ, "name build → today" (work ones in `diffs`, the other judged kinds in `kindDiffs`), and
// what they say by their kind's rule: any counter that grew over its thresholds makes it slower, only ones that fell
// make it faster. `kind` is the kind of the first counter that decided.
function judgeCounters(today: { counters: Counters }, build: { counters: Counters }): CounterJudgement {
  const diffs: string[] = [];
  const kindDiffs: KindDiff[] = [];
  let upKind: string | undefined;
  let downKind: string | undefined;
  for (const [name, c] of Object.entries(today.counters || {})) {
    const b = (build.counters || {})[name];
    const rule = ruleOf(c.kind);
    if (!rule || !b || b.kind !== c.kind || c.value === null || b.value === null) continue;
    if (c.value === b.value) continue;
    const text = name + " " + b.value + " → " + c.value;
    if (c.kind === "work") diffs.push(text);
    else kindDiffs.push({ kind: c.kind, text: text });
    const d = directionOf(rule, c.value, b.value);
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

// The counters of an interleaved measurement: the differences of the medians over the repeats, and a verdict only
// when every repeat (today's run i against the build's run i) agrees with the medians' one, as for the time.
export function counterVerdictOfRepeats(today: ResultEntry[], build: ResultEntry[]): CounterJudgement {
  const n = Math.min(today.length, build.length);
  const pooled = judgeCounters(pooledCounters(today.slice(0, n)), pooledCounters(build.slice(0, n)));
  let agreed = n > 0 && pooled.verdict !== undefined;
  for (let i = 0; i < n && agreed; i++) agreed = judgeCounters(today[i], build[i]).verdict === pooled.verdict;
  return { diffs: pooled.diffs, kindDiffs: pooled.kindDiffs, verdict: agreed ? pooled.verdict : undefined, kind: agreed ? pooled.kind : undefined };
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
          let t = pct(c.delta);
          // The time's verdict on the delta; a counter verdict after it, by the kind that decided.
          const badge = (v: Verdict): string => (v === "up" ? " 🔴 **" : " 🟢 **") + (c.counterKind || "work") + "**";
          if (row.counterOnly) {
            const v = verdictOf(row, role, m.suite);
            if (v) t += badge(v);
          } else {
            const tv = cellTimeVerdict(c, m.suite);
            if (tv) t = (tv === "up" ? "🔴 **" : "🟢 **") + t + "**";
            if (c.counterVerdict) t += badge(c.counterVerdict);
          }
          if (c.repeats && c.rerun === "confirmed") t += " ʳ";
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
  // The line of the counter rules, when a counter decided a cell the ᶜ line does not explain.
  if (m.rows.some((r: Row) => Object.values(r.cells).some((c?: Cell) => !!c && !!c.counterVerdict && (!r.counterOnly || (!!c.counterKind && c.counterKind !== "work"))))) {
    out.push("🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over " + COUNTER_RATIO * 100 + "% and over " +
      COUNTER_MIN + "; leak: by " + LEAK_MIN + " or more per sample; heap: over " + HEAP_RATIO * 100 + "% and over " + HEAP_MIN + " KB per sample)");
  }
  const longest = Math.max(0, ...m.rows.map((r: Row) => Math.max(0, ...Object.values(r.cells).map((c?: Cell) => (c && c.repeats ? c.repeats.length : 0)))));
  if (longest > 0) {
    out.push("ʳ every repeat agrees: all " + longest + " interleaved runs of each build on one machine are over the threshold in the same direction");
  }
  if (m.rows.some((r: Row) => Object.values(r.cells).some((c?: Cell) => !!c && c.flags.indexOf("jsonErrors") > -1))) {
    out.push("⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today");
  }

  if (m.failedToday.length > 0) {
    out.push("", "## Failed on " + label(ref), ...m.failedToday.map((f) => "- " + f.id + ": " + (f.error.split(/\r?\n/)[0] || "failed")));
  }
  const flagged: string[] = [];
  const judged: string[] = [];
  const counters: string[] = [];
  // The counters of the other kinds, and the work ones of a time row a counter decided, with their kind.
  const kindJudged: string[] = [];
  const kindInfo: string[] = [];
  for (const row of m.rows) {
    for (const role of m.roles) {
      const c = row.cells[role];
      if (!c) continue;
      const line = (diffs: string[]): string => "- " + row.id + " (" + label(role) + "): " + diffs.join(", ");
      const kinds = (c.kindDiffs || []).map((d: KindDiff) => d.text + " (" + d.kind + ")");
      if (c.flags.indexOf("jsonErrors") > -1) flagged.push("- " + row.id + " (" + label(role) + "): jsonErrors differ from " + label(ref));
      if (row.counterOnly) {
        if (c.counterDiffs.length > 0) judged.push(line(c.counterDiffs));
        if (kinds.length > 0) (c.counterVerdict ? kindJudged : kindInfo).push(line(kinds));
      } else if (c.counterVerdict) {
        const all = c.counterDiffs.map((d: string) => d + " (work)").concat(kinds);
        if (all.length > 0) kindJudged.push(line(all));
      } else {
        if (c.counterDiffs.length > 0) counters.push(line(c.counterDiffs));
        if (kinds.length > 0) kindInfo.push(line(kinds));
      }
    }
  }
  if (flagged.length > 0) out.push("", "## ⚑ jsonErrors differ", ...flagged);
  // A row per highlighted or unconfirmed cell: its medians in ms, the pooled delta, a column per repeat.
  const repeated: string[] = [];
  const nums = Array.from({ length: longest }, (_: unknown, i: number) => String(i + 1));
  for (const row of m.rows) {
    for (const role of m.roles) {
      const c = row.cells[role];
      if (!c || !c.repeats || (c.rerun !== "confirmed" && c.rerun !== "unconfirmed") || c.median === undefined || c.delta === undefined) continue;
      const reps: Repeat[] = c.repeats;
      const deltas = nums.map((_: string, i: number) => (reps[i] ? pct(reps[i].delta) : "—"));
      repeated.push("| " + [esc(row.id), label(role), median(c.median * (1 + c.delta)), median(c.median), pct(c.delta), ...deltas,
        c.rerun === "confirmed" ? "yes" : "no"].join(" | ") + " |");
    }
  }
  if (repeated.length > 0) {
    out.push("", "## Repeats", "", "| scenario | build | today, ms | build, ms | Δ | " + nums.join(" | ") + " | all agree |",
      "|---|---|--:|--:|--:|" + nums.map(() => "--:|").join("") + "---|", ...repeated);
  }
  if (judged.length > 0) out.push("", "## Work counters of ᶜ scenarios (judged)", ...judged);
  if (counters.length > 0) out.push("", "## Work counters (information)", ...counters);
  if (kindJudged.length > 0) out.push("", "## Counters (judged)", ...kindJudged);
  if (kindInfo.length > 0) out.push("", "## Counters (information)", ...kindInfo);
  for (const f of m.failed) {
    out.push("", "## " + label(f.role) + ": " + f.reason);
    // The log is the file attached to the Discord post; a build log is also in the run's artifact buildlog-<role>.
    if (f.log) out.push("log: " + f.log.split(/[\\/]/).pop() + " (attached to the post" + (f.kind === "build failed" ? "; artifact buildlog-" + f.role : "") + ")");
    if (f.tail && f.tail.length > 0) out.push("", "```", ...f.tail, "```");
  }
  out.push("", "Δ = today / build − 1.", "");
  return out.join("\n");
}
