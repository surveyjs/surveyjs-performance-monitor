// The report job of the GitHub workflow: runs after every other job, reads the downloaded artifacts and writes the one
// Discord message (an outbox folder the next step posts), the <suite>.md tables, the overview picture, the results
// tarball, cells.json and the files for the history branch. The webhook is never read here.
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { execFileSync } from "node:child_process";
import { readRecord, suiteOutcomes } from "./build.ts";
import type { BuildRecord } from "./build.ts";
import { loadScenario, pairMatrix } from "./pairs.ts";
import type { ScenarioInput } from "./pairs.ts";
import type { RunPlan } from "./plan.ts";
import { suiteMarkdown, verdictOf } from "../report.ts";
import type { Cell, Row, SuiteMatrix, Verdict } from "../report.ts";
import { overviewHtml, renderPng } from "../overview.ts";
import { reportMessage, plainMessage, writeMessage, limits } from "../discord.ts";
import type { Message } from "../discord.ts";
import { commitRange } from "../pr.ts";
import { depsDiff } from "../util/deps.ts";
import { tail } from "../util/format.ts";
import { readJson } from "../util/json.ts";
import { loadProject } from "../project.ts";
import type { BuildSpec, Role } from "../versions.ts";

// GitHub's `needs.<job>.result` values.
export interface JobResults { plan: string, buildToday: string, buildOlder: string, measure: string }

export interface JobInfo { name: string, html_url: string, conclusion: string | null }

export interface ReportInput {
  planDir: string;
  buildsDir: string;
  measuresDir: string;
  out: string;
  results: JobResults;
  kind: "nightly";
  runUrl: string;
  projectsDir: string;
  now: Date;
  jobs?: JobInfo[];
  lib?: string;
  chrome: string | null;
}

export type ReportKind = "report" | "not started" | "build failed" | "cancelled";

export interface CellsFile {
  project: string;
  runId: string;
  kind: "nightly";
  start: string;
  repeats: number;
  specs: BuildSpec[];
  cells: Array<{ suite: string, id: string, role: Role, median?: number, delta?: number, mark?: string, reason?: string, verdict?: Verdict, rerun?: string, repeats?: Array<number | null> }>;
}

export const OUTBOX = "discord/1-result";

const STRIP = /[`<>@*_~|\\]/g;

// "not run (worker failed): <suite> <id> [<job url>], ..." for the first `max` scenarios, then "+N more".
export function workerNote(items: Array<{ suite: string, id: string, url?: string }>, max: number = 5): string {
  const shown = items.slice(0, max).map((x: { suite: string, id: string, url?: string }) => x.suite + " " + x.id + (x.url ? " " + x.url : ""));
  if (items.length > max) shown.push("+" + (items.length - max) + " more");
  return "not run (worker failed): " + shown.join(", ");
}

// One entry per (row, role) cell of the matrices, with each repeat's delta and the verdict of the cell.
export function cellsFile(plan: RunPlan, matrices: SuiteMatrix[]): CellsFile {
  const cells: CellsFile["cells"] = [];
  for (const m of matrices) {
    for (const row of m.rows) {
      for (const role of m.roles) {
        const c: Cell | undefined = row.cells[role];
        if (!c) continue;
        const e: CellsFile["cells"][number] = { suite: m.suite, id: row.id, role: role };
        if (c.median !== undefined) e.median = c.median;
        if (c.delta !== undefined) e.delta = c.delta;
        if (c.mark !== undefined) e.mark = c.mark;
        if (c.reason !== undefined) e.reason = c.reason;
        const v = verdictOf(row as Row, role, m.suite);
        if (v !== undefined) e.verdict = v;
        if (c.rerun !== undefined) e.rerun = c.rerun;
        if (c.repeats) e.repeats = c.repeats.map((r: { delta?: number }) => (r.delta === undefined ? null : r.delta));
        cells.push(e);
      }
    }
  }
  return { project: plan.project, runId: plan.runId, kind: plan.kind, start: plan.start, repeats: plan.repeats, specs: plan.specs, cells: cells };
}

function jsonFiles(dir: string, rel: string = ""): string[] {
  const res: string[] = [];
  if (!fs.existsSync(path.join(dir, rel))) return res;
  for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? path.join(rel, e.name) : e.name;
    if (e.isDirectory()) res.push(...jsonFiles(dir, r));
    else if (e.isFile() && e.name.endsWith(".json")) res.push(r);
  }
  return res.sort();
}

// results.tar.gz of every *.json under `dir`, relative to it; undefined when there is none or tar fails.
function tarMeasures(dir: string, out: string): string | undefined {
  const files = jsonFiles(dir);
  if (files.length === 0) return undefined;
  let tmp: string | undefined;
  try {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "perf-tar-"));
    const list = path.join(tmp, "list");
    fs.writeFileSync(list, files.join("\0") + "\0");
    const target = path.join(out, "results.tar.gz");
    execFileSync("tar", ["-czf", target, "-C", dir, "--null", "-T", list], { stdio: "ignore" });
    return target;
  } catch(e) {
    console.error("tar failed: " + String(e instanceof Error ? e.message : e).split("\n")[0]);
    return undefined;
  } finally {
    if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function post(i: ReportInput, m: Message, sources: Record<string, string> = {}): void {
  writeMessage(path.join(i.out, OUTBOX), m, sources);
}

// Writes everything the night's report job produces into `i.out` and says which message it posted.
export async function runReport(i: ReportInput): Promise<ReportKind> {
  fs.mkdirSync(i.out, { recursive: true });
  const url = "<" + i.runUrl + ">";
  const plan = readJson<RunPlan | null>(path.join(i.planDir, "plan.json"), null);
  if (!plan) {
    if (i.results.plan === "cancelled") {
      post(i, plainMessage("⛔ perf " + i.kind + " cancelled before measuring\n" + url));
      return "cancelled";
    }
    const failure = readJson<{ reason?: string } | null>(path.join(i.planDir, "failure.json"), null);
    const reason = failure && typeof failure.reason === "string" ? failure.reason.replace(STRIP, "") : "the plan job failed";
    post(i, plainMessage("❌ perf " + i.kind + " not started: " + reason + "\n" + url));
    return "not started";
  }

  const roles: Role[] = plan.specs.map((s: BuildSpec) => s.role);
  const reference = plan.specs[0];
  const records: Partial<Record<Role, BuildRecord>> = {};
  for (const role of roles) {
    const rec = readRecord(path.join(i.buildsDir, "buildlog-" + role));
    if (rec) records[role] = rec;
  }
  const logOf = (role: Role, file: string): string => path.join(path.resolve(i.buildsDir), "buildlog-" + role, "logs", path.basename(file));
  const refRecord = records[reference.role];
  const sha9 = reference.sha.substring(0, 9);
  if (!refRecord && i.results.buildToday === "cancelled") {
    post(i, plainMessage("⛔ perf " + i.kind + " " + plan.runId + ": cancelled before measuring\n" + url));
    return "cancelled";
  }
  if (!refRecord || refRecord.failed) {
    const reason = refRecord ? (refRecord.failed as string).replace(STRIP, "") : "the build job failed";
    const text = "❌ " + i.kind + " · `" + sha9 + "` · " + reference.role + " build failed: " + reason + "\n" + url;
    const log = refRecord && refRecord.log ? logOf(reference.role, refRecord.log) : undefined;
    if (log && fs.existsSync(log)) post(i, plainMessage(text, [path.basename(log)]), { [path.basename(log)]: log });
    else post(i, plainMessage(text));
    return "build failed";
  }

  const project = loadProject(i.projectsDir, plan.project);
  const scenarios: Record<string, ScenarioInput[]> = {};
  const cancelled: Array<{ suite: string, id: string }> = [];
  const workerFailed: Array<{ suite: string, id: string, url?: string }> = [];
  for (const job of plan.jobs) {
    const dir = path.join(i.measuresDir, "measure-" + job.key);
    const info = (i.jobs || []).find((j: JobInfo) => j.name === "measure " + job.key);
    // A run cancelled before measuring started skips the whole measure job: skipped counts as cancelled.
    const stopped = (r: string | null): boolean => r === "cancelled" || r === "skipped";
    const isCancelled = info ? stopped(info.conclusion) : stopped(i.results.measure);
    const sc = loadScenario(dir, job.id, isCancelled ? "cancelled" : "worker failed");
    (scenarios[job.suite] = scenarios[job.suite] || []).push(sc);
    if (sc.missing === "cancelled") cancelled.push({ suite: job.suite, id: job.id });
    else if (sc.missing) workerFailed.push({ suite: job.suite, id: job.id, url: info ? info.html_url : undefined });
  }

  const matrices: SuiteMatrix[] = plan.suites.map((suite: string) => {
    const outcomes = suiteOutcomes(plan.specs, records, suite, logOf);
    const m = pairMatrix(suite, roles, outcomes, scenarios[suite] || [], plan.repeats);
    for (const f of m.failed) if (f.log) f.tail = tail(f.log, 5);
    return m;
  });

  const notes: string[] = [];
  if (cancelled.length > 0) notes.push("cancelled: " + cancelled.length + " scenario" + (cancelled.length === 1 ? "" : "s") + " not measured");
  if (workerFailed.length > 0) notes.push(workerNote(workerFailed));
  notes.push("run: " + i.runUrl);

  const start = new Date(plan.start);
  const md = (suite: string): string => path.join(i.out, suite + ".md");
  for (const m of matrices) fs.writeFileSync(md(m.suite), suiteMarkdown(project, m, start, notes.join(" · ")));

  const durationMin = (i.now.getTime() - start.getTime()) / 60000;
  const png = path.join(i.out, "overview.png");
  const html = overviewHtml({ project: project.name, sha: reference.sha, date: start, durationMin: durationMin, matrices: matrices });
  fs.writeFileSync(path.join(i.out, "overview.html"), html);
  const pngOk = await renderPng(html, png, { chrome: i.chrome, rows: matrices.length, logFile: path.join(i.out, "overview.log"), signal: AbortSignal.timeout(60000) });
  if (!pngOk) fs.rmSync(png, { force: true });

  const tar = tarMeasures(i.measuresDir, i.out);
  const files: string[] = [];
  if (pngOk) files.push(png);
  for (const m of matrices) files.push(md(m.suite));
  if (tar) files.push(tar);
  const logs: string[] = [];
  for (const m of matrices) for (const f of m.failed) if (f.log && fs.existsSync(f.log) && logs.indexOf(f.log) < 0) logs.push(f.log);
  files.push(...logs.slice(0, Math.max(0, limits.files - files.length)));

  const cmp = plan.specs.find((s: BuildSpec) => s.role === "yesterday");
  const commits = cmp && i.lib ? commitRange(i.lib, cmp.sha, reference.sha, project.repo) : [];
  const cmpRecord = cmp ? records[cmp.sameAs || cmp.role] : undefined;
  const depsNote = cmp && !cmp.sameAs && cmpRecord && !cmpRecord.failed ? depsDiff(cmpRecord.deps, refRecord.deps) : "";
  const message = reportMessage({ project: project, specs: plan.specs,
    matrices: matrices, commits: commits, depsNote: depsNote || undefined, notes: notes, overview: pngOk, files: files });
  post(i, message);

  const cells = cellsFile(plan, matrices);
  fs.writeFileSync(path.join(i.out, "cells.json"), JSON.stringify(cells, null, 2) + "\n");
  const hist = path.join(i.out, "history", plan.project, plan.runId);
  fs.mkdirSync(hist, { recursive: true });
  for (const m of matrices) fs.copyFileSync(md(m.suite), path.join(hist, m.suite + ".md"));
  if (pngOk) fs.copyFileSync(png, path.join(hist, "overview.png"));
  fs.copyFileSync(path.join(i.out, OUTBOX, "payload.json"), path.join(hist, "payload.json"));
  fs.copyFileSync(path.join(i.out, "cells.json"), path.join(hist, "cells.json"));
  return "report";
}
