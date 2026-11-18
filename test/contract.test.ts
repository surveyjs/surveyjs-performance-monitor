import { describe, test, expect } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { checkManifest, readResult, suitesOf, isBrowser } from "../src/contract.ts";
import type { ResultEntry } from "../src/contract.ts";

// survey-library's runner contract 2 (perf/CONTRACT.md there) as this monitor reads it: a real manifest and a real core
// result file, and the version checks.
const testdata = (name: string): string => path.join(import.meta.dirname, "testdata", name);
const manifestJson = (): any => JSON.parse(fs.readFileSync(testdata("manifest.json"), "utf8"));

describe("the runner contract 2", () => {
  test("a real contract-2 manifest is accepted", () => {
    const m = checkManifest(manifestJson(), "x");
    expect(suitesOf(m)).toEqual(["core", "react", "survey-js-ui", "vue3", "angular"]);
    expect(isBrowser(m.suites.core)).toBe(false);
    expect(isBrowser(m.suites.react)).toBe(true);
  });
  test("other contracts and schemas are refused", () => {
    expect(() => checkManifest(Object.assign(manifestJson(), { contract: 1 }), "x")).toThrow(/runner contract 1, monitor knows 2/);
    expect(() => checkManifest(Object.assign(manifestJson(), { contract: 3 }), "x")).toThrow(/runner contract 3/);
    expect(() => checkManifest(Object.assign(manifestJson(), { resultSchema: 1 }), "x")).toThrow(/result schema 1, monitor reads 2/);
    expect(() => checkManifest(Object.assign(manifestJson(), { suites: {} }), "x")).toThrow(/no suites/);
  });
  test("an extra suite is just another suite", () => {
    const j = manifestJson();
    j.suites.svelte = Object.assign({}, j.suites.react, { package: "survey-svelte-ui" });
    const m = checkManifest(j, "x");
    expect(suitesOf(m).slice(-1)).toEqual(["svelte"]);
  });
  test("a real schema-2 result reads; schema 1 is refused", () => {
    const r = readResult(testdata("result-core.json"));
    expect(r.results.length).toBe(3);
    r.results.forEach((e: ResultEntry) => expect(e).not.toHaveProperty("calibration"));
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-contract-"));
    const file = path.join(dir, "result.json");
    fs.writeFileSync(file, JSON.stringify(Object.assign({}, r, { schema: 1 })));
    expect(() => readResult(file)).toThrow(/result schema 1/);
    // A schema-2 file without the three lists would break the report of every suite: it is refused here, so the night
    // marks only that suite "suite failed: unreadable result file" (runner.ts).
    for (const key of ["results", "failed", "skipped"]) {
      for (const v of [undefined, null, "x", {}]) {
        const broken: Record<string, unknown> = JSON.parse(JSON.stringify(r));
        if (v === undefined) delete broken[key];
        else broken[key] = v;
        fs.writeFileSync(file, JSON.stringify(broken));
        expect(() => readResult(file)).toThrow(new RegExp(key + " is not a list"));
      }
    }
    fs.writeFileSync(file, "null");
    expect(() => readResult(file)).toThrow(/not an object/);
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
