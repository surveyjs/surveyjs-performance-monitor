import { describe, test, expect } from "vitest";
import * as path from "node:path";
import { compareCounters, counterVerdictOfRepeats, markCell, minDeltaOf, naReason, suiteMarkdown, timeVerdict, verdictOf } from "../src/report.ts";
import type { Cell, Row, SuiteMatrix } from "../src/report.ts";
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
  test("a counter that grew over 2% and over 1 is slower, one that fell is faster", () => {
    expect(judge({ expressionRuns: 12 }, { expressionRuns: 0 })).toEqual({ diffs: ["expressionRuns 0 → 12"], verdict: "up" });
    expect(judge({ expressionRuns: 0 }, { expressionRuns: 12 })).toEqual({ diffs: ["expressionRuns 12 → 0"], verdict: "down" });
  });
  test("the edges: +0.1% and a step of one are below the thresholds, a step of two over", () => {
    expect(judge({ conditionRuns: 40085 }, { conditionRuns: 40040 }).verdict).toBeUndefined();
    expect(judge({ conditionRuns: 40040 }, { conditionRuns: 40085 }).verdict).toBeUndefined();
    expect(judge({ rowsCreated: 1 }, { rowsCreated: 0 }).verdict).toBeUndefined();
    expect(judge({ rowsCreated: 0 }, { rowsCreated: 1 }).verdict).toBeUndefined();
    expect(judge({ rowsCreated: 2 }, { rowsCreated: 0 }).verdict).toBe("up");
    expect(judge({ rowsCreated: 0 }, { rowsCreated: 2 }).verdict).toBe("down");
    // Over 1 but not over 2%: 100 → 102 is exactly 2%.
    expect(judge({ a: 102 }, { a: 100 }).verdict).toBeUndefined();
    expect(judge({ a: 103 }, { a: 100 }).verdict).toBe("up");
    expect(judge({ a: 99 }, { a: 100 }).verdict).toBeUndefined();
    expect(judge({ a: 98 }, { a: 100 }).verdict).toBe("down");
    // The difference is listed whether or not it is judged.
    expect(judge({ rowsCreated: 1 }, { rowsCreated: 0 }).diffs).toEqual(["rowsCreated 0 → 1"]);
    expect(judge({ same: 5 }, { same: 5 })).toEqual({ diffs: [], verdict: undefined });
  });
  test("when one counter grew and another fell, slower wins", () => {
    expect(judge({ expressionRuns: 0, panelsCreated: 10 }, { expressionRuns: 50, panelsCreated: 0 }).verdict).toBe("up");
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
  test("render: as work, over 2% and over 1, so a step of one is not judged", () => {
    expect(judgeKind("render", 27, 26)).toEqual({ diffs: ["c 26 → 27 (render)"], verdict: undefined });
    expect(judgeKind("render", 18, 2).verdict).toBe("up");
    expect(judgeKind("render", 2, 18).verdict).toBe("down");
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
    const low = counterVerdictOfRepeats(runs("render", "layoutCount", [18, 18, 18, 18, 3]), runs("render", "layoutCount", [2, 2, 2, 2, 2]));
    expect(low.verdict).toBeUndefined();
    expect(low.kindDiffs).toEqual([{ kind: "render", text: "layoutCount 2 → 18" }]);
    const mixed = counterVerdictOfRepeats(runs("work", "rows", [120, 120, 80, 120, 120]), runs("work", "rows", [100, 100, 100, 100, 100]));
    expect(mixed.verdict).toBeUndefined();
    expect(mixed.diffs).toEqual(["rows 100 → 120"]);
  });
  test("a step of one between repeats is noise: no verdict, and no difference when the medians are equal", () => {
    const r = counterVerdictOfRepeats(runs("render", "layoutCount", [27, 26, 27, 27, 26]), runs("render", "layoutCount", [26, 27, 27, 26, 27]));
    expect(r).toEqual({ diffs: [], kindDiffs: [], verdict: undefined, kind: undefined });
  });
});

describe("verdictOf", () => {
  test("a time row: a confirmed counter verdict counts too, and slower wins", () => {
    expect(verdictOf(row("a", { today: own(5), yesterday: vs(5, 5, { counterVerdict: "up", counterKind: "leak" }) }), "yesterday", "core")).toBe("up");
    expect(verdictOf(row("a", { today: own(5), yesterday: vs(5, 5, { counterVerdict: "down", counterKind: "leak" }) }), "yesterday", "core")).toBe("down");
    expect(verdictOf(row("a", { today: own(70), yesterday: vs(70, 100, { rerun: "confirmed", counterVerdict: "up" }) }), "yesterday", "core")).toBe("up");
    expect(verdictOf(row("a", { today: own(130), yesterday: vs(130, 100, { rerun: "unconfirmed", counterVerdict: "down" }) }), "yesterday", "core")).toBe("down");
  });
  test("a counterOnly row: its time is not judged, its work verdict is", () => {
    // 13.11: manyPages/pages/last 10.95 → 14.1 ms (+29%).
    const last = row("last", { today: own(14.1), yesterday: vs(14.1, 10.95) }, true);
    expect(verdictOf(last, "yesterday", "core")).toBeUndefined();
    const dispose = row("dispose", { today: own(10.3), yesterday: vs(10.3, 10.3, { counterVerdict: "up" }) }, true);
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
    expect(md).toContain("## Work counters (information)\n- a (7D): expressionRuns 5300 → 2401");
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

  test("counterOnly rows: ᶜ, the time without a badge, the work verdict and its own section", () => {
    const m = mx([
      row("last", { today: own(14.1), yesterday: vs(14.1, 10.95) }, true),
      row("dispose", { today: own(10.3), yesterday: vs(10.3, 10.3, { counterDiffs: ["expressionRuns 0 → 12"], counterVerdict: "up" }) }, true),
      row("plain", { today: own(5), yesterday: vs(5, 5, { counterDiffs: ["expressionRuns 9 → 7"] }) })
    ]);
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("| last ᶜ | 14.1 | +29% |");
    expect(md).toContain("| dispose ᶜ | 10.3 | 0% 🔴 **work** |");
    expect(md).toContain("| plain | 5 | 0% |");
    expect(md).toContain("ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)");
    expect(md).toContain("## Work counters of ᶜ scenarios (judged)\n- dispose (1D): expressionRuns 0 → 12");
    expect(md).toContain("## Work counters (information)\n- plain (1D): expressionRuns 9 → 7");
  });

  test("counter verdicts of time rows: the kind in the cell, a legend line and their own sections", () => {
    const leakCell = vs(5.15, 5, { counterVerdict: "up", counterKind: "leak", kindDiffs: [{ kind: "leak", text: "listenerGrowth 0 → 341" }] });
    const m = mx([
      row("sort", { today: own(5.15), yesterday: leakCell }),
      row("slow", { today: own(130), yesterday: vs(130, 100, { counterVerdict: "up", counterKind: "render", kindDiffs: [{ kind: "render", text: "layoutCount 2 → 18" }] }) }),
      row("work", { today: own(5), yesterday: vs(5, 5, { counterVerdict: "up", counterKind: "work", counterDiffs: ["expressionRuns 9 → 20"] }) }),
      row("noise", { today: own(5), yesterday: vs(5, 5, { kindDiffs: [{ kind: "render", text: "layoutCount 26 → 27" }] }) })
    ]);
    const md = suiteMarkdown(surveyLibrary, m, date);
    expect(md).toContain("| sort | 5.15 | +3% 🔴 **leak** |");
    expect(md).toContain("| slow | 130 | 🔴 **+30%** 🔴 **render** |");
    expect(md).toContain("| work | 5 | 0% 🔴 **work** |");
    expect(md).toContain("| noise | 5 | 0% |");
    expect(md).toContain("🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; " +
      "leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)");
    expect(md).toContain("## Counters (judged)\n- sort (1D): listenerGrowth 0 → 341 (leak)\n- slow (1D): layoutCount 2 → 18 (render)\n" +
      "- work (1D): expressionRuns 9 → 20 (work)");
    expect(md).toContain("## Counters (information)\n- noise (1D): layoutCount 26 → 27 (render)");
    expect(md).not.toContain("## Work counters");
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

  test("a confirmed cell: highlighted, ʳ, a row of the repeats table", () => {
    const md = suiteMarkdown(surveyLibrary, withRepeats("confirmed"), date);
    expect(md).toContain("| a | 131 | 🔴 **+31%** ʳ |");
    expect(md).toContain("## Repeats\n\n" +
      "| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |\n" +
      "|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|\n" +
      "| a | 1D | 131 | 100 | +31% | +30% | +31% | +32% | +29% | +33% | yes |\n");
    expect(md).not.toContain("- a (");
    expect(md).toContain("ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction");
    expect(md).not.toContain("Measured twice");
    expect(md).not.toContain("ʳ measured twice");
  });
  test("an unconfirmed cell: neither highlighted nor marked, a row that does not agree", () => {
    const md = suiteMarkdown(surveyLibrary, withRepeats("unconfirmed"), date);
    expect(md).toContain("| a | 131 | +31% |");
    expect(md).toContain("| a | 1D | 131 | 100 | +31% | +30% | +31% | +32% | +29% | +33% | no |");
  });
  test("a quiet cell with repeats is not listed", () => {
    const md = suiteMarkdown(surveyLibrary, withRepeats(undefined, 0.05), date);
    expect(md).not.toContain("## Repeats");
  });
});
