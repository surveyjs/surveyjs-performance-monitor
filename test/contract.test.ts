import { describe, test, expect } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { checkManifest, readResult, suitesOf, isBrowser, parseCommand } from "../src/contract.ts";
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

describe("the creator contract 1", () => {
  const creatorJson = (): any => JSON.parse(fs.readFileSync(testdata("creator-manifest.json"), "utf8"));
  test("a real creator manifest is accepted", () => {
    const m = checkManifest(creatorJson(), "x", "creator");
    expect(suitesOf(m)).toEqual(["core", "react"]);
    expect(isBrowser(m.suites.core)).toBe(false);
    expect(isBrowser(m.suites.react)).toBe(true);
    expect(m.library!.builds.map((b) => b.package)).toEqual(["survey-core", "survey-react-ui"]);
    expect(m.builds!.map((b) => b.env)).toEqual(["PERF_CREATOR_CORE_DIR", "PERF_UI_DIR"]);
  });
  test("product and contract must match the project", () => {
    expect(() => checkManifest(creatorJson(), "x")).toThrow("x: product creator, the project expects survey-library");
    expect(() => checkManifest(manifestJson(), "x", "creator")).toThrow("x: product survey-library, the project expects creator");
    expect(() => checkManifest({ ...creatorJson(), contract: 2 }, "x", "creator")).toThrow("x: runner contract 2, monitor knows 1");
  });
  test("a malformed creator manifest is refused", () => {
    const bad = (mutate: (j: any) => void, msg: string | RegExp): void => { const j = creatorJson(); mutate(j); expect(() => checkManifest(j, "x", "creator")).toThrow(msg); };
    bad((j) => { j.builds[0].commands = ["npm ci"]; }, "x: unsupported command: npm ci");
    bad((j) => { j.install = ["npm run -x"]; }, "x: unsupported command: npm run -x");
    bad((j) => { j.builds[0].env = "PERF_X"; }, "x: builds[0] is malformed");
    bad((j) => { j.builds[1].cwd = "../x"; }, "x: builds[1] is malformed");
    bad((j) => { j.builds[1].suites = ["vue3"]; }, "x: builds[1] is malformed");
    bad((j) => { j.library.layout = "nested"; }, "x: library is malformed");
    bad((j) => { j.library.repo = "../lib"; }, "x: library is malformed");
    bad((j) => { j.library.repo = ".."; }, "x: library is malformed");
    bad((j) => { j.library.builds[0].dir = "/abs"; }, "x: library.builds[0] is malformed");
    bad((j) => { delete j.install; }, "x: install is malformed");
    bad((j) => { j.library.builds[0].package = "@scope/x"; }, "x: library.builds[0] is malformed");
    bad((j) => { j.library.builds[0].package = "../x"; }, "x: library.builds[0] is malformed");
    bad((j) => { j.builds[0].cwd = "."; }, "x: builds[0] is malformed");
    bad((j) => { j.builds[1].cwd = "packages/survey-core"; }, "x: builds are malformed");
    bad((j) => { j.builds[1].env = "PERF_CREATOR_CORE_DIR"; }, "x: builds are malformed");
    bad((j) => { j.library.builds[1].env = "PERF_UI_DIR"; }, "x: builds are malformed");
    bad((j) => { j.library.builds[0].env = "PERF_LIB_UI_DIR"; }, "x: builds are malformed");
  });
  test("parseCommand", () => {
    expect(parseCommand("npm install")).toEqual({ op: "install" });
    expect(parseCommand("npm run build:main")).toEqual({ op: "run", script: "build:main" });
    for (const c of ["npm ci", "npm run", "npm run a b", "npm run -x", "yarn build", " npm install"]) expect(() => parseCommand(c)).toThrow("unsupported command: " + c);
  });
});
