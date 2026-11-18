import type { ResultFile, ResultEntry } from "./contract.ts";
import type { Project } from "./project.ts";
import type { Role } from "./versions.ts";
import { pct, fixedMs, stripAnsi, timeUtc } from "./util/format.ts";

export type Outcome =
  | { kind: "result", result: ResultFile, sec: number, log: string }
  | { kind: "build failed" | "suite failed", reason: string, log?: string }
  | { kind: "n/a", reason: string }
  | { kind: "same", as: Role }
  // reason: why a role got no job at all (the reference's build of the suite failed).
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
// A work counter of a counterOnly row changed: over 2% and over 1.
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
// A highlight of an interleaved measurement counts only when every repeat agreed.
export function verdictOf(row: Row, role: Role, suite: string): Verdict | undefined {
  const c = row.cells[role];
  if (!c) return undefined;
  if (row.counterOnly) return c.counterVerdict;
  if (c.rerun === "unconfirmed") return undefined;
  return timeVerdict(c.median, c.delta, suite);
}

export function timeVerdict(buildMedian: number | undefined, delta: number | undefined, suite: string): Verdict | undefined {
  if (delta === undefined || buildMedian === undefined) return undefined;
  if (Math.abs(delta) > RATIO && Math.abs(buildMedian * delta) > minDeltaOf(suite)) return delta > 0 ? "up" : "down";
  return undefined;
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

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number): string => String(n).split("").map((d: string) => SUP[Number(d)]).join("");
const esc = (s: string): string => s.replace(/\|/g, "\\|");

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
    if (why) roleLines.push("- " + role + " — not run: " + why);
    if (n === undefined) continue;
    const reason = m.incompleteReason[role] || "";
    roleLines.push("- " + role + " — incomplete: " + n + " unrun" + (reason ? " (" + reason + ")" : ""));
  }
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
  const longest = Math.max(0, ...m.rows.map((r: Row) => Math.max(0, ...Object.values(r.cells).map((c?: Cell) => (c && c.repeats ? c.repeats.length : 0)))));
  if (longest > 0) {
    out.push("ʳ every repeat agrees: all " + longest + " interleaved runs of each build on one machine are over the threshold in the same direction");
  }
  if (m.rows.some((r: Row) => Object.values(r.cells).some((c?: Cell) => !!c && c.flags.indexOf("jsonErrors") > -1))) {
    out.push("⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today");
  }

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
  const ms = (today?: number, build?: number): string => "(" + median(today) + " / " + median(build) + " ms)";
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
    // The log is the file attached to the Discord post; a build log is also in the run's artifact buildlog-<role>.
    if (f.log) out.push("log: " + f.log.split(/[\\/]/).pop() + " (attached to the post" + (f.kind === "build failed" ? "; artifact buildlog-" + f.role : "") + ")");
    if (f.tail && f.tail.length > 0) out.push("", "```", ...f.tail, "```");
  }
  out.push("", "Δ = today / build − 1.", "");
  return out.join("\n");
}
