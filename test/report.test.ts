import { describe, test, expect } from "vitest";
import * as path from "node:path";
import { buildMatrix, isHighlighted, minDeltaOf, naReason, suiteMarkdown, timeVerdict, verdictOf } from "../src/report.ts";
import type { Outcome, SuiteMatrix } from "../src/report.ts";
import { loadProject } from "../src/project.ts";
import { dateUtc, timeUtc } from "../src/util/format.ts";
import type { ResultFile, ResultEntry } from "../src/contract.ts";
import type { BuildSpec, Role } from "../src/versions.ts";
import { result } from "./helpers/result.ts";
import { matrix as matrixOf } from "./helpers/matrix.ts";

const projects = path.join(import.meta.dirname, "..", "projects");
const surveyLibrary = loadProject(projects, "survey-library");
const other = loadProject(path.join(import.meta.dirname, "fixtures", "projects"), "other");

type Extra = { counters?: ResultEntry["counters"], jsonErrors?: number, counterOnly?: boolean };
function res(entries: Array<[string, number, Extra?]>, opts: Partial<ResultFile> & { noisy?: boolean } = {}): ResultFile {
  const { noisy, ...rest } = opts;
  return {
    schema: 2, suite: "core", kind: "nightly", label: "x", ref: null, commit: null, previousCommit: null,
    date: "2026-11-12T00:00:00Z", requested: { only: null, notInSuite: [] }, incomplete: null,
    build: { core: { dir: "d", version: null, commit: null, mtime: null }, deps: { fingerprint: null, versions: {} } },
    machine: {} as any, environment: noisy ? { noisy: true } : null, fixtures: {}, skipped: [], failed: [],
    results: entries.map(([id, median, extra]: [string, number, Extra?]): ResultEntry => ({
      id: id, rev: 1, unit: "ms", samples: [median], median: median, min: median, max: median, mad: 0,
      counters: extra?.counters || {}, info: {}, jsonErrors: extra?.jsonErrors || 0, tolerance: null, local: false,
      ...(extra?.counterOnly ? { counterOnly: true } : {})
    })),
    ...rest
  };
}
const ok = (r: ResultFile, sec = 10): Outcome => ({ kind: "result", result: r, sec: sec, log: "l" });
const roles: Role[] = ["today", "yesterday", "week", "month"];
const cell = (m: SuiteMatrix, id: string, role: Role) => m.rows.find((r) => r.id === id)!.cells[role]!;

describe("buildMatrix", () => {
  test("delta is today over the build minus one", () => {
    const m = buildMatrix("core", roles, { today: ok(res([["a", 120]])), yesterday: ok(res([["a", 100]])) });
    expect(cell(m, "a", "yesterday").delta).toBeCloseTo(0.2);
    expect(cell(m, "a", "yesterday").median).toBe(100);
    expect(isHighlighted(m.rows[0], "yesterday", "core")).toBe(false);
  });

  test("highlight needs 25% and minDelta", () => {
    let m = buildMatrix("core", roles, { today: ok(res([["a", 3]])), yesterday: ok(res([["a", 2]])) });
    expect(isHighlighted(m.rows[0], "yesterday", "core")).toBe(false);
    m = buildMatrix("core", roles, { today: ok(res([["a", 130]])), yesterday: ok(res([["a", 100]])) });
    expect(isHighlighted(m.rows[0], "yesterday", "core")).toBe(true);
    expect(m.up.yesterday).toBe(1);
    m = buildMatrix("react", roles, { today: ok(res([["a", 300]])), yesterday: ok(res([["a", 410]])) });
    expect(m.down.yesterday).toBe(1);
    expect(minDeltaOf("core")).toBe(2);
    expect(minDeltaOf("react")).toBe(8);
  });

  test("a scenario failed on an old build is n/a with its error", () => {
    const week = res([], { failed: [{ id: "a", error: "\u001b[31mTypeError: x\u001b[39m\nat…" }] });
    const m = buildMatrix("core", roles, { today: ok(res([["a", 5]])), week: ok(week) });
    expect(cell(m, "a", "week").mark).toBe("n/a");
    expect(cell(m, "a", "week").reason).toBe("TypeError: x");
  });

  test("a scenario missing from an old build's result is n/a", () => {
    const m = buildMatrix("core", roles, { today: ok(res([["a", 5]])), week: ok(res([])) });
    expect(cell(m, "a", "week").mark).toBe("n/a");
    expect(cell(m, "a", "week").reason).toBe("not in the result");
  });

  test("a scenario the runner skipped on an old build is n/a with its reason; counts per reason", () => {
    const reason = "not in this build: matrixdynamic.pageSize";
    const month = res([], {
      skipped: [1, 2, 3].map((i) => ({ id: "s" + i, reason: reason })),
      failed: [{ id: "k1", error: "killed after 300 s" }, { id: "k2", error: "Test timeout of 300000ms exceeded." }]
    });
    const ids = ["s1", "s2", "s3", "k1", "k2"];
    const m = buildMatrix("core", roles, { today: ok(res(ids.map((i): [string, number] => [i, 5]))), month: ok(month) });
    expect(cell(m, "s1", "month").mark).toBe("n/a");
    expect(cell(m, "s1", "month").reason).toBe(reason);
    expect(m.na.month).toEqual({ [reason]: 3, "timeout 300 s": 2 });
    expect(naReason("Test timeout of 300000ms exceeded.")).toBe("timeout 300 s");
  });

  test("scenarios that failed on today are counted, skipped ones are not", () => {
    const today = res([["a", 5]], {
      failed: [{ id: "b", error: "boom" }, { id: "c", error: "killed after 300 s" }],
      skipped: [{ id: "d", reason: "not in this build" }]
    });
    const m = buildMatrix("core", roles, { today: ok(today) });
    expect(m.failedToday.length).toBe(2);
    expect(cell(m, "b", "today").mark).toBe("n/a");
    expect(m.rows.map((r) => r.id)).toEqual(["a", "b", "c"]);
  });

  test("build failed, suite failed and same fill the whole column", () => {
    const m = buildMatrix("core", roles, {
      today: ok(res([["a", 5], ["b", 6]])), yesterday: { kind: "same", as: "today" },
      week: { kind: "build failed", reason: "npm", log: "build-week.log" }, month: { kind: "suite failed", reason: "exit 1" }
    });
    for (const r of m.rows) {
      expect(r.cells.yesterday!.mark).toBe("same");
      expect(r.cells.yesterday!.delta).toBeUndefined();
      expect(r.cells.week!.mark).toBe("build failed");
      expect(r.cells.month!.mark).toBe("suite failed");
    }
    expect(m.failed.map((f) => f.role)).toEqual(["week", "month"]);
    expect(m.failed[0].log).toBe("build-week.log");
    expect(m.failed.map((f) => f.kind)).toEqual(["build failed", "suite failed"]);
  });

  test("jsonErrors that differ from today flag the cell; work counters are only listed", () => {
    let m = buildMatrix("core", roles, { today: ok(res([["a", 5, { jsonErrors: 0 }]])), yesterday: ok(res([["a", 5, { jsonErrors: 2 }]])) });
    expect(cell(m, "a", "yesterday").flags).toEqual(["jsonErrors"]);
    expect(m.flagged.yesterday).toBe(1);
    const c = (n: number, kind: "work" | "dom" = "work") => ({ expressionRuns: { value: n, kind: kind } });
    m = buildMatrix("core", roles, { today: ok(res([["a", 5, { counters: c(2401) }]])), week: ok(res([["a", 5, { counters: c(5300) }]])) });
    expect(cell(m, "a", "week").flags).toEqual([]);
    expect(cell(m, "a", "week").counterDiffs).toEqual(["expressionRuns 5300 → 2401"]);
    m = buildMatrix("core", roles, { today: ok(res([["a", 5, { counters: c(1, "dom") }]])), week: ok(res([["a", 5, { counters: c(9, "dom") }]])) });
    expect(cell(m, "a", "week").counterDiffs).toEqual([]);
  });

  test("a counterOnly scenario: its time is not judged", () => {
    // 13.11: manyPages/pages/last 10.95 → 14.1 ms (+29%), records-10k/output/dispose 17.49 → 10.27 ms (−41%).
    const m = buildMatrix("core", roles, {
      today: ok(res([["last", 14.1, { counterOnly: true }], ["dispose", 10.27, { counterOnly: true }]])),
      yesterday: ok(res([["last", 10.95, { counterOnly: true }], ["dispose", 17.49, { counterOnly: true }]]))
    });
    expect(m.rows.map((r) => r.counterOnly)).toEqual([true, true]);
    expect(cell(m, "last", "yesterday").delta).toBeCloseTo(0.288, 2);
    expect(m.rows.map((r) => verdictOf(r, "yesterday", "core"))).toEqual([undefined, undefined]);
    expect(m.rows.map((r) => isHighlighted(r, "yesterday", "core"))).toEqual([false, false]);
    expect(m.up).toEqual({});
    expect(m.down).toEqual({});
  });

  test("a counterOnly scenario is judged by its work counters: over 2% and over 1", () => {
    const c = (o: Record<string, number>) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, { value: v, kind: "work" as const }]));
    const judge = (today: Record<string, number>, build: Record<string, number>, counterOnly = true) => {
      const m = buildMatrix("core", roles, {
        today: ok(res([["a", 10, { counters: c(today), counterOnly: counterOnly }]])),
        yesterday: ok(res([["a", 10, { counters: c(build), counterOnly: counterOnly }]]))
      });
      return { m: m, verdict: verdictOf(m.rows[0], "yesterday", "core") };
    };
    let j = judge({ expressionRuns: 12 }, { expressionRuns: 0 });
    expect(j.verdict).toBe("up");
    expect(j.m.up.yesterday).toBe(1);
    expect(cell(j.m, "a", "yesterday").counterDiffs).toEqual(["expressionRuns 0 → 12"]);
    j = judge({ expressionRuns: 0 }, { expressionRuns: 12 });
    expect(j.verdict).toBe("down");
    expect(j.m.down.yesterday).toBe(1);
    // +0.1% and a step of one are below the thresholds of v1's judge.
    expect(judge({ conditionRuns: 40085 }, { conditionRuns: 40040 }).verdict).toBeUndefined();
    expect(judge({ rowsCreated: 1 }, { rowsCreated: 0 }).verdict).toBeUndefined();
    expect(judge({ rowsCreated: 2 }, { rowsCreated: 0 }).verdict).toBe("up");
    // Any counter that grew makes it slower.
    expect(judge({ expressionRuns: 0, panelsCreated: 10 }, { expressionRuns: 50, panelsCreated: 0 }).verdict).toBe("up");
    // A dom counter is not judged; a scenario without the flag keeps its counters as information.
    const dom = buildMatrix("core", roles, {
      today: ok(res([["a", 10, { counters: { nodes: { value: 900, kind: "dom" } }, counterOnly: true }]])),
      yesterday: ok(res([["a", 10, { counters: { nodes: { value: 100, kind: "dom" } }, counterOnly: true }]]))
    });
    expect(verdictOf(dom.rows[0], "yesterday", "core")).toBeUndefined();
    j = judge({ expressionRuns: 12 }, { expressionRuns: 0 }, false);
    expect(j.verdict).toBeUndefined();
    expect(cell(j.m, "a", "yesterday").counterDiffs).toEqual(["expressionRuns 0 → 12"]);
  });

  test("noisy runs are listed", () => {
    const m = buildMatrix("core", roles, { today: ok(res([["a", 5]])), week: ok(res([["a", 5]], { noisy: true })) });
    expect(m.noisy).toEqual(["week"]);
  });

  test("zero medians give no delta", () => {
    let m = buildMatrix("core", roles, { today: ok(res([["a", 0.07]])), yesterday: ok(res([["a", 0]])) });
    expect(cell(m, "a", "yesterday").delta).toBeUndefined();
    expect(isHighlighted(m.rows[0], "yesterday", "core")).toBe(false);
    m = buildMatrix("core", roles, { today: ok(res([["a", 0]])), yesterday: ok(res([["a", 0.07]])) });
    expect(cell(m, "a", "yesterday").delta).toBe(-1);
    expect(isHighlighted(m.rows[0], "yesterday", "core")).toBe(false);
  });

  test("rows follow today's result, ids only an old build has are dropped", () => {
    const m = buildMatrix("core", roles, { today: ok(res([["b", 5], ["a", 5]])), month: ok(res([["a", 5], ["x", 5]])) });
    expect(m.rows.map((r) => r.id)).toEqual(["a", "b"]);
  });

  test("today failed: the matrix has no rows and a failure", () => {
    const m = buildMatrix("core", roles, { today: { kind: "suite failed", reason: "no result file" }, week: ok(res([["a", 5]])) });
    expect(m.rows.length).toBe(0);
    expect(m.failed[0].role).toBe("today");
  });

  test("an incomplete result marks its column and its unrun ids", () => {
    const week = res([["a", 5]], { incomplete: { reason: "killed", unrun: ["b"] } });
    const m = buildMatrix("core", roles, { today: ok(res([["a", 5], ["b", 5]])), week: ok(week) });
    expect(m.incomplete.week).toBe(1);
    expect(cell(m, "b", "week").mark).toBe("not run");
    expect(cell(m, "b", "week").reason).toBe("not run (killed)");
    expect(cell(m, "a", "week").delta).toBe(0);
    expect(m.na.week).toBeUndefined();
  });

  test("the incomplete reason is kept when the unrun ids are not rows", () => {
    const m = buildMatrix("core", roles, {
      today: ok(res([["a", 5]], { incomplete: { reason: "killed", unrun: ["x", "y"] } })),
      week: ok(res([["a", 5]], { incomplete: { reason: "timeout", unrun: ["zzz"] } }))
    });
    expect(m.incomplete).toEqual({ today: 2, week: 1 });
    expect(m.incompleteReason).toEqual({ today: "killed", week: "timeout" });
    const md = suiteMarkdown(surveyLibrary, specs, m, new Date("2026-11-12T09:37:00Z"));
    expect(md).toContain("today — incomplete: 2 unrun (killed)");
    expect(md).toContain("week — incomplete: 1 unrun (timeout)");
  });

  test("a role not run for a reason keeps the reason", () => {
    const m = buildMatrix("react", roles, { today: { kind: "build failed", reason: "survey-react-ui does not build" }, yesterday: { kind: "not run", reason: "today build failed" },
      week: { kind: "not run" } });
    expect(m.notRun).toEqual(["yesterday", "week"]);
    expect(m.notRunReason).toEqual({ yesterday: "today build failed" });
    const md = suiteMarkdown(surveyLibrary, specs, m, new Date("2026-11-12T09:37:00Z"));
    expect(md).toContain("- yesterday — not run: today build failed");
    expect(md).not.toContain("- week — not run");
  });

  test("a role that was not run fills the whole column", () => {
    const m = buildMatrix("core", roles, { today: ok(res([["a", 5]])), month: { kind: "not run" } });
    expect(cell(m, "a", "month").mark).toBe("not run");
    expect(cell(m, "a", "month").delta).toBeUndefined();
    expect(m.notRun).toEqual(["month"]);
    expect(m.failed).toEqual([]);
  });
});

describe("dates", () => {
  test("DD.MM.YYYY and UTC time", () => {
    expect(dateUtc("2026-11-12T23:59:00Z")).toBe("12.11.2026");
    expect(timeUtc(new Date("2026-11-12T09:37:00Z"))).toBe("12.11.2026 09:37 UTC");
  });
});

const sha = (c: string): string => c.repeat(40);
const specs: Array<BuildSpec & { node?: string }> = [
  { role: "today", sha: sha("a"), date: "2026-11-12T08:00:00Z", node: "v22.18.0" },
  { role: "yesterday", sha: sha("b"), date: "2026-11-11T08:00:00Z" },
  { role: "week", sha: sha("c"), date: "2026-11-05T08:00:00Z", sameAs: "today" },
  { role: "month", sha: sha("d"), date: "2026-10-13T08:00:00Z", node: "v22.18.0" }
];

describe("suiteMarkdown", () => {
  const date = new Date("2026-11-12T09:37:00Z");
  const matrix = (): SuiteMatrix => buildMatrix("core", roles, {
    today: ok(res([["calculations/load/model", 638], ["zz/slow", 130], ["zz/fast", 60], ["zz/same", 0.49]]), 120),
    yesterday: ok(res([["calculations/load/model", 658], ["zz/slow", 100], ["zz/fast", 60], ["zz/same", 0.5]]), 100),
    week: { kind: "same", as: "today" },
    month: ok(res([["calculations/load/model", 2200], ["zz/fast", 200]]), 90)
  });

  test("builds, then deltas only", () => {
    const md = suiteMarkdown(surveyLibrary, specs, matrix(), date);
    expect(md.startsWith("# survey-library · core · 12.11.2026 09:37 UTC")).toBe(true);
    expect(md).toContain("| build | commit | date | node | sec | n/a |");
    expect(md).toContain("https://github.com/surveyjs/survey-library/commit/" + sha("a"));
    expect(md).toContain("12.11.2026");
    expect(md).toContain("| scenario | today, ms | yesterday | week | month |");
    expect(md).toContain("| calculations/load/model | 638 | −3% | = today | 🟢 **−71%** |");
    expect(md).toContain("| zz/slow | 130 | 🔴 **+30%** | = today | n/a¹ |");
    expect(md).toContain("| zz/same | 0.49 | −2% | = today | n/a¹ |");
    expect(md).not.toContain("⚪");
    expect(md.trimEnd().split("\n").pop()).toBe("Δ = today / build − 1.");
    const o = suiteMarkdown(other, specs, matrix(), date);
    expect(o.startsWith("# other · core · ")).toBe(true);
    expect(o).toContain("https://github.com/example/other-lib/commit/" + sha("a"));
  });

  test("the builds table shows the Node of each build", () => {
    const md = suiteMarkdown(surveyLibrary, specs, matrix(), date);
    const row = (role: string) => md.split("\n").find((l) => l.startsWith("| " + role + " |"))!;
    expect(row("today")).toContain("| v22.18.0 |");
    expect(row("yesterday")).toContain("| — |");
    expect(row("week")).toContain("v22.18.0");
  });

  test("n/a footnotes are a list without counts", () => {
    const month = res([["a", 5]], {
      skipped: [{ id: "b", reason: "not in this build: matrixdynamic.pageSize" }],
      failed: [{ id: "c", error: "killed after 300 s" }]
    });
    const m = buildMatrix("core", roles, { today: ok(res([["a", 5], ["b", 5], ["c", 5]])), month: ok(month) });
    const md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("n/a¹");
    expect(md).toContain("n/a²");
    expect(md).toContain("n/a:\n- ¹ not in this build: matrixdynamic.pageSize\n- ² timeout 300 s");
    expect(md).not.toContain("×");
    expect(md).not.toMatch(/\(\d+\)/);
  });

  test("legend, sections and the last line", () => {
    const c = (n: number) => ({ expressionRuns: { value: n, kind: "work" as const } });
    const today = res([["a", 5, { counters: c(2401) }], ["j", 5]], { failed: [{ id: "bad", error: "Error: boom\nat x" }] });
    const week = res([["a", 5, { counters: c(5300) }], ["j", 5, { jsonErrors: 2 }]], { incomplete: { reason: "killed", unrun: ["bad"] } });
    const m = buildMatrix("core", roles, { today: ok(today), week: ok(week), yesterday: { kind: "same", as: "today" } });
    const md = suiteMarkdown(surveyLibrary, specs, m, date, "test run");
    expect(md).toContain("🔴 slower · 🟢 faster (over 25% and over 2 ms)");
    expect(md).toContain("## Work counters (information)\n- a (week): expressionRuns 5300 → 2401");
    expect(md).not.toContain("ᶜ");
    expect(md).toContain("bad");
    expect(md).toContain("Error: boom");
    expect(md).toContain("0% ⚑");
    expect(md).toContain("= today");
    expect(md).toContain("incomplete: 1 unrun (killed)");
    expect(md).toContain("> test run");
    expect(md.trimEnd().split("\n").pop()).toBe("Δ = today / build − 1.");
    const r = buildMatrix("react", roles, { today: ok(res([["a", 5]])) });
    expect(suiteMarkdown(surveyLibrary, specs, r, date)).toContain("over 8 ms");
  });

  test("counterOnly rows: ᶜ, the time without a badge, the work verdict and its own section", () => {
    const c = (n: number) => ({ expressionRuns: { value: n, kind: "work" as const } });
    const m = buildMatrix("core", roles, {
      today: ok(res([["last", 14.1, { counterOnly: true }], ["dispose", 10.3, { counterOnly: true, counters: c(12) }], ["plain", 5, { counters: c(7) }]])),
      yesterday: ok(res([["last", 10.95, { counterOnly: true }], ["dispose", 10.3, { counterOnly: true, counters: c(0) }], ["plain", 5, { counters: c(9) }]]))
    });
    const md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("| last ᶜ | 14.1 | +29% |");
    expect(md).toContain("| dispose ᶜ | 10.3 | 0% 🔴 **work** |");
    expect(md).toContain("| plain | 5 | 0% |");
    expect(md).toContain("ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)");
    expect(md).toContain("## Work counters of ᶜ scenarios (judged)\n- dispose (yesterday): expressionRuns 0 → 12");
    expect(md).toContain("## Work counters (information)\n- plain (yesterday): expressionRuns 9 → 7");
  });

  test("a failed column names its log as history/<run>/ has it, not the container's path", () => {
    const m = buildMatrix("core", roles, { today: ok(res([["a", 5]])), week: { kind: "build failed", reason: "survey-core does not build", log: "/out/logs/build-week-survey-core.log" } });
    const md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("## week: survey-core does not build\nlog: logs/build-week-survey-core.log");
    expect(md).not.toContain("/out/");
  });
});

describe("measured twice", () => {
  const date = new Date("2026-11-12T09:37:00Z");
  // a: today 13 against yesterday 10 (+30%), the plan's cell; b: the same change, outside the plan.
  const outcomes = (): Partial<Record<Role, Outcome>> => ({
    today: ok(result([["a", 13], ["b", 13]])),
    yesterday: ok(result([["a", 10], ["b", 10]]))
  });
  const plan = { yesterday: ["a"] };
  const row = (m: SuiteMatrix, id: string) => m.rows.find((r) => r.id === id)!;

  test("confirmed: the second run is over the threshold the same way, the highlight stays", () => {
    const m = buildMatrix("core", roles, outcomes(), { plan: plan, results: { today: result([["a", 13]]), yesterday: result([["a", 10]]) } });
    expect(cell(m, "a", "yesterday").rerun).toBe("confirmed");
    expect(verdictOf(row(m, "a"), "yesterday", "core")).toBe("up");
    expect(m.up.yesterday).toBe(2);
    const md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("| a | 13 | 🔴 **+30%** ʳ |");
    expect(md).toContain("| b | 13 | 🔴 **+30%** |");
    expect(md).toContain("ʳ measured twice: Δ from the medians of both runs, highlighted only when confirmed");
    expect(md).toContain("## Measured twice\n- a (yesterday): first +30% (13 / 10 ms), again +30% (13 / 10 ms), both +30% — confirmed");
  });

  test("not confirmed: the medians of both runs are under the threshold, no highlight", () => {
    const m = buildMatrix("core", roles, outcomes(), { plan: plan, results: { today: result([["a", 10]]), yesterday: result([["a", 10]]) } });
    const c = cell(m, "a", "yesterday");
    expect(c.rerun).toBe("unconfirmed");
    expect(c.delta).toBeCloseTo(0.15);
    expect(verdictOf(row(m, "a"), "yesterday", "core")).toBeUndefined();
    // b is outside the plan: untouched.
    expect(m.up.yesterday).toBe(1);
    expect(cell(m, "b", "yesterday").rerun).toBeUndefined();
    const md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("| a | 13 | +15% ʳ |");
    expect(md).toContain("- a (yesterday): first +30% (13 / 10 ms), again 0% (10 / 10 ms), both +15% — not confirmed");
  });

  test("over the threshold the other way is not a confirmation", () => {
    const m = buildMatrix("core", roles, outcomes(), { plan: plan, results: { today: result([["a", 1]]), yesterday: result([["a", 10, { samples: [10, 10, 10] }]]) } });
    expect(cell(m, "a", "yesterday").rerun).toBe("unconfirmed");
    expect(verdictOf(row(m, "a"), "yesterday", "core")).toBeUndefined();
  });

  test("not measured twice: no highlight, the first Δ, and what was and was not measured", () => {
    let m = buildMatrix("core", roles, outcomes(), { plan: plan, results: { today: result([["a", 13]]) }, failed: { yesterday: "suite failed (no result file (exit 1))" } });
    const c = cell(m, "a", "yesterday");
    expect(c.rerun).toBe("unchecked");
    expect(c.delta).toBeCloseTo(0.3);
    expect(verdictOf(row(m, "a"), "yesterday", "core")).toBeUndefined();
    let md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("| a | 13 | +30% ʳ? |");
    expect(md).toContain("ʳ? not measured twice (stopped or failed): not highlighted");
    expect(md).toContain("- a (yesterday): first +30% (13 / 10 ms), again: today 13 ms, yesterday suite failed (no result file (exit 1)) — not measured twice");
    expect(md).toContain("- rerun: yesterday suite failed (no result file (exit 1))");

    m = buildMatrix("core", roles, outcomes(), { plan: plan, results: { today: result([["a", 13]]), yesterday: result([], { failed: [{ id: "a", error: "killed after 300 s" }] }) } });
    md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("again: today 13 ms, yesterday failed (timeout 300 s) — not measured twice");

    // Stopped before the second run: the plan without results.
    m = buildMatrix("core", roles, outcomes(), { plan: plan, results: {} });
    expect(m.up.yesterday).toBe(1);
    md = suiteMarkdown(surveyLibrary, specs, m, date);
    expect(md).toContain("again: today not run, yesterday not run — not measured twice");
  });

  test("the medians of all samples of each build", () => {
    const m = buildMatrix("core", roles, {
      today: ok(result([["a", 13, { samples: [12, 13, 14] }]])),
      yesterday: ok(result([["a", 10, { samples: [9, 10, 11] }]]))
    }, { plan: plan, results: { today: result([["a", 13.5, { samples: [13, 13.5, 20] }]]), yesterday: result([["a", 9.5, { samples: [9, 9.5, 30] }]]) } });
    const c = cell(m, "a", "yesterday");
    // today 12, 13, 13, 13.5, 14, 20 → 13.25; yesterday 9, 9, 9.5, 10, 11, 30 → 9.75.
    expect(c.median).toBe(9.75);
    expect(c.delta).toBeCloseTo(13.25 / 9.75 - 1);
    expect(c.rerun).toBe("confirmed");
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
  const date = new Date("2026-11-12T09:37:00Z");
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

  test("a confirmed cell: highlighted, ʳ, listed with every repeat", () => {
    const md = suiteMarkdown(surveyLibrary, specs, withRepeats("confirmed"), date);
    expect(md).toContain("| a | 131 | 🔴 **+31%** ʳ |");
    expect(md).toContain("## Repeats");
    expect(md).toContain("- a (yesterday): +30% · +31% · +32% · +29% · +33% → +31% (131 / 100 ms) — every repeat agrees");
    expect(md).toContain("ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction");
    expect(md).not.toContain("Measured twice");
    expect(md).not.toContain("ʳ measured twice");
  });
  test("an unconfirmed cell: neither highlighted nor marked, listed as not agreeing", () => {
    const md = suiteMarkdown(surveyLibrary, specs, withRepeats("unconfirmed"), date);
    expect(md).toContain("| a | 131 | +31% |");
    expect(md).toContain("— not every repeat agrees");
  });
  test("a quiet cell with repeats is not listed", () => {
    const md = suiteMarkdown(surveyLibrary, specs, withRepeats(undefined, 0.05), date);
    expect(md).not.toContain("## Repeats");
  });
});
