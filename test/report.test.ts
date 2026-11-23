import { describe, test, expect } from "vitest";
import * as path from "node:path";
import { compareCounters, counterChangesOfRepeats, counterVerdictOfRepeats, markCell, minDeltaOf, naReason, repeatsVerdict, suiteMarkdown, timeVerdict, verdictOf } from "../src/report.ts";
import type { Cell, CounterChange, Repeat, Row, SuiteMatrix } from "../src/report.ts";
import { loadProject } from "../src/project.ts";
import { dateUtc, timeUtc } from "../src/util/format.ts";
import type { Role } from "../src/versions.ts";
import type { ResultEntry } from "../src/contract.ts";
import { result } from "./helpers/result.ts";
import { matrix as matrixOf } from "./helpers/matrix.ts";

const projects = path.join(import.meta.dirname, "..", "projects");
const surveyLibrary = loadProject(projects, "survey-library");
const other = loadProject(path.join(import.meta.dirname, "fixtures", "projects"), "other");

const roles: Role[] = ["today", "yesterday", "week", "month"];
const date = new Date("2026-11-12T09:37:00Z");

// A cell of today's column, and a cell of an older build: its median and today's delta against it.
const own = (median: number): Cell => ({ median: median, flags: [], counterDiffs: [] });
const vs = (today: number, build: number, extra: Partial<Cell> = {}): Cell => ({ median: build, delta: today / build - 1, flags: [], counterDiffs: [], ...extra });
const row = (id: string, cells: Partial<Record<Role, Cell>>, counterOnly = false): Row => (counterOnly ? { id: id, cells: cells, counterOnly: true } : { id: id, cells: cells });
const same = markCell("same", "today");
// Today's cell with its counters, and one counter's change against a build.
const counted = (median: number, values: Record<string, number>): Cell => ({ ...own(median), counterValues: values });
const ch = (name: string, kind: string, build: number, today: number, verdict?: "up" | "down"): CounterChange =>
  (verdict ? { name: name, kind: kind, build: build, today: today, verdict: verdict } : { name: name, kind: kind, build: build, today: today });
const mx = (rows: Row[], over: Partial<SuiteMatrix> = {}): SuiteMatrix => matrixOf("core", { roles: roles, rows: rows, ...over });

describe("naReason", () => {
  test("the first line without colour codes; the hang guard's kill and Playwright's timeout read the same", () => {
    expect(naReason("\u001b[31mTypeError: x\u001b[39m\nat…")).toBe("TypeError: x");
    expect(naReason("Test timeout of 300000ms exceeded.")).toBe("timeout 300 s");
    expect(naReason("killed after 300 s")).toBe("timeout 300 s");
    expect(naReason("")).toBe("failed");
  });
});

// The entry of one scenario with these work counters (kind "work" unless told otherwise).
function withCounters(o: Record<string, number>, kind: "work" | "dom" = "work"): ResultEntry {
  return result([["a", 10, { counters: Object.fromEntries(Object.entries(o).map(([k, v]) => [k, { value: v, kind: kind }])) }]]).results[0];
}
const judge = (today: Record<string, number>, build: Record<string, number>) => compareCounters(withCounters(today), withCounters(build));

describe("compareCounters", () => {
  test("work counters are information: every difference is listed, none is a verdict", () => {
    expect(judge({ expressionRuns: 20555 }, { expressionRuns: 164 })).toEqual({ diffs: ["expressionRuns 164 → 20555"], verdict: undefined });
    expect(judge({ expressionRuns: 0 }, { expressionRuns: 12 })).toEqual({ diffs: ["expressionRuns 12 → 0"], verdict: undefined });
    expect(judge({ rowsCreated: 1 }, { rowsCreated: 0 }).diffs).toEqual(["rowsCreated 0 → 1"]);
    expect(judge({ same: 5 }, { same: 5 })).toEqual({ diffs: [], verdict: undefined });
  });
  test("when one counter grew and another fell, slower wins", () => {
    const today = kinded({ listenerGrowth: [0, "leak"], jsHeapGrowth: [500, "heap"] });
    const build = kinded({ listenerGrowth: [341, "leak"], jsHeapGrowth: [100, "heap"] });
    expect(compareCounters(today, build).verdict).toBe("up");
  });
  test("a dom counter is neither listed nor judged", () => {
    expect(compareCounters(withCounters({ nodes: 900 }, "dom"), withCounters({ nodes: 100 }, "dom"))).toEqual({ diffs: [], verdict: undefined });
  });
});

// The entry of one scenario with counters of any kind: name -> [value, kind].
function kinded(o: Record<string, [number | null, string]>): ResultEntry {
  return result([["a", 10, { counters: Object.fromEntries(Object.entries(o).map(([k, [v, kind]]) => [k, { value: v, kind: kind }])) }]]).results[0];
}
const judgeKind = (kind: string, today: number, build: number) => compareCounters(kinded({ c: [today, kind] }), kinded({ c: [build, kind] }));

describe("compareCounters of every kind", () => {
  test("render: as work, listed and never judged", () => {
    expect(judgeKind("render", 27, 26)).toEqual({ diffs: ["c 26 → 27 (render)"], verdict: undefined });
    expect(judgeKind("render", 18, 2)).toEqual({ diffs: ["c 2 → 18 (render)"], verdict: undefined });
    expect(judgeKind("render", 2, 18).verdict).toBeUndefined();
  });
  test("leak: a growth of 1 or more per sample", () => {
    expect(judgeKind("leak", 1, 0).verdict).toBe("up");
    expect(judgeKind("leak", 0.5, 0).verdict).toBeUndefined();
    expect(judgeKind("leak", 0, 341).verdict).toBe("down");
  });
  test("heap: over 25% and over 16 KB per sample", () => {
    expect(judgeKind("heap", 130, 100).verdict).toBe("up");
    expect(judgeKind("heap", 120, 100).verdict).toBeUndefined();
    expect(judgeKind("heap", 20, 10).verdict).toBeUndefined();
    expect(judgeKind("heap", 70, 100).verdict).toBe("down");
  });
  test("a kind the monitor does not know is neither listed nor judged; null values are skipped", () => {
    expect(judgeKind("other", 100, 1)).toEqual({ diffs: [], verdict: undefined });
    expect(compareCounters(kinded({ c: [null, "leak"] }), kinded({ c: [5, "leak"] }))).toEqual({ diffs: [], verdict: undefined });
  });
});

describe("counterVerdictOfRepeats", () => {
  const runs = (kind: string, name: string, values: number[]): ResultEntry[] => values.map((v: number) => kinded({ [name]: [v, kind] }));
  test("a verdict when every repeat agrees, with the kind that decided it", () => {
    const r = counterVerdictOfRepeats(runs("leak", "listenerGrowth", [341, 341, 341, 341, 341]), runs("leak", "listenerGrowth", [0, 0, 0, 0, 0]));
    expect(r).toEqual({ diffs: [], kindDiffs: [{ kind: "leak", text: "listenerGrowth 0 → 341" }], verdict: "up", kind: "leak" });
  });
  test("one repeat under the threshold or the other way: no verdict; the difference is of the medians", () => {
    const low = counterVerdictOfRepeats(runs("leak", "listenerGrowth", [341, 341, 341, 341, 0]), runs("leak", "listenerGrowth", [0, 0, 0, 0, 0]));
    expect(low.verdict).toBeUndefined();
    expect(low.kindDiffs).toEqual([{ kind: "leak", text: "listenerGrowth 0 → 341" }]);
    const mixed = counterVerdictOfRepeats(runs("heap", "jsHeapGrowth", [130, 130, 70, 130, 130]), runs("heap", "jsHeapGrowth", [100, 100, 100, 100, 100]));
    expect(mixed.verdict).toBeUndefined();
    expect(mixed.kindDiffs).toEqual([{ kind: "heap", text: "jsHeapGrowth 100 → 130" }]);
  });
  test("a step of one between repeats is noise: no verdict, and no difference when the medians are equal", () => {
    const r = counterVerdictOfRepeats(runs("render", "layoutCount", [27, 26, 27, 27, 26]), runs("render", "layoutCount", [26, 27, 27, 26, 27]));
    expect(r).toEqual({ diffs: [], kindDiffs: [], verdict: undefined, kind: undefined });
  });
  test("work and render in every repeat: listed, no verdict", () => {
    const r = counterVerdictOfRepeats(five({ conditionRuns: [40080, "work"], expressionRuns: [20555, "work"], layoutCount: [18, "render"] }),
      five({ conditionRuns: [40040, "work"], expressionRuns: [164, "work"], layoutCount: [2, "render"] }));
    expect(r).toEqual({ diffs: ["conditionRuns 40040 → 40080", "expressionRuns 164 → 20555"], kindDiffs: [{ kind: "render", text: "layoutCount 2 → 18" }],
      verdict: undefined, kind: undefined });
  });
  test("the counter that decided comes first in its list", () => {
    const leaks = counterVerdictOfRepeats(five({ nodeGrowth: [0.5, "leak"], listenerGrowth: [341, "leak"] }), five({ nodeGrowth: [0, "leak"], listenerGrowth: [0, "leak"] }));
    expect(leaks).toEqual({ diffs: [], kindDiffs: [{ kind: "leak", text: "listenerGrowth 0 → 341" }, { kind: "leak", text: "nodeGrowth 0 → 0.5" }], verdict: "up", kind: "leak" });
    const kinds = counterVerdictOfRepeats(five({ layoutCount: [27, "render"], listenerGrowth: [341, "leak"] }),
      five({ layoutCount: [26, "render"], listenerGrowth: [0, "leak"] }));
    expect(kinds.kindDiffs).toEqual([{ kind: "leak", text: "listenerGrowth 0 → 341" }, { kind: "render", text: "layoutCount 26 → 27" }]);
    expect(kinds.kind).toBe("leak");
  });
  test("one and the same counter must change in every repeat: different counters in different repeats are no verdict", () => {
    // a grew in repeats 1-3, b in repeats 4-5: each repeat is slower, but no counter is slower in all of them.
    const today = [[2, 0], [2, 0], [2, 0], [0, 2], [0, 2]].map(([a, b]) => kinded({ a: [a, "leak"], b: [b, "leak"] }));
    const r = counterVerdictOfRepeats(today, five({ a: [0, "leak"], b: [0, "leak"] }));
    expect(r.verdict).toBeUndefined();
    expect(r.kindDiffs).toEqual([{ kind: "leak", text: "a 0 → 2" }]);
  });
});

// Five repeats of the same counters.
const five = (o: Record<string, [number | null, string]>): ResultEntry[] => [1, 2, 3, 4, 5].map(() => kinded(o));

describe("counterChangesOfRepeats", () => {
  const runs = (kind: string, name: string, values: number[]): ResultEntry[] => values.map((v: number) => kinded({ [name]: [v, kind] }));
  test("every listed counter whose medians differ; a verdict only for leak and heap, changed the same way over the thresholds in every repeat", () => {
    const r = counterChangesOfRepeats(
      five({ expressionRuns: [20555, "work"], layoutCount: [18, "render"], listenerGrowth: [341, "leak"], jsHeapGrowth: [120, "heap"], same: [5, "work"] }),
      five({ expressionRuns: [164, "work"], layoutCount: [2, "render"], listenerGrowth: [0, "leak"], jsHeapGrowth: [100, "heap"], same: [5, "work"] }));
    expect(r).toEqual([
      { name: "expressionRuns", kind: "work", build: 164, today: 20555 },
      { name: "layoutCount", kind: "render", build: 2, today: 18 },
      { name: "listenerGrowth", kind: "leak", build: 0, today: 341, verdict: "up" },
      { name: "jsHeapGrowth", kind: "heap", build: 100, today: 120 }
    ]);
    expect(r.filter((x: CounterChange) => x.verdict).map((x: CounterChange) => x.name)).toEqual(["listenerGrowth"]);
    expect(counterChangesOfRepeats(runs("leak", "listenerGrowth", [0, 0, 0, 0, 0]), runs("leak", "listenerGrowth", [341, 341, 341, 341, 341])))
      .toEqual([{ name: "listenerGrowth", kind: "leak", build: 341, today: 0, verdict: "down" }]);
  });
  test("one repeat under the threshold: no verdict; a step of one with equal medians: not listed", () => {
    const low = counterChangesOfRepeats(runs("leak", "listenerGrowth", [341, 341, 341, 341, 0]), runs("leak", "listenerGrowth", [0, 0, 0, 0, 0]));
    expect(low).toEqual([{ name: "listenerGrowth", kind: "leak", build: 0, today: 341 }]);
    expect(low[0].verdict).toBeUndefined();
    expect(counterChangesOfRepeats(runs("render", "layoutCount", [27, 26, 27, 27, 26]), runs("render", "layoutCount", [26, 27, 27, 26, 27]))).toEqual([]);
  });
  test("dom and unknown kinds are skipped", () => {
    expect(counterChangesOfRepeats(five({ nodes: [900, "dom"], x: [5, "other"] }), five({ nodes: [100, "dom"], x: [1, "other"] }))).toEqual([]);
  });
});

describe("verdictOf", () => {
  test("a time row: a confirmed counter verdict counts too, and slower wins", () => {
    expect(verdictOf(row("a", { today: own(5), yesterday: vs(5, 5, { counterVerdict: "up", counterKind: "leak" }) }), "yesterday", "core")).toBe("up");
    expect(verdictOf(row("a", { today: own(5), yesterday: vs(5, 5, { counterVerdict: "down", counterKind: "leak" }) }), "yesterday", "core")).toBe("down");
    expect(verdictOf(row("a", { today: own(70), yesterday: vs(70, 100, { rerun: "confirmed", counterVerdict: "up" }) }), "yesterday", "core")).toBe("up");
    expect(verdictOf(row("a", { today: own(130), yesterday: vs(130, 100, { rerun: "unconfirmed", counterVerdict: "down" }) }), "yesterday", "core")).toBe("down");
  });
  test("a counterOnly row: its time is not judged, its leak or heap verdict is", () => {
    // 13.11: manyPages/pages/last 10.95 → 14.1 ms (+29%).
    const last = row("last", { today: own(14.1), yesterday: vs(14.1, 10.95) }, true);
    expect(verdictOf(last, "yesterday", "core")).toBeUndefined();
    const dispose = row("dispose", { today: own(10.3), yesterday: vs(10.3, 10.3, { counterVerdict: "up", counterKind: "leak" }) }, true);
    expect(verdictOf(dispose, "yesterday", "core")).toBe("up");
  });
  test("a time row: over 25% and over the suite's ms; an unconfirmed cell has none", () => {
    expect(verdictOf(row("a", { today: own(130), yesterday: vs(130, 100) }), "yesterday", "core")).toBe("up");
    expect(verdictOf(row("a", { today: own(3), yesterday: vs(3, 2) }), "yesterday", "core")).toBeUndefined();
    expect(verdictOf(row("a", { today: own(300), yesterday: vs(300, 410) }), "yesterday", "react")).toBe("down");
    expect(verdictOf(row("a", { today: own(130), yesterday: vs(130, 100, { rerun: "unconfirmed" }) }), "yesterday", "core")).toBeUndefined();
    expect(verdictOf(row("a", { today: own(130), yesterday: vs(130, 100, { rerun: "confirmed" }) }), "yesterday", "core")).toBe("up");
    expect(minDeltaOf("core")).toBe(2);
    expect(minDeltaOf("react")).toBe(8);
  });
});

describe("dates", () => {
  test("DD.MM.YYYY and UTC time", () => {
    expect(dateUtc("2026-11-12T23:59:00Z")).toBe("12.11.2026");
    expect(timeUtc(new Date("2026-11-12T09:37:00Z"))).toBe("12.11.2026 09:37 UTC");
  });
});

describe("suiteMarkdown", () => {
  const matrix = (): SuiteMatrix => mx([
    row("calculations/load/model", { today: own(638), yesterday: vs(638, 658), week: same, month: vs(638, 2200) }),
    row("zz/fast", { today: own(60), yesterday: vs(60, 60), week: same, month: vs(60, 200) }),
    row("zz/same", { today: own(0.49), yesterday: vs(0.49, 0.5), week: same, month: markCell("n/a", "not in the result") }),
    row("zz/slow", { today: own(130), yesterday: vs(130, 100), week: same, month: markCell("n/a", "not in the result") })
  ]);

  test("deltas only: no table of builds", () => {
    const md = suiteMarkdown(surveyLibrary, matrix(), date);
    expect(md.startsWith("# survey-library · core · 12.11.2026 09:37 UTC")).toBe(true);
    expect(md).not.toContain("| build |");
    expect(md).not.toContain("/commit/");
    expect(md).toContain("| scenario | today, ms | 1D | 7D | 30D |");
    expect(md).toContain("| calculations/load/model | 638 | −3% | = today | 🟢 **−71%** |");
    expect(md).toContain("| zz/slow | 130 | 🔴 **+30%** | = today | n/a¹ |");
    expect(md).toContain("| zz/same | 0.49 | −2% | = today | n/a¹ |");
    expect(md).not.toMatch(/\b(yesterday|week|month)\b/);
    expect(md).not.toContain("⚪");
    expect(md.trimEnd().split("\n").pop()).toBe("Δ = today / build − 1.");
    const o = suiteMarkdown(other, matrix(), date);
    expect(o.startsWith("# other · core · ")).toBe(true);
  });

  test("n/a footnotes are a list without counts", () => {
    const m = mx([
      row("a", { today: own(5), month: vs(5, 5) }),
      row("b", { today: own(5), month: markCell("n/a", "not in this build: matrixdynamic.pageSize") }),
      row("c", { today: own(5), month: markCell("n/a", "timeout 300 s") })
    ]);
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("n/a¹");
    expect(md).toContain("n/a²");
    expect(md).toContain("n/a:\n- ¹ not in this build: matrixdynamic.pageSize\n- ² timeout 300 s");
    expect(md).not.toContain("×");
    expect(md).not.toMatch(/\(\d+\)/);
  });

  test("legend, sections and the last line", () => {
    const m = mx([
      row("a", { today: own(5), yesterday: same, week: vs(5, 5, { counterDiffs: ["expressionRuns 5300 → 2401"] }) }),
      row("j", { today: own(5), yesterday: same, week: vs(5, 5, { flags: ["jsonErrors"] }) }),
      row("bad", { today: markCell("n/a", "Error: boom"), yesterday: same, week: markCell("not run", "not run (killed)") })
    ], { failedToday: [{ id: "bad", error: "Error: boom\nat x" }], incomplete: { week: 1 }, incompleteReason: { week: "killed" }, flagged: { week: 1 } });
    const md = suiteMarkdown(surveyLibrary, m, date, "test run");
    expect(md).toContain("🔴 slower · 🟢 faster (over 25% and over 2 ms)");
    expect(md).toContain("## Counters (information)\n- a (7D): expressionRuns 5300 → 2401 (work)");
    expect(md).not.toContain("ᶜ");
    expect(md).toContain("bad");
    expect(md).toContain("Error: boom");
    expect(md).toContain("0% ⚑");
    expect(md).toContain("## ⚑ jsonErrors differ\n- j (7D): jsonErrors differ from today");
    expect(md).toContain("= today");
    expect(md).toContain("- 7D — incomplete: 1 unrun (killed)");
    expect(md).toContain("> test run");
    expect(md.trimEnd().split("\n").pop()).toBe("Δ = today / build − 1.");
    const r = matrixOf("react", { roles: roles });
    expect(suiteMarkdown(surveyLibrary, r, date)).toContain("over 8 ms");
  });

  test("the ⚑ legend line appears only when a cell has the flag", () => {
    const line = "⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today";
    const flagged = mx([row("j", { today: own(5), yesterday: vs(5, 5, { flags: ["jsonErrors"] }) })], { flagged: { yesterday: 1 } });
    expect(suiteMarkdown(surveyLibrary, flagged, date).split("\n")).toContain(line);
    expect(suiteMarkdown(surveyLibrary, matrix(), date)).not.toContain("⚑ the build");
  });

  test("counterOnly rows: ᶜ, the time without a badge, the leak verdict and its own section", () => {
    const m = mx([
      row("last", { today: own(14.1), yesterday: vs(14.1, 10.95) }, true),
      row("dispose", { today: counted(10.3, { nodeGrowth: 12 }), yesterday: vs(10.3, 10.3, { kindDiffs: [{ kind: "leak", text: "nodeGrowth 0 → 12" }],
        counterVerdict: "up", counterKind: "leak", counterChanges: [ch("nodeGrowth", "leak", 0, 12, "up")] }) }, true),
      row("plain", { today: own(5), yesterday: vs(5, 5, { counterDiffs: ["expressionRuns 9 → 7"] }) })
    ]);
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("| last ᶜ | 14.1 | +29% |");
    expect(md).toContain("| dispose ᶜ | 10.3 | 0% |");
    expect(md).toContain("| plain | 5 | 0% |");
    expect(md).toContain("ᶜ counter-only: the time is for reference; judged by leak and heap counters");
    expect(md).toContain("## Counters\n\n| scenario | counter | today | 1D | 7D | 30D |\n|---|---|--:|--:|--:|--:|\n" +
      "| dispose ᶜ | nodeGrowth | 12 | 🔴 **0** | — | — |\n");
    expect(md).toContain("## Counters (information)\n- plain (1D): expressionRuns 9 → 7 (work)");
    expect(md).not.toContain("- dispose (");
  });

  test("counter verdicts of time rows: only the time in the cell, the counters in their own table and a legend line", () => {
    const m = mx([
      row("sort", { today: counted(5.15, { listenerGrowth: 341 }), yesterday: vs(5.15, 5, { counterVerdict: "up", counterKind: "leak",
        kindDiffs: [{ kind: "leak", text: "listenerGrowth 0 → 341" }], counterChanges: [ch("listenerGrowth", "leak", 0, 341, "up")] }) }),
      row("slow", { today: counted(130, { jsHeapGrowth: 180 }), yesterday: vs(130, 100, { counterVerdict: "up", counterKind: "heap",
        kindDiffs: [{ kind: "heap", text: "jsHeapGrowth 100 → 180" }], counterChanges: [ch("jsHeapGrowth", "heap", 100, 180, "up")] }) }),
      row("work", { today: counted(5, { expressionRuns: 20 }), yesterday: vs(5, 5, { counterDiffs: ["expressionRuns 9 → 20"],
        counterChanges: [ch("expressionRuns", "work", 9, 20)] }) }),
      row("noise", { today: counted(5, { layoutCount: 27 }), yesterday: vs(5, 5, { kindDiffs: [{ kind: "render", text: "layoutCount 26 → 27" }],
        counterChanges: [ch("layoutCount", "render", 26, 27)] }) })
    ]);
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("| sort | 5.15 | +3% |");
    expect(md).toContain("| slow | 130 | 🔴 **+30%** |");
    expect(md).toContain("| work | 5 | 0% |");
    expect(md).toContain("| noise | 5 | 0% |");
    expect(md).toContain("Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (" +
      "leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today");
    expect(md).toContain("## Counters\n\n| scenario | counter | today | 1D | 7D | 30D |\n|---|---|--:|--:|--:|--:|\n" +
      "| sort | listenerGrowth | 341 | 🔴 **0** | — | — |\n| slow | jsHeapGrowth | 180 | 🔴 **100** | — | — |\n\n");
    expect(md).toContain("## Counters (information)\n- work (1D): expressionRuns 9 → 20 (work)\n- noise (1D): layoutCount 26 → 27 (render)");
    expect(md).not.toContain("## Work counters");
    expect(md).not.toContain("## Counters (judged)");
    expect(md).not.toContain("🔴 **leak**");
  });

  test("the Counters table: a row per counter with a verdict in some build, =, —, a value without a verdict and ⚑", () => {
    const m = mx([
      row("a", {
        today: counted(5, { x: 20, y: 7 }),
        yesterday: vs(5, 5, { kindDiffs: [{ kind: "leak", text: "y 3 → 7" }, { kind: "leak", text: "x 10 → 20" }], counterValues: { x: 10, y: 3 },
          counterVerdict: "up", counterKind: "leak", counterChanges: [ch("y", "leak", 3, 7, "up"), ch("x", "leak", 10, 20, "up")] }),
        week: vs(5, 5, { kindDiffs: [{ kind: "leak", text: "x 19 → 20" }], counterValues: { x: 19, y: 7 }, flags: ["jsonErrors"], counterChanges: [ch("x", "leak", 19, 20)] }),
        month: markCell("n/a", "not in this build")
      }, true),
      row("b", {
        today: counted(5, { z: 5 }),
        yesterday: vs(5, 5, { counterValues: { z: 5 } }),
        week: vs(5, 5, { kindDiffs: [{ kind: "leak", text: "z 9 → 5" }], counterValues: { z: 9 }, counterVerdict: "down", counterKind: "leak",
          counterChanges: [ch("z", "leak", 9, 5, "down")] })
      }),
      row("c", { today: counted(5, { w: 2 }), yesterday: vs(5, 5, { counterDiffs: ["w 1 → 2"], counterValues: { w: 1 }, counterChanges: [ch("w", "work", 1, 2)] }) })
    ]);
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("## Counters\n\n| scenario | counter | today | 1D | 7D | 30D |\n|---|---|--:|--:|--:|--:|\n" +
      "| a ᶜ | x | 20 | 🔴 **10** | 19 ⚑ | — |\n" +
      "|  | y | 7 | 🔴 **3** | = | — |\n" +
      "| b | z | 5 | = | 🟢 **9** | — |\n\n");
    expect(md).toContain("## Counters (information)\n- c (1D): w 1 → 2 (work)\n");
    expect(md).not.toContain("- a (1D)");
    expect(md).not.toContain("- a (7D): x");
    expect(md.indexOf("## Counters\n")).toBeLessThan(md.indexOf("## Counters (information)"));
  });

  test("no counter verdict: no Counters table", () => {
    const m = mx([row("a", { today: counted(5, { rows: 101 }), yesterday: vs(5, 5, { counterDiffs: ["rows 100 → 101"], counterChanges: [ch("rows", "work", 100, 101)] }) })]);
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).not.toContain("## Counters\n");
    expect(md).not.toContain("Counters: ");
    expect(md).toContain("## Counters (information)\n- a (1D): rows 100 → 101 (work)");
  });

  test("no counter verdict: no counter legend line", () => {
    const m = mx([row("a", { today: own(5), yesterday: vs(5, 5, { counterDiffs: ["rows 100 → 101"] }) })]);
    expect(suiteMarkdown(surveyLibrary, m, date)).not.toContain("a counter changed in every repeat");
  });

  test("a build equal to an older one is named as in the picture", () => {
    const m = mx([row("a", { today: own(5), yesterday: vs(5, 5), week: markCell("same", "yesterday") })]);
    expect(suiteMarkdown(surveyLibrary, m, date)).toContain("| a | 5 | 0% | = 1D |");
  });

  test("a failed column names its log as the post attaches it, not by a runner path", () => {
    const m = mx([row("a", { today: own(5), week: markCell("build failed") })],
      { failed: [{ role: "week", kind: "build failed", reason: "survey-core does not build", log: "/out/logs/build-week-survey-core.log" }] });
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("## 7D: survey-core does not build\nlog: build-week-survey-core.log (attached to the post; artifact buildlog-week)");
    expect(md).not.toContain("/out/");
  });

  test("a role not run for a reason keeps the reason", () => {
    const m = matrixOf("react", { roles: roles, notRun: ["yesterday", "week"], notRunReason: { yesterday: "today build failed" } });
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("- 1D — not run: today build failed");
    expect(md).not.toContain("- 7D — not run");
  });

  test("the incomplete reason is listed for every role that has one", () => {
    const m = matrixOf("core", { roles: roles, incomplete: { today: 2, week: 1 }, incompleteReason: { today: "killed", week: "timeout" } });
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("- today — incomplete: 2 unrun (killed)");
    expect(md).toContain("- 7D — incomplete: 1 unrun (timeout)");
  });
});

describe("exported helpers", () => {
  test("timeVerdict is the report's rule", () => {
    expect(timeVerdict(100, 0.26, "core")).toBe("up");
    expect(timeVerdict(4, 0.3, "core")).toBeUndefined(); // 1.2 ms is under core's 2 ms
    expect(timeVerdict(100, -0.26, "react")).toBe("down");
    expect(timeVerdict(30, 0.26, "react")).toBeUndefined(); // 7.8 ms is under 8 ms
  });
});

describe("suiteMarkdown with repeats", () => {
  // One row "a": yesterday's median 100 ms, today 100 * (1 + delta), five repeats around the delta.
  const withRepeats = (rerun: "confirmed" | "unconfirmed" | undefined, delta = 0.31): SuiteMatrix => matrixOf("core", {
    roles: ["today", "yesterday"],
    rows: [{
      id: "a",
      cells: {
        today: { median: 100 * (1 + delta), flags: [], counterDiffs: [] },
        yesterday: {
          median: 100, delta: delta, flags: [], counterDiffs: [], rerun: rerun,
          repeats: [0.30, 0.31, 0.32, 0.29, 0.33].map((d: number) => ({ today: 100 * (1 + d), build: 100, delta: d }))
        }
      }
    }],
    up: rerun === "confirmed" ? { yesterday: 1 } : {}
  });

  const confirmedLine = "confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)";
  test("a confirmed cell: highlighted, a row of its build's repeats table", () => {
    const md = suiteMarkdown(surveyLibrary, withRepeats("confirmed"), date);
    expect(md).toContain("| a | 131 | 🔴 **+31%** |");
    expect(md).toContain("## Repeats 1D\n\n" +
      "| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |\n" +
      "|---|--:|--:|--:|--:|--:|--:|---|\n" +
      "| a | +31% | +30% | +31% | +32% | +29% | +33% | 🟢 |\n");
    expect(md).not.toContain("- a (");
    expect(md).toContain("🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat");
    expect(md.split("\n")).toContain(confirmedLine);
    expect(md).not.toContain("ʳ");
    expect(md).not.toContain("Measured twice");
    expect(md).not.toContain("ʳ measured twice");
  });
  test("an unconfirmed cell: not highlighted, a row that is not confirmed", () => {
    const md = suiteMarkdown(surveyLibrary, withRepeats("unconfirmed"), date);
    expect(md).toContain("| a | 131 | +31% |");
    expect(md).toContain("| a | +31% | +30% | +31% | +32% | +29% | +33% | 🔴 |");
  });
  test("a quiet cell with repeats is not listed, and no confirmed legend line", () => {
    const md = suiteMarkdown(surveyLibrary, withRepeats(undefined, 0.05), date);
    expect(md).not.toContain("## Repeats");
    expect(md).not.toContain("confirmed: ");
  });
  test("a repeats table per older build, in the order of the builds, only for builds with rows", () => {
    const reps = (d: number, n: number) => Array.from({ length: n }, () => ({ today: 100 * (1 + d), build: 100, delta: d }));
    const cell = (d: number, n: number): Cell => ({ median: 100, delta: d, flags: [], counterDiffs: [], rerun: "confirmed", repeats: reps(d, n) });
    const m = matrixOf("core", {
      roles: roles,
      rows: [
        { id: "a", cells: { today: own(140), yesterday: cell(0.4, 5), week: vs(140, 139, { repeats: reps(0.01, 5) }), month: cell(0.4, 3) } },
        { id: "b", cells: { today: own(60), yesterday: vs(60, 59), week: vs(60, 59), month: cell(-0.4, 3) } }
      ]
    });
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).not.toContain("## Repeats 7D");
    expect(md.indexOf("## Repeats 1D")).toBeGreaterThan(-1);
    expect(md.indexOf("## Repeats 1D")).toBeLessThan(md.indexOf("## Repeats 30D"));
    expect(md).toContain("## Repeats 1D\n\n| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |\n|---|--:|--:|--:|--:|--:|--:|---|\n| a | +40% | +40% | +40% | +40% | +40% | +40% | 🟢 |\n\n");
    expect(md).toContain("## Repeats 30D\n\n| scenario | Δ | 1 | 2 | 3 | confirmed |\n|---|--:|--:|--:|--:|---|\n" +
      "| a | +40% | +40% | +40% | +40% | 🟢 |\n| b | −40% | −40% | −40% | −40% | 🟢 |\n");
  });
});

// The rule of two or more repeats: l = ln(today / build) of each repeat and the 99% t-interval of their mean. A cell is
// highlighted when the change is 10% or more and the interval clears 2% and the suite's ms, in one direction. The
// expected values are worked out by hand (n = 5: t 0.995 with 4 degrees of freedom = 4.604).
describe("repeatsVerdict", () => {
  const reps = (today: number[], build = 100): Repeat[] => today.map((x: number) => ({ today: x, build: build, delta: x / build - 1 }));
  test("+12% with the repeats about 1% apart: confirmed, the interval +10.6%..+13.5%", () => {
    const j = repeatsVerdict(reps([112, 113, 111, 112, 112]), 100, "core");
    expect(j?.rerun).toBe("confirmed");
    expect(j?.interval[0]).toBeCloseTo(0.1055, 3);
    expect(j?.interval[1]).toBeCloseTo(0.1346, 3);
  });
  test("+6% with the repeats about 1% apart is under 10%: its interval (+4.6%..+7.5%), no verdict", () => {
    const j = repeatsVerdict(reps([106, 107, 105, 106, 106]), 100, "core");
    expect(j?.rerun).toBeUndefined();
    expect(j?.interval[0]).toBeCloseTo(0.0455, 3);
    expect(j?.interval[1]).toBeCloseTo(0.0746, 3);
  });
  test("+11% with one repeat the other way: unconfirmed, the interval reaches below 0", () => {
    const j = repeatsVerdict(reps([114, 115, 113, 98, 114]), 100, "core");
    expect(j?.rerun).toBe("unconfirmed");
    expect(j?.interval[0]).toBeCloseTo(-0.0383, 3);
  });
  test("+11% whose interval stays past 0 but not past 2% (+1.4%..+20.5%): unconfirmed", () => {
    // 1000 ms, so the low end (14 ms) clears the ms floor and only the 2% decides.
    const j = repeatsVerdict(reps([1050, 1160, 1110, 1070, 1140], 1000), 1000, "core");
    expect(j?.interval[0]).toBeCloseTo(0.0140, 3);
    expect(j?.rerun).toBe("unconfirmed");
  });
  test("+8% in every repeat is under 10%: neither confirmed nor unconfirmed", () => {
    const j = repeatsVerdict(reps([108, 108, 108, 108, 108]), 100, "core");
    expect(j?.rerun).toBeUndefined();
    expect(j?.interval[0]).toBeCloseTo(0.08, 3);
  });
  test("the ms floor holds for the interval's low end: +12% of 20 ms is 2.4 ms, its low end 1.76 ms", () => {
    expect(repeatsVerdict(reps([22.4, 22.6, 22.2, 22.8, 22.0], 20), 20, "core")?.rerun).toBe("unconfirmed");
  });
  test("faster in every repeat: confirmed, an interval below 0", () => {
    const j = repeatsVerdict(reps([90, 91, 89, 90, 90]), 100, "core");
    expect(j?.rerun).toBe("confirmed");
    expect(j?.interval[0]).toBeCloseTo(-0.1145, 3);
    expect(j?.interval[1]).toBeCloseTo(-0.0853, 3);
  });
  test("one repeat has no interval", () => {
    expect(repeatsVerdict(reps([130]), 100, "core")).toBeUndefined();
  });
  test("verdictOf: a confirmed interval decides the time, also under 25%", () => {
    const up = repeatsVerdict(reps([112, 113, 111, 112, 112]), 100, "core")!;
    expect(verdictOf(row("a", { today: own(112), yesterday: vs(112, 100, { rerun: up.rerun, interval: up.interval }) }), "yesterday", "core")).toBe("up");
    const down = repeatsVerdict(reps([90, 91, 89, 90, 90]), 100, "core")!;
    expect(verdictOf(row("a", { today: own(90), yesterday: vs(90, 100, { rerun: down.rerun, interval: down.interval }) }), "yesterday", "core")).toBe("down");
    const un = repeatsVerdict(reps([114, 115, 113, 98, 114]), 100, "core")!;
    expect(verdictOf(row("a", { today: own(111), yesterday: vs(111, 100, { rerun: un.rerun, interval: un.interval }) }), "yesterday", "core")).toBeUndefined();
    // A quiet cell with an interval: no time verdict, whatever its pooled delta says.
    const quiet = repeatsVerdict(reps([104, 104, 104, 104, 104]), 100, "core")!;
    expect(verdictOf(row("a", { today: own(130), yesterday: vs(130, 100, { interval: quiet.interval }) }), "yesterday", "core")).toBeUndefined();
  });
});

describe("suiteMarkdown with intervals", () => {
  const cell = (rerun: "confirmed" | "unconfirmed", interval: [number, number]): Cell => ({
    median: 100, delta: 0.12, flags: [], counterDiffs: [], rerun: rerun, interval: interval,
    repeats: [0.12, 0.13, 0.11, 0.12, 0.12].map((d: number) => ({ today: 100 * (1 + d), build: 100, delta: d }))
  });
  const m = (c: Cell): SuiteMatrix => matrixOf("core", { roles: ["today", "yesterday"], rows: [{ id: "a", cells: { today: own(112), yesterday: c } }],
    up: c.rerun === "confirmed" ? { yesterday: 1 } : {} });
  test("a confirmed cell: highlighted, its 99% interval in the repeats table, the interval rule in the legend", () => {
    const md = suiteMarkdown(surveyLibrary, m(cell("confirmed", [0.1055, 0.1346])), date);
    expect(md).toContain("| a | 112 | 🔴 **+12%** |");
    expect(md).toContain("## Repeats 1D\n\n" +
      "| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |\n" +
      "|---|--:|--:|--:|--:|--:|--:|--:|---|\n" +
      "| a | +12% | +11%..+13% | +12% | +13% | +11% | +12% | +12% | 🟢 |\n");
    expect(md).toContain("🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms");
    expect(md.split("\n")).toContain("confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)");
    expect(md).not.toContain("over 25%");
  });
  test("an unconfirmed cell: not highlighted, its interval listed, not confirmed", () => {
    const md = suiteMarkdown(surveyLibrary, m(cell("unconfirmed", [-0.0383, 0.2720])), date);
    expect(md).toContain("| a | 112 | +12% |");
    expect(md).toContain("| a | +12% | −4%..+27% | +12% | +13% | +11% | +12% | +12% | 🔴 |");
  });
});
