// The build job of the GitHub workflow: one role's build and the record that lets the measuring jobs and the report
// job use it without the build folders' original paths.
import * as fs from "node:fs";
import * as path from "node:path";
import { buildAt, buildPairAt, npmFor } from "../builds.ts";
import type { Build, Npm } from "../builds.ts";
import type { Project } from "../project.ts";
import type { Outcome } from "../report.ts";
import type { BuildSpec, Role } from "../versions.ts";
import { writeJsonAtomic } from "../util/json.ts";
import { UsageError } from "../errors.ts";
import type { RunPlan } from "./plan.ts";

// `core` and the `ui` values are folder names inside the build artifact; `log` and `uiFailed[].log` are file names in
// the logs folder.
export interface BuildRecord {
  role: Role;
  sha: string;
  core: string | null;
  ui: Record<string, string>;
  uiMissing: Record<string, string>;
  uiFailed: Record<string, { reason: string, log?: string }>;
  failed?: string;
  log?: string;
  deps: string[];
  node: string;
  sec: number;
  // A two-repo build: the library commit, and per suite target variable -> folder name.
  lib?: string;
  targets?: Record<string, Record<string, string>>;
}

export const RECORD = "build-record.json";

// The record of a build: names instead of paths, the log only for a failed build.
export function recordOf(b: Build, sec: number): BuildRecord {
  const ui: Record<string, string> = {};
  for (const s of Object.keys(b.ui)) ui[s] = path.basename(b.ui[s]);
  const uiFailed: Record<string, { reason: string, log?: string }> = {};
  for (const s of Object.keys(b.uiFailed)) {
    const f = b.uiFailed[s];
    uiFailed[s] = f.log ? { reason: f.reason, log: path.basename(f.log) } : { reason: f.reason };
  }
  const rec: BuildRecord = { role: b.role, sha: b.sha, core: b.core === null ? null : path.basename(b.core), ui: ui,
    uiMissing: b.uiMissing, uiFailed: uiFailed, deps: b.deps, node: b.node, sec: sec };
  if (b.lib) rec.lib = b.lib;
  if (b.targets) {
    const t: Record<string, Record<string, string>> = {};
    for (const s of Object.keys(b.targets)) {
      t[s] = {};
      for (const v of Object.keys(b.targets[s])) t[s][v] = path.basename(b.targets[s][v]);
    }
    rec.targets = t;
  }
  if (b.failed) {
    rec.failed = b.failed;
    if (b.logs.length > 0) rec.log = path.basename(b.logs[b.logs.length - 1]);
  }
  return rec;
}

// The record in `dir`, or undefined when the file is absent or unreadable.
export function readRecord(dir: string): BuildRecord | undefined {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, RECORD), "utf8")) as BuildRecord;
  } catch(e) {
    return undefined;
  }
}

// The Build a record describes, with absolute paths under `dir` (where the build artifact was downloaded).
export function buildFromRecord(rec: BuildRecord, dir: string): Build {
  const ui: Record<string, string> = {};
  for (const s of Object.keys(rec.ui)) ui[s] = path.join(dir, rec.ui[s]);
  const b: Build = { role: rec.role, sha: rec.sha, core: rec.core === null ? null : path.join(dir, rec.core), ui: ui,
    uiMissing: rec.uiMissing, uiFailed: rec.uiFailed, logs: [], deps: rec.deps, node: rec.node };
  if (rec.failed) b.failed = rec.failed;
  if (rec.lib) b.lib = rec.lib;
  if (rec.targets) {
    const t: Record<string, Record<string, string>> = {};
    for (const s of Object.keys(rec.targets)) {
      t[s] = {};
      for (const v of Object.keys(rec.targets[s])) t[s][v] = path.join(dir, rec.targets[s][v]);
    }
    b.targets = t;
  }
  return b;
}

// What a role shows for a suite when it gets no measuring job, or nothing. The rules: a role
// that is the same as another, a role without a record or a failed build, a UI package that is missing (n/a) or
// failed; and when the reference (the first spec) has no result for the suite, the other roles are not run.
export function suiteOutcomes(specs: BuildSpec[], records: Partial<Record<Role, BuildRecord>>, suite: string,
  logPath?: (role: Role, file: string) => string): Partial<Record<Role, Outcome>> {
  const logOf = (role: Role, file: string | undefined): string | undefined => file === undefined ? undefined : logPath ? logPath(role, file) : file;
  const noJob = (role: Role): Outcome | null => {
    const r = records[role];
    if (!r) return { kind: "build failed", reason: "the build job failed" };
    if (r.failed) return { kind: "build failed", reason: r.failed, log: logOf(role, r.log) };
    const missing = r.uiMissing[suite];
    if (missing === undefined) return null;
    const failed = r.uiFailed[suite];
    if (failed) return { kind: "build failed", reason: failed.reason, log: logOf(role, failed.log) };
    return { kind: "n/a", reason: missing };
  };
  const res: Partial<Record<Role, Outcome>> = {};
  if (specs.length === 0) return res;
  const reference = specs[0];
  const refNone = noJob(reference.role);
  for (const s of specs) {
    let none: Outcome | null = s.sameAs ? { kind: "same", as: s.sameAs } : noJob(s.role);
    if (!none && s.role !== reference.role && refNone && refNone.kind === "build failed") none = { kind: "not run", reason: reference.role + " build failed" };
    if (none) res[s.role] = none;
  }
  return res;
}

// Builds `role` of the plan in `work` and writes the build folders and the record to <out>/build/, the record again to
// <out>/build-record.json and the logs to <out>/logs/.
export async function buildRole(o: { plan: RunPlan, project: Project, role: Role, repo: string, libRepo?: string, work: string, out: string, npm?: Npm }): Promise<BuildRecord> {
  const spec = o.plan.specs.find((s: BuildSpec) => s.role === o.role);
  if (!spec) throw new UsageError("the plan has no build " + o.role);
  const logs = path.join(o.out, "logs");
  fs.mkdirSync(logs, { recursive: true });
  const npm = o.npm || npmFor({ logs: logs });
  const dest = path.join(o.out, "build");
  fs.mkdirSync(dest, { recursive: true });
  const t0 = Date.now();
  const bo = { work: o.work, dest: dest, repo: o.repo, logs: logs, npm: npm, m: o.plan.manifest, suites: o.plan.suites, project: o.project };
  let b: Build;
  if (o.project.library) {
    if (!o.libRepo) throw new UsageError("a two-repo build needs the library repository");
    b = await buildPairAt({ ...bo, libRepo: o.libRepo }, spec);
  } else {
    b = await buildAt(bo, spec);
  }
  const rec = recordOf(b, Math.round((Date.now() - t0) / 100) / 10);
  writeJsonAtomic(path.join(dest, RECORD), rec);
  writeJsonAtomic(path.join(o.out, RECORD), rec);
  return rec;
}
