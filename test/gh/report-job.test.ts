import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { runReport, workerNote } from "../../src/gh/report-job.ts";
import type { ReportInput, CellsFile, JobResults } from "../../src/gh/report-job.ts";
import { RECORD } from "../../src/gh/build.ts";
import type { BuildRecord } from "../../src/gh/build.ts";
import { pairOrder } from "../../src/gh/measure.ts";
import type { PairFile, PairStep } from "../../src/gh/measure.ts";
import type { RunPlan } from "../../src/gh/plan.ts";
import type { Role } from "../../src/versions.ts";
import { writeJsonAtomic } from "../../src/util/json.ts";
import { fakePlan } from "../helpers/plan.ts";
import { repoWith } from "../helpers/repo.ts";
import { result } from "../helpers/result.ts";

const root = path.resolve(import.meta.dirname, "../..");
const url = "https://github.com/o/r/actions/runs/1";
const ok4: JobResults = { plan: "success", buildToday: "success", buildOlder: "success", measure: "success" };
const writeJson = (file: string, v: unknown): void => writeJsonAtomic(file, v);
const read = (file: string): string => fs.readFileSync(file, "utf8");
const readJson = (file: string): unknown => JSON.parse(read(file));

let tmp: string;
let planDir: string;
let buildsDir: string;
let measuresDir: string;
let out: string;
let plan: RunPlan;
let base: ReportInput;
const saved = process.env.PERF_DISCORD_WEBHOOK;

const content = (): string => (readJson(out + "/discord/1-result/payload.json") as { content: string }).content;

function record(role: Role, over: Partial<BuildRecord> = {}): void {
  const rec: BuildRecord = { role: role, sha: "x", core: "core", ui: {}, uiMissing: {}, uiFailed: {}, deps: [], node: "v24", sec: 1, ...over };
  writeJson(path.join(buildsDir, "buildlog-" + role, RECORD), rec);
}

// A finished measure folder: today's median `today`, each older build's median 100 (a/one yesterday gets `yesterday`).
function measure(suite: string, id: string, medians: { today: number, yesterday?: number }): void {
  const key = (suite + "-" + id).replace(/[^A-Za-z0-9-]/g, "_");
  const dir = path.join(measuresDir, "measure-" + key);
  const pairs: PairFile["pairs"] = [];
  for (const role of ["yesterday", "week", "month"] as Role[]) {
    const steps: PairStep[] = [];
    for (const { repeat, side } of pairOrder(5)) {
      const med = side === "today" ? medians.today : role === "yesterday" && medians.yesterday !== undefined ? medians.yesterday : 100;
      const file = path.join(role, (side === "today" ? "today" : role) + "-" + repeat + ".json");
      writeJson(path.join(dir, file), result([[id, med]], { suite: suite }));
      steps.push({ repeat: repeat, side: side, file: file, start: "s", end: "e", sec: 1, outcome: "result", median: med });
    }
    pairs.push({ role: role, sha: "x", steps: steps });
  }
  const pf: PairFile = { suite: suite, id: id, key: key, repeats: 5, machine: { model: "AMD EPYC 7763", cores: 4 },
    start: "s", end: "e", pairs: pairs };
  writeJson(path.join(dir, "pair.json"), pf);
}

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "report-job-"));
  planDir = path.join(tmp, "plan");
  buildsDir = path.join(tmp, "builds");
  measuresDir = path.join(tmp, "measures");
  out = path.join(tmp, "out");
  fs.mkdirSync(measuresDir, { recursive: true });
  const full = fakePlan();
  plan = fakePlan({ suites: ["core"], jobs: full.jobs.filter((j) => j.suite === "core") });
  writeJson(planDir + "/plan.json", plan);
  for (const s of plan.specs) record(s.role, { sha: s.sha });
  base = { planDir: planDir, buildsDir: buildsDir, measuresDir: measuresDir, out: out, results: ok4, kind: "nightly", project: "survey-library", runUrl: url,
    projectsDir: path.join(root, "projects"), now: new Date("2026-11-17T01:30:00Z"), chrome: null };
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
  if (saved === undefined) delete process.env.PERF_DISCORD_WEBHOOK;
  else process.env.PERF_DISCORD_WEBHOOK = saved;
});

// Today 131 against yesterday's 100 on a/one; flat elsewhere.
function allMeasured(): void {
  measure("core", "a/one", { today: 131, yesterday: 100 });
  measure("core", "a/two", { today: 100 });
  measure("core", "b/three", { today: 100 });
}

describe("runReport", () => {
  test("no plan: cancelled, not started with the reason, or the plan job failed", async () => {
    fs.rmSync(planDir + "/plan.json");
    expect(await runReport({ ...base, results: { ...ok4, plan: "cancelled" } })).toBe("cancelled");
    expect(content()).toBe("⛔ perf survey-library nightly cancelled before measuring\n<" + url + ">");
    writeJson(planDir + "/failure.json", { reason: "unknown suite `x`" });
    expect(await runReport(base)).toBe("not started");
    expect(content()).toBe("❌ perf survey-library nightly not started: unknown suite x\n<" + url + ">");
    fs.rmSync(planDir + "/failure.json");
    await runReport({ ...base, project: "survey-creator" });
    expect(content()).toBe("❌ perf survey-creator nightly not started: the plan job failed\n<" + url + ">");
  });

  test("today's build failed: today's infra message with the log attached", async () => {
    record("today", { sha: "1".repeat(40), failed: "survey-core does not build", log: "build-today-survey-core.log" });
    fs.mkdirSync(buildsDir + "/buildlog-today/logs", { recursive: true });
    fs.writeFileSync(buildsDir + "/buildlog-today/logs/build-today-survey-core.log", "boom\n");
    expect(await runReport(base)).toBe("build failed");
    expect(content()).toBe("❌ survey-library nightly · `111111111` · today build failed: survey-core does not build\n<" + url + ">");
    expect(read(out + "/discord/1-result/files.txt")).toBe("build-today-survey-core.log\n");
  });

  test("cancelled before today's build was ready", async () => {
    fs.rmSync(buildsDir + "/buildlog-today", { recursive: true });
    await runReport({ ...base, results: { ...ok4, buildToday: "cancelled" } });
    expect(content()).toBe("⛔ perf survey-library nightly " + plan.runId + ": cancelled before measuring\n<" + url + ">");
  });

  test("the report: one message, the suites' md, cells.json, the tarball and history", async () => {
    allMeasured();
    expect(await runReport(base)).toBe("report");
    expect(content().split("\n")).toEqual(["🔺 survey-library nightly", "run: <" + url + ">", expect.stringMatching(/^\*\*core\*\* /), "overview.png failed"]);
    expect(read(out + "/core.md")).toContain("## Repeats");
    const cells = readJson(out + "/cells.json") as CellsFile;
    expect(cells.cells.find((c) => c.id === "a/one" && c.role === "yesterday")).toMatchObject({ verdict: "up", rerun: "confirmed",
      repeats: [expect.closeTo(0.31), expect.anything(), expect.anything(), expect.anything(), expect.anything()] });
    const h = out + "/history/survey-library/" + plan.runId;
    expect(fs.readdirSync(h).sort()).toEqual(["cells.json", "core.md", "payload.json"]);
    expect(execFileSync("tar", ["-tzf", out + "/results.tar.gz"], { encoding: "utf8" })).toContain("measure-core-a_one/yesterday/today-1.json");
  });

  test("a Creator night lists the library commits between yesterday's and today's library shas", async () => {
    const sibling = repoWith([1, 2, 3].map((n: number) => ({ date: "2026-11-1" + n + "T12:00:00Z", subject: "lib change " + n })));
    const shas = execFileSync("git", ["log", "--reverse", "--format=%H"], { cwd: sibling, encoding: "utf8" }).trim().split("\n");
    const creatorPlan: RunPlan = { ...plan, project: "survey-creator", specs: plan.specs.map((s) => ({ ...s, lib: { sha: s.role === "today" ? shas[2] : shas[0], date: s.date } })) };
    writeJson(planDir + "/plan.json", creatorPlan);
    allMeasured();
    await runReport({ ...base, project: "survey-creator", sibling: sibling });
    const titles = (): string[] => ((readJson(out + "/discord/1-result/payload.json") as { embeds: Array<{ title: string }> }).embeds || []).map((e) => e.title);
    expect(titles()).toContain("survey-library commits since yesterday (2)");
    fs.rmSync(out, { recursive: true, force: true });
    await runReport({ ...base, project: "survey-creator" });
    expect(titles().some((t: string) => /survey-library commits/.test(t))).toBe(false);
  });

  test("a worker that left nothing: warning, not run (worker failed), a note with the job's link", async () => {
    measure("core", "a/one", { today: 131, yesterday: 100 });
    measure("core", "b/three", { today: 100 });
    await runReport({ ...base, jobs: [{ name: "measure core-a_two", html_url: url + "/job/7", conclusion: "failure" }] });
    expect(content()).toMatch(/^⚠️ survey-library nightly\n/);
    expect(content()).toContain("not run (worker failed): core a/two <" + url + "/job/7>");
    expect(read(out + "/core.md")).toContain("not run (worker failed)");
  });

  test("cancelled while measuring: the report of what finished, with a note", async () => {
    measure("core", "a/one", { today: 131, yesterday: 100 });
    measure("core", "a/two", { today: 100 });
    await runReport({ ...base, results: { ...ok4, measure: "cancelled" } });
    expect(content()).toContain("cancelled: 1 scenario not measured");
    expect(content()).not.toContain("worker failed");
  });

  test("a measure job skipped after a cancel: every scenario is cancelled, not a worker failure", async () => {
    await runReport({ ...base, results: { ...ok4, measure: "skipped" } });
    expect(content()).toContain("cancelled: 3 scenarios not measured");
    expect(content()).not.toContain("worker failed");
  });

  test("a tarball that cannot be written is logged and the report still posts without it", async () => {
    allMeasured();
    fs.mkdirSync(out + "/results.tar.gz", { recursive: true });
    const errs: string[] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((m: unknown) => void errs.push(String(m)));
    try {
      expect(await runReport(base)).toBe("report");
    } finally {
      spy.mockRestore();
    }
    expect(errs.some((e) => e.startsWith("tar failed: "))).toBe(true);
    expect(read(out + "/discord/1-result/files.txt")).not.toContain("results.tar.gz");
  });

  test("no file the report writes holds the webhook", async () => {
    allMeasured();
    process.env.PERF_DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1/SECRETTOKEN";
    await runReport(base);
    expect(spawnSync("grep", ["-r", "-l", "SECRETTOKEN", out], { encoding: "utf8" }).status).toBe(1);
  });
});

test("workerNote", () => {
  const items = ["a", "b", "c", "d", "e", "f", "g"].map((x) => ({ suite: "core", id: x }));
  expect(workerNote(items)).toBe("not run (worker failed): core a, core b, core c, core d, core e, +2 more");
});
