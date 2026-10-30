import { describe, test, expect } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { checkManifest, loadManifest, splitOnly, suitesOf, packageOf, uiSourceDirs } from "../src/library/manifest.ts";
import type { Suite, ResultEntry } from "../src/library/contract.ts";
import { readResult, fixtureOfId, SUITES } from "../src/library/contract.ts";
import type { ScenarioVerdict } from "../src/judge/compare.ts";
import { judge } from "../src/judge/compare.ts";

// survey-library's runner contract (perf/CONTRACT.md there) as this server reads it: a real manifest and a real core
// result file (its local paths and machine replaced), and the version checks.
const testdata = (name: string): string => path.join(__dirname, "testdata", name);
const manifestJson = (): any => JSON.parse(fs.readFileSync(testdata("manifest.json"), "utf8"));

describe("the runner contract", () => {
  test("the manifest: every suite, its ids and packages; unknown versions are refused", () => {
    const m = checkManifest(manifestJson(), "testdata");
    SUITES.forEach((s: Suite) => expect(m.suites[s].ids.length).toBeGreaterThan(0));
    expect(m.suites.core.script).toBe("perf/core/run.ts");
    expect(packageOf(m, "react")).toBe("survey-react-ui");
    expect(() => packageOf(m, "core")).toThrow(/no package/);
    expect(uiSourceDirs(m, "survey-js-ui")).toEqual(["packages/survey-js-ui/", "packages/survey-react-ui/"]);
    expect(suitesOf(m, "records-10k/records/next@orders")).toEqual(["core", "react", "survey-js-ui"]);
    expect(splitOnly(m, ["large/load/paint", "large/load/model"], "core")).toEqual({ run: ["large/load/model"], notInSuite: ["large/load/paint"] });
    expect(() => splitOnly(m, ["large/load/nothing"], "core")).toThrow(/in no suite/);
    expect(() => checkManifest(Object.assign(manifestJson(), { contract: 2 }), "x")).toThrow(/runner contract 2/);
    expect(() => checkManifest(Object.assign(manifestJson(), { resultSchema: 2 }), "x")).toThrow(/schema 2/);
    const noUi = manifestJson();
    delete noUi.suites["survey-js-ui"];
    expect(() => checkManifest(noUi, "x")).toThrow(/no suite survey-js-ui/);
  });
  test("a real core result file reads and is judged; another schema is refused", () => {
    const r = readResult(testdata("result-core.json"));
    expect(r.results.map((e: ResultEntry) => e.id)).toEqual(["large/load/model", "manyPages/pages/prev"]);
    const c = judge({ result: r });
    expect(c.newMachineKey).toBe(true);
    expect(c.verdicts.map((v: ScenarioVerdict) => v.verdict)).toEqual(["no reference", "no reference"]);
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-contract-"));
    const file = path.join(dir, "result.json");
    fs.writeFileSync(file, JSON.stringify(Object.assign({}, r, { schema: 2 })));
    expect(() => readResult(file)).toThrow(/schema 2/);
    fs.rmSync(dir, { recursive: true, force: true });
  });
  test("the fixture of an id is everything before the group", () => {
    expect(fixtureOfId("records-10k/records/next@orders")).toBe("records-10k");
    expect(fixtureOfId("extra/my-survey/load/model")).toBe("extra/my-survey");
    expect(() => fixtureOfId("large")).toThrow(/Not a scenario id/);
  });
  // SURVEY_LIBRARY_DIR=<a survey-library checkout>: its perf/manifest.ts, run the way a night runs it.
  test.skipIf(!process.env.SURVEY_LIBRARY_DIR)("the manifest of a survey-library checkout", () => {
    const dir = path.resolve(process.env.SURVEY_LIBRARY_DIR as string);
    const m = loadManifest(dir);
    SUITES.forEach((s: Suite) => {
      expect(m.suites[s].ids.length).toBeGreaterThan(0);
      expect(fs.existsSync(path.join(dir, m.suites[s].cwd))).toBe(true);
      expect(fs.existsSync(path.join(dir, m.suites[s].script))).toBe(true);
    });
  });
});
