import { describe, test, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { suiteEnv, suiteCommand, runSuite } from "../src/runner.ts";
import type { Build } from "../src/builds.ts";
import { checkManifest, loadManifest } from "../src/contract.ts";
import type { Manifest } from "../src/contract.ts";
import type { Outcome } from "../src/report.ts";
import { pinnable } from "./helpers/cpus.ts";

const root = path.resolve(import.meta.dirname, "..");
const fakeRunner = path.join(root, "test/fixtures/fake-runner");
const real = checkManifest(JSON.parse(fs.readFileSync(path.join(root, "test/testdata/manifest.json"), "utf8")), "manifest.json") as Manifest;
const sha = "a".repeat(40);
const tmp = (): string => fs.mkdtempSync(path.join(os.tmpdir(), "perf-runner-"));

const params = (file: string, over: Partial<Parameters<typeof suiteEnv>[1]> = {}): Parameters<typeof suiteEnv>[1] =>
  ({ resultFile: file, core: "/b/survey-core", kind: "nightly", label: "today", ref: "origin/master", targetCommit: sha, only: null, ...over });

const build: Build = { role: "today", sha: sha, core: "/b/survey-core", ui: {}, uiMissing: {}, uiFailed: {}, logs: [], deps: [], node: process.version };

// Runs the fake core suite with FAKE_* variables set only for this call.
async function fake(o: { fake?: Record<string, string>, slot?: string | null, signal?: AbortSignal, dir?: string } = {}): Promise<{ outcome: Outcome, file: string, logFile: string }> {
  const dir = o.dir || tmp();
  const file = path.join(dir, "core-today.json");
  const logFile = path.join(dir, "logs", "suite-core-today.log");
  const saved: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(o.fake || {})) {
    saved[k] = process.env[k];
    process.env[k] = v;
  }
  try {
    const outcome = await runSuite({ runner: fakeRunner, m: loadManifest(fakeRunner), suite: "core", build: build, file: file, logFile: logFile,
      env: params(file), slot: o.slot, signal: o.signal });
    return { outcome: outcome, file: file, logFile: logFile };
  } finally {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

async function waitFor(check: () => boolean, ms: number = 10000): Promise<void> {
  const t0 = Date.now();
  while(!check()) {
    if (Date.now() - t0 > ms) throw new Error("timed out waiting");
    await new Promise((resolve: (v: unknown) => void) => setTimeout(resolve, 20));
  }
}

describe("suiteEnv", () => {
  test("suiteEnv sets the contract variables and drops inherited ones", () => {
    const env = suiteEnv({ PERF_ONLY: "x", PERF_UI_DIR: "y", PERF_UNKNOWN: "z", PATH: "p" }, params("/o/core-today.json"));
    expect(env.PERF_ONLY).toBeUndefined();
    expect(env.PERF_UI_DIR).toBeUndefined();
    expect(env.PERF_UNKNOWN).toBeUndefined();
    expect(env.PERF_CORE_DIR).toBe("/b/survey-core");
    expect(env.PERF_RESULT_FILE).toBe("/o/core-today.json");
    expect(env.PERF_KIND).toBe("nightly");
    expect(env.PERF_TARGET_COMMIT).toBe(sha);
    expect(env.PATH).toBe("p");
    expect(suiteEnv({}, params("/f", { only: ["a", "b"] })).PERF_ONLY).toBe("a,b");
    expect(suiteEnv({}, params("/f", { ui: "/b/survey-react-ui" })).PERF_UI_DIR).toBe("/b/survey-react-ui");
    const clean = suiteEnv({ PERF_WORK_DIR: "/work", PERF_OUT_DIR: "/out", PERF_MACHINE_EXTRA: "img", PERF_CPUS: "8-15", PERF_RUN_ID: "r", HOME: "/h" }, params("/f", { only: ["a"], ui: "/u" }));
    expect(clean.PERF_RUN_ID).toBeUndefined();
    expect(clean.PERF_WORK_DIR).toBeUndefined();
    expect(clean.PERF_OUT_DIR).toBeUndefined();
    expect(clean.PERF_MACHINE_EXTRA).toBeUndefined();
    expect(clean.HOME).toBe("/h");
    expect(Object.keys(clean).filter((k: string) => /^PERF_/.test(k)).sort()).toEqual(["PERF_CORE_DIR", "PERF_KIND", "PERF_LABEL", "PERF_ONLY", "PERF_REF", "PERF_RESULT_FILE", "PERF_TARGET_COMMIT", "PERF_UI_DIR"]);
  });
});

describe("suiteCommand", () => {
  test("the suite script is relative to the checkout root, not to cwd", () => {
    const react = suiteCommand("/r", real.suites.react);
    expect(react.cmd).toBe(process.execPath);
    expect(react.args[0]).toBe("/r/node_modules/@playwright/test/cli.js");
    expect(react.args.slice(1)).toEqual(real.suites.react.args);
    expect(react.cwd).toBe("/r/packages/survey-react-ui");
    const core = suiteCommand("/r", real.suites.core, null);
    expect(core.cmd).toBe(process.execPath);
    expect(core.args[0]).toBe("/r/perf/core/run.ts");
    expect(core.cwd).toBe("/r/packages/survey-core");
  });

  test("a slot runs the suite under taskset", async () => {
    const c = suiteCommand("/r", real.suites.core, "10,11");
    expect(c.cmd).toBe("taskset");
    expect(c.args.slice(0, 3)).toEqual(["-c", "10,11", process.execPath]);
    expect(c.args[3]).toBe("/r/perf/core/run.ts");
    expect(c.cwd).toBe("/r/packages/survey-core");
  });

  test.skipIf(!pinnable([0]))("a slot runs the suite under taskset: the suite sees the slot's cores", async () => {
    const { outcome, file } = await fake({ slot: "0" });
    expect(outcome.kind).toBe("result");
    expect(JSON.parse(fs.readFileSync(file, "utf8")).fake.cpus).toBe("0");
  });
});

describe("runSuite", () => {
  test("runSuite returns the result and its log", async () => {
    const { outcome, file, logFile } = await fake();
    expect(outcome.kind).toBe("result");
    if (outcome.kind !== "result") return;
    expect(outcome.log).toBe(logFile);
    expect(outcome.sec).toBeGreaterThan(0);
    expect(outcome.result.results.map((e) => e.id)).toEqual(["a/one", "a/two", "b/three"]);
    const written = JSON.parse(fs.readFileSync(file, "utf8"));
    expect(written.kind).toBe("nightly");
    expect(written.build.core.dir).toBe("/b/survey-core");
    expect(written.fake.runner).toBe(fakeRunner);
    expect(fs.readFileSync(logFile, "utf8")).toContain("fake-suite core");
  });

  test("a suite without a result file is suite failed", async () => {
    const { outcome, logFile } = await fake({ fake: { FAKE_RESULTS_JSON: JSON.stringify({ [sha]: { exit: 1 } }) } });
    expect(outcome).toEqual({ kind: "suite failed", reason: "no result file (exit 1)", log: logFile });
  });

  test("an aborted suite is stopped and its result is incomplete", async () => {
    const dir = tmp();
    const logFile = path.join(dir, "logs", "suite-core-today.log");
    const ac = new AbortController();
    const t0 = Date.now();
    const run = fake({ dir: dir, fake: { FAKE_SLEEP_MS: "30000" }, signal: ac.signal });
    await new Promise((resolve: (v: unknown) => void) => setTimeout(resolve, 200));
    // The suite has its SIGTERM handler once it says it sleeps.
    await waitFor(() => fs.existsSync(logFile) && fs.readFileSync(logFile, "utf8").indexOf("sleeping") > -1);
    ac.abort();
    const { outcome } = await run;
    expect(Date.now() - t0).toBeLessThan(5000);
    expect(outcome.kind).toBe("result");
    if (outcome.kind !== "result") return;
    expect(outcome.result.incomplete?.reason).toBe("timeout");
    expect(outcome.result.incomplete?.unrun).toEqual(["a/one", "a/two", "b/three"]);
  });
});
