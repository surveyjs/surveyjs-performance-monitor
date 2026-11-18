import { describe, test, expect, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pairMatrix, loadScenario } from "../../src/gh/pairs.ts";
import type { LoadedPair } from "../../src/gh/pairs.ts";
import type { PairFile, PairStep } from "../../src/gh/measure.ts";
import { verdictOf } from "../../src/report.ts";
import type { SuiteMatrix } from "../../src/report.ts";
import type { Role } from "../../src/versions.ts";
import { result } from "../helpers/result.ts";
import type { Extra } from "../helpers/result.ts";

const roles: Role[] = ["today", "yesterday", "week", "month"];
const cellOf = (m: SuiteMatrix, role: Role) => m.rows[0].cells[role]!;

// One run per median; samples default to [median].
function pair(role: Role, today: number[], build: number[], extra?: { today?: Extra, build?: Extra }): LoadedPair {
  return {
    role: role,
    today: today.map((x: number) => result([["a", x, extra?.today]])),
    build: build.map((x: number) => result([["a", x, extra?.build]]))
  };
}

const cleanup: string[] = [];
afterEach(() => {
  for (const d of cleanup.splice(0)) fs.rmSync(d, { recursive: true, force: true });
});

describe("pairMatrix", () => {
  test("pooled Δ: the median of all today samples over the median of all build samples", () => {
    const p = pair("yesterday", [100, 104, 102, 101, 103], [100, 100, 100, 100, 100]);
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [p] }], 5);
    expect(cellOf(m, "yesterday").delta).toBeCloseTo(0.02);
    expect(cellOf(m, "today").median).toBe(102);
    expect(cellOf(m, "yesterday").repeats![3]).toEqual({ today: 101, build: 100, delta: expect.closeTo(0.01) });
  });

  test("a highlight needs every repeat over the threshold in the same direction", () => {
    let m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [131, 129, 133, 130, 132], [100, 100, 100, 100, 100])] }], 5);
    expect(cellOf(m, "yesterday").rerun).toBe("confirmed");
    expect(m.up.yesterday).toBe(1);
    m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [131, 129, 133, 124, 132], [100, 100, 100, 100, 100])] }], 5);
    expect(cellOf(m, "yesterday").rerun).toBe("unconfirmed");
    expect(verdictOf(m.rows[0], "yesterday", "core")).toBeUndefined();
    expect(m.up.yesterday).toBeUndefined();
  });

  test("one repeat the opposite way: unconfirmed, no highlight", () => {
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [131, 129, 133, 70, 132], [100, 100, 100, 100, 100])] }], 5);
    expect(cellOf(m, "yesterday").rerun).toBe("unconfirmed");
    expect(verdictOf(m.rows[0], "yesterday", "core")).toBeUndefined();
    expect(m.up).toEqual({});
  });

  test("the ms floor holds on every repeat too", () => {
    // pooled +36% of 7 ms = 2.5 ms > 2; the last repeat +27% of 7 ms = 1.9 ms < 2
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [9.5, 9.5, 9.5, 9.5, 8.9], [7, 7, 7, 7, 7])] }], 5);
    expect(cellOf(m, "yesterday").rerun).toBe("unconfirmed");
  });

  test("a jsonErrors count that differs from today's flags the cell and is counted", () => {
    const p = pair("yesterday", [100, 100], [100, 100], { today: { jsonErrors: 0 }, build: { jsonErrors: 2 } });
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [p] }], 2);
    expect(cellOf(m, "yesterday").flags).toEqual(["jsonErrors"]);
    expect(m.flagged.yesterday).toBe(1);
    const same = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [100, 100], [100, 100])] }], 2);
    expect(cellOf(same, "yesterday").flags).toEqual([]);
    expect(same.flagged).toEqual({});
  });

  test("a row that is not counterOnly keeps its counter differences as information: no counter verdict", () => {
    const counters = (n: number): Extra => ({ counters: { rows: { value: n, kind: "work" } } });
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [100, 100], [100, 100], { today: counters(120), build: counters(100) })] }], 2);
    expect(cellOf(m, "yesterday").counterDiffs).toEqual(["rows 100 → 120"]);
    expect(cellOf(m, "yesterday").counterVerdict).toBeUndefined();
    expect(verdictOf(m.rows[0], "yesterday", "core")).toBeUndefined();
    expect(m.up).toEqual({});
  });

  test("every repeat faster: confirmed down, counted in m.down", () => {
    let m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [70, 69, 71, 68, 72], [100, 100, 100, 100, 100])] }], 5);
    expect(cellOf(m, "yesterday").rerun).toBe("confirmed");
    expect(verdictOf(m.rows[0], "yesterday", "core")).toBe("down");
    expect(m.down.yesterday).toBe(1);
    expect(m.up).toEqual({});
    // One repeat under the threshold: unconfirmed, no highlight.
    m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [70, 69, 71, 90, 72], [100, 100, 100, 100, 100])] }], 5);
    expect(cellOf(m, "yesterday").rerun).toBe("unconfirmed");
    expect(verdictOf(m.rows[0], "yesterday", "core")).toBeUndefined();
    expect(m.down).toEqual({});
  });

  test("counterOnly rows are judged by the first repeat's work counters", () => {
    const todayX: Extra = { counterOnly: true, counters: { rows: { value: 120, kind: "work" } } };
    const buildX: Extra = { counters: { rows: { value: 100, kind: "work" } } };
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [pair("yesterday", [100, 100, 100, 100, 100], [100, 100, 100, 100, 100], { today: todayX, build: buildX })] }], 5);
    expect(m.rows[0].counterOnly).toBe(true);
    expect(cellOf(m, "yesterday").counterVerdict).toBe("up");
    expect(cellOf(m, "yesterday").rerun).toBeUndefined();
    expect(m.up.yesterday).toBe(1);
  });

  test("a stopped pair: n/a with the runner's reason, or not run when incomplete, and never a highlight", () => {
    const week: LoadedPair = { ...pair("week", [140, 140], [100, 100]), stop: { side: "build", kind: "failed", reason: "\u001b[31mError: x\u001b[39m\nat y" } };
    const month: LoadedPair = { ...pair("month", [140], [100]), stop: { side: "build", kind: "incomplete", reason: "timeout" } };
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [week, month] }], 5);
    expect(cellOf(m, "week")).toMatchObject({ mark: "n/a", reason: "Error: x" });
    expect(m.na.week).toEqual({ "Error: x": 1 });
    expect(cellOf(m, "month")).toMatchObject({ mark: "not run", reason: "not run (timeout)" });
    expect(m.incomplete.month).toBe(1);
    expect(m.up).toEqual({});
  });

  test("a skipped reason stays whole, on the build side and on today's", () => {
    const reason = "needs a browser\nsecond line, killed after 300 s";
    const week: LoadedPair = { ...pair("week", [140], [100]), stop: { side: "build", kind: "skipped", reason: reason } };
    let m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [week] }], 5);
    expect(cellOf(m, "week")).toMatchObject({ mark: "n/a", reason: reason });
    expect(m.na.week).toEqual({ [reason]: 1 });
    m = pairMatrix("core", roles, {}, [{ id: "a", todayStop: { side: "today", kind: "skipped", reason: reason }, pairs: [] }], 5);
    expect(cellOf(m, "today")).toMatchObject({ mark: "n/a", reason: reason });
    expect(m.failedToday).toEqual([]);
  });

  test("no cell over the threshold lacks a rerun verdict, a partial pair gets no delta", () => {
    const partial: LoadedPair = { ...pair("week", [140, 140, 140, 140], [100, 100, 100, 100]) };
    const full = pair("yesterday", [140, 140, 140, 140, 140], [100, 100, 100, 100, 100]);
    const m = pairMatrix("core", roles, {}, [{ id: "a", pairs: [full, partial] }], 5);
    expect(cellOf(m, "yesterday").rerun).toBe("confirmed");
    expect(cellOf(m, "week").delta).toBeUndefined();
    expect(cellOf(m, "week").median).toBeUndefined();
    expect(verdictOf(m.rows[0], "week", "core")).toBeUndefined();
    expect(m.up).toEqual({ yesterday: 1 });
  });

  test("today failed: failedToday, today n/a, completed pairs stay, the rest —", () => {
    const sc = { id: "a", todayStop: { side: "today" as const, kind: "failed" as const, reason: "TypeError: y" }, pairs: [pair("yesterday", [100, 100, 100, 100, 100], [100, 100, 100, 100, 100])] };
    const m = pairMatrix("core", roles, {}, [sc], 5);
    expect(m.failedToday).toEqual([{ id: "a", error: "TypeError: y" }]);
    expect(cellOf(m, "today")).toMatchObject({ mark: "n/a", reason: "TypeError: y" });
    expect(cellOf(m, "yesterday").delta).toBe(0);
    expect(cellOf(m, "week")).toEqual({ flags: [], counterDiffs: [] });
  });

  test("a worker that left nothing: not run (worker failed) everywhere, counted as incomplete", () => {
    const m = pairMatrix("core", roles, { yesterday: { kind: "same", as: "today" } }, [{ id: "a", missing: "worker failed", pairs: [] }], 5);
    expect(cellOf(m, "today")).toMatchObject({ mark: "not run", reason: "not run (worker failed)" });
    expect(cellOf(m, "yesterday")).toMatchObject({ mark: "same", reason: "today" });
    expect(m.incomplete).toEqual({ today: 1, week: 1, month: 1 });
    expect(m.incompleteReason.week).toBe("worker failed");
  });

  test("role outcomes: build failed goes to m.failed; today's build failure leaves no rows", () => {
    let m = pairMatrix("core", roles, { week: { kind: "build failed", reason: "survey-core does not build", log: "/l" } }, [{ id: "a", pairs: [] }], 5);
    expect(cellOf(m, "week").mark).toBe("build failed");
    expect(m.failed).toEqual([{ role: "week", kind: "build failed", reason: "survey-core does not build", log: "/l" }]);
    m = pairMatrix("core", roles, { today: { kind: "build failed", reason: "r" } }, [{ id: "a", pairs: [] }], 5);
    expect(m.rows).toEqual([]);
  });

  test("two roles only (a young repo)", () => {
    const m = pairMatrix("core", ["today", "yesterday"], {}, [{ id: "a", pairs: [pair("yesterday", [1, 1, 1, 1, 1], [1, 1, 1, 1, 1])] }], 5);
    expect(Object.keys(m.rows[0].cells)).toEqual(["today", "yesterday"]);
  });
});

describe("loadScenario", () => {
  // A job folder with two complete pairs of +40%; pair.json carries `end` only when asked.
  function folder(withEnd: boolean): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-pairs-"));
    cleanup.push(dir);
    const pairs: PairFile["pairs"] = [];
    for (const role of ["yesterday", "week"] as Role[]) {
      fs.mkdirSync(path.join(dir, role));
      const steps: PairStep[] = [];
      for (let n = 1; n <= 5; n++) {
        for (const side of (n % 2 ? ["today", "build"] : ["build", "today"]) as Array<"today" | "build">) {
          const file = path.join(role, (side === "today" ? "today" : role) + "-" + n + ".json");
          const median = side === "today" ? 140 : 100;
          fs.writeFileSync(path.join(dir, file), JSON.stringify(result([["a", median]])));
          steps.push({ repeat: n, side: side, file: file, start: "s", end: "e", sec: 1, outcome: "result", median: median });
        }
      }
      pairs.push({ role: role, sha: "x", steps: steps });
    }
    const pf: PairFile = { suite: "core", id: "a", key: "a", repeats: 5, machine: { model: "m", cores: 4 }, start: "s", pairs: pairs };
    if (withEnd) pf.end = "e";
    fs.writeFileSync(path.join(dir, "pair.json"), JSON.stringify(pf));
    return dir;
  }

  test("a pair.json without end is a worker that did not finish", () => {
    const dir = folder(false);
    expect(loadScenario(dir, "a")).toEqual({ id: "a", missing: "worker failed", pairs: [] });
    expect(loadScenario(dir, "a", "cancelled").missing).toBe("cancelled");
    const done = folder(true);
    expect(loadScenario(done, "a").pairs.map((p: LoadedPair) => [p.role, p.today.length, p.build.length])).toEqual([["yesterday", 5, 5], ["week", 5, 5]]);
    expect(loadScenario(path.join(dir, "nope"), "a").missing).toBe("worker failed");
  });

  test("a malformed pair.json is a worker that left nothing usable", () => {
    const done = folder(true);
    fs.writeFileSync(path.join(done, "pair.json"), "{");
    expect(loadScenario(done, "a")).toEqual({ id: "a", missing: "worker failed", pairs: [] });
    fs.rmSync(path.join(done, "pair.json"));
    fs.mkdirSync(path.join(done, "pair.json"));
    expect(loadScenario(done, "a").missing).toBe("worker failed");
  });

  test("an unreadable step file is a worker that left nothing usable", () => {
    const done = folder(true);
    fs.writeFileSync(path.join(done, "week", "week-2.json"), "{");
    expect(loadScenario(done, "a")).toEqual({ id: "a", missing: "worker failed", pairs: [] });
  });
});
