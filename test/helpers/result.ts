import type { ResultFile, ResultEntry } from "../../src/contract.ts";
import type { Outcome } from "../../src/report.ts";

export type Extra = { counters?: ResultEntry["counters"], jsonErrors?: number, counterOnly?: boolean, samples?: Array<number> };

// A schema-2 result with one entry per [id, median, extra]; samples default to [median].
export function result(entries: Array<[string, number, Extra?]>, opts: Partial<ResultFile> = {}): ResultFile {
  return {
    schema: 2, suite: "core", kind: "nightly", label: "x", ref: null, commit: null, previousCommit: null,
    date: "2026-11-12T00:00:00Z", requested: { only: null, notInSuite: [] }, incomplete: null,
    build: { core: { dir: "d", version: null, commit: null, mtime: null }, deps: { fingerprint: null, versions: {} } },
    machine: {} as any, environment: null, fixtures: {}, skipped: [], failed: [],
    results: entries.map(([id, median, extra]: [string, number, Extra?]): ResultEntry => ({
      id: id, rev: 1, unit: "ms", samples: extra?.samples || [median], median: median, min: median, max: median, mad: 0,
      counters: extra?.counters || {}, info: {}, jsonErrors: extra?.jsonErrors || 0, tolerance: null, local: false,
      ...(extra?.counterOnly ? { counterOnly: true } : {})
    })),
    ...opts
  };
}

export const ok = (r: ResultFile, sec = 10): Outcome => ({ kind: "result", result: r, sec: sec, log: "l" });
