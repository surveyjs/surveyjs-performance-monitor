import type { SuiteMatrix, Row, Cell } from "../../src/report.ts";
import type { Role } from "../../src/versions.ts";

export function matrix(suite: string, over: Partial<SuiteMatrix> = {}): SuiteMatrix {
  return {
    suite: suite, roles: ["today", "yesterday", "week", "month"], rows: [], up: {}, down: {}, noisy: [], failed: [], failedToday: [],
    incomplete: {}, incompleteReason: {}, notRun: [], notRunReason: {}, na: {}, flagged: {}, sec: {}, ...over
  };
}

// A row whose cell for `role` is highlighted: today 240 ms, delta +31%.
export function hotRow(id: string, role: Role = "yesterday", delta = 0.31): Row {
  const cell: Cell = { median: 100, delta: delta, flags: [], counterDiffs: [] };
  return { id: id, cells: { today: { median: 240, flags: [], counterDiffs: [] }, [role]: cell } };
}
