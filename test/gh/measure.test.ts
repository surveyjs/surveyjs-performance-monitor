import { describe, test, expect, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { measureScenario, pairOrder, cpuLabel, checkRun } from "../../src/gh/measure.ts";
import type { PairFile, MeasureOptions } from "../../src/gh/measure.ts";
import { RECORD } from "../../src/gh/build.ts";
import type { BuildRecord } from "../../src/gh/build.ts";
import type { RunPlan } from "../../src/gh/plan.ts";
import { loadProject } from "../../src/project.ts";
import type { BuildSpec, Role } from "../../src/versions.ts";
import { readJson } from "../../src/util/json.ts";
import { fakePlan } from "../helpers/plan.ts";
import { result, ok } from "../helpers/result.ts";

const root = path.resolve(import.meta.dirname, "../..");
const fakeRunner = path.join(root, "test/fixtures/fake-runner");
const project = loadProject(path.join(root, "projects"), "survey-library");
const shaOf: Record<string, string> = { today: "1", yesterday: "2", week: "3", month: "4" };

const cleanup: string[] = [];
const saved: Record<string, string | undefined> = {};
afterEach(() => {
  for (const d of cleanup.splice(0)) fs.rmSync(d, { recursive: true, force: true });
  for (const k of Object.keys(saved)) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
    delete saved[k];
  }
});
function setEnv(env: Record<string, string>): void {
  for (const [k, v] of Object.entries(env)) {
    if (!(k in saved)) saved[k] = process.env[k];
    process.env[k] = v;
  }
}

interface Setup { out: string, builds: string, trace: () => Array<{ event: string, commit: string, kind: string }>, opts: MeasureOptions }

// Build folders hold only a build-record.json, one per role (not for `without`).
function setup(o: { plan?: RunPlan, fake?: unknown, env?: Record<string, string>, job?: { suite: string, id: string }, without?: Role[], record?: (r: BuildRecord) => BuildRecord } = {}): Setup {
  const T = fs.mkdtempSync(path.join(os.tmpdir(), "perf-ghmeasure-"));
  cleanup.push(T);
  const plan = o.plan || fakePlan();
  const builds = path.join(T, "builds");
  for (const s of plan.specs as BuildSpec[]) {
    if ((o.without || []).indexOf(s.role) > -1) continue;
    const dir = path.join(builds, "build-" + s.role);
    fs.mkdirSync(dir, { recursive: true });
    let rec: BuildRecord = { role: s.role, sha: s.sha, core: "survey-core", ui: { react: "survey-react-ui" }, uiMissing: {}, uiFailed: {}, deps: [], node: process.version, sec: 1 };
    if (o.record) rec = o.record(rec);
    fs.writeFileSync(path.join(dir, RECORD), JSON.stringify(rec));
  }
  const traceFile = path.join(T, "trace.jsonl");
  setEnv(Object.assign({ FAKE_TRACE: traceFile, FAKE_RESULTS_JSON: JSON.stringify(o.fake || {}) }, o.env || {}));
  const job = plan.jobs.find((j) => j.suite === (o.job?.suite || "core") && j.id === (o.job?.id || "a/one"))!;
  const out = path.join(T, "out");
  fs.mkdirSync(out, { recursive: true });
  return {
    out: out, builds: builds,
    trace: () => fs.existsSync(traceFile) ? fs.readFileSync(traceFile, "utf8").split("\n").filter((l: string) => !!l).map((l: string) => JSON.parse(l)) : [],
    opts: { plan: plan, project: project, job: job, runner: fakeRunner, builds: builds, out: out, slot: null, machine: { model: "m", cpu: "m", cores: 4 } },
  };
}

test("pairOrder(5) is A B B A A B B A A B", () => {
  const o = pairOrder(5);
  expect(o.map((s) => (s.side === "today" ? "A" : "B")).join("")).toBe("ABBAABBAAB");
  expect(o.map((s) => s.repeat)).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
});

test("cpuLabel", () => {
  expect(cpuLabel("AMD EPYC 7763 64-Core Processor")).toBe("AMD EPYC 7763");
  expect(cpuLabel("Intel(R) Xeon(R) 6975P-C")).toBe("Intel Xeon 6975P-C");
  expect(cpuLabel("Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz")).toBe("Intel Xeon Platinum 8370C");
  expect(cpuLabel("INTEL(R) XEON(R) PLATINUM 8573C")).toBe("INTEL XEON PLATINUM 8573C");
});

test("checkRun", () => {
  expect(checkRun(ok(result([["a/one", 10]])), "a/one")).toEqual({ median: 10 });
  expect(checkRun(ok(result([], { failed: [{ id: "a/one", error: "killed after 300 s" }] })), "a/one")).toEqual({ stop: { kind: "failed", reason: "killed after 300 s" } });
  expect(checkRun(ok(result([], { skipped: [{ id: "a/one", reason: "not in this build: x" }] })), "a/one")).toEqual({ stop: { kind: "skipped", reason: "not in this build: x" } });
  expect(checkRun(ok(result([], { incomplete: { reason: "timeout", unrun: ["a/one"] } })), "a/one")).toEqual({ stop: { kind: "incomplete", reason: "timeout" } });
  expect(checkRun({ kind: "suite failed", reason: "no result file (exit 1)" }, "a/one")).toEqual({ stop: { kind: "suite failed", reason: "no result file (exit 1)" } });
  expect(checkRun(ok(result([["a/two", 1]])), "a/one")).toEqual({ stop: { kind: "missing", reason: "not in the result" } });
});

describe("measureScenario", () => {
  test("today against each older build in turn, 5 times interleaved, with the night's environment", async () => {
    const s = setup();
    const pf = await measureScenario(s.opts);
    const starts = s.trace().filter((t) => t.event === "start");
    expect(starts.map((t) => t.commit[0]).join("")).toBe("1221122112" + "1331133113" + "1441144114");
    expect(starts.every((t) => t.kind === (t.commit[0] === "1" ? "nightly" : "bisect"))).toBe(true);
    expect(pf.pairs.map((p) => [p.role, p.steps.length])).toEqual([["yesterday", 10], ["week", 10], ["month", 10]]);
    expect(pf.end).toBeDefined();
    expect(fs.existsSync(path.join(s.out, "week", "week-5.json"))).toBe(true);
    expect(fs.existsSync(path.join(s.out, "week", "today-5.json"))).toBe(true);
    expect(fs.existsSync(path.join(s.out, "logs", "week-build-5.log"))).toBe(true);
    expect(readJson(path.join(s.out, "pair.json"), null)).toEqual(pf);
  });

  test("a failed run of the older build stops its pair, and the next pair runs", async () => {
    const s = setup({ fake: { ["3".repeat(40)]: { results: [], failed: [{ id: "a/one", error: "killed after 300 s" }] } } });
    const pf = await measureScenario(s.opts);
    expect(pf.pairs[1]).toMatchObject({ role: "week", stop: { side: "build", kind: "failed", reason: "killed after 300 s" } });
    expect(pf.pairs[1].steps.length).toBe(2);
    expect(pf.pairs[2].steps.length).toBe(10);
  });

  test("a failed run of today stops the scenario", async () => {
    const s = setup({ fake: { ["1".repeat(40)]: { exit: 1 } } });
    const pf = await measureScenario(s.opts);
    expect(pf.todayStop).toMatchObject({ side: "today", kind: "suite failed" });
    expect(pf.pairs.length).toBe(1);
    expect(pf.end).toBeDefined();
  });

  test("sameAs and a missing build record give no pair", async () => {
    const base = fakePlan();
    const specs = base.specs.map((sp: BuildSpec) => sp.role === "yesterday" ? { ...sp, sameAs: "today" as Role } : sp);
    const s = setup({ plan: fakePlan({ specs: specs }), without: ["month"] });
    expect((await measureScenario(s.opts)).pairs.map((p) => p.role)).toEqual(["week"]);
  });

  test("today without the suite's UI package: no pair", async () => {
    const s = setup({ job: { suite: "react", id: "a/paint" },
      record: (r: BuildRecord) => r.role === "today" ? { ...r, ui: {}, uiMissing: { react: "no survey-react-ui at 1111111" } } : r });
    const pf = await measureScenario(s.opts);
    expect(pf.pairs).toEqual([]);
    expect(pf.todayStop).toEqual({ side: "today", kind: "skipped", reason: "no survey-react-ui at 1111111" });
  });

  test("an abort leaves pair.json with what ran and without end", async () => {
    const s = setup({ env: { FAKE_SLEEP_MS: "2000" } });
    const ac = new AbortController();
    const timer = setInterval(() => {
      if (s.trace().some((t) => t.event === "end")) ac.abort();
    }, 20);
    try {
      await measureScenario({ ...s.opts, signal: ac.signal });
    } finally {
      clearInterval(timer);
    }
    const pf = readJson(path.join(s.out, "pair.json"), null) as PairFile;
    expect(pf.end).toBeUndefined();
    expect(pf.pairs[0].steps.length).toBeGreaterThanOrEqual(1);
  });
});
