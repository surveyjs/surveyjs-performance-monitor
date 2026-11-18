import * as path from "node:path";
import * as fs from "node:fs";
import { execFileSync } from "node:child_process";

// The runner contract of the project's perf suites (perf/CONTRACT.md in survey-library): the versions this monitor
// reads, the manifest and the result file. The project writes these; the monitor only reads them.
export const knownContract = 2;
export const knownResultSchema = 2;

export interface MachineInfo {
  key: string;
  os: string;
  cpu: string;
  cores: number;
  availableParallelism: number;
  node: string;
  chromium: string | null;
  extra: string;
}

// `node <script> ...args` in `cwd`, both relative to the checkout root. A suite with a `package` is a browser suite.
export interface SuiteManifest {
  ids: Array<string>;
  cwd: string;
  script: string;
  args: Array<string>;
  package?: string;
  buildFile?: string;
  src?: Array<string>;
}

export interface Manifest {
  contract: number;
  resultSchema: number;
  suites: { [suite: string]: SuiteManifest };
  machine: MachineInfo;
}

export interface Counters { [name: string]: { value: number | null, kind: "work" | "dom" } }

export interface ResultEntry {
  id: string;
  rev: number;
  unit: "ms";
  samples: Array<number>;
  median: number;
  min: number;
  max: number;
  mad: number;
  phases?: { [phase: string]: { median: number, min: number } };
  counters: Counters;
  info: { [name: string]: unknown };
  jsonErrors: number;
  tolerance: number | null;
  local: boolean;
  repeat?: number;
  counterOnly?: boolean;
}

export interface BuildPart {
  dir: string;
  version: string | null;
  commit: string | null;
  mtime: string | null;
  framework?: { [name: string]: string };
}

export interface ResultFile {
  schema: 2;
  suite: string;
  kind: string;
  label: string;
  ref: string | null;
  commit: string | null;
  previousCommit: string | null;
  date: string;
  requested: { only: Array<string> | null, notInSuite: Array<string> };
  incomplete: { reason: "timeout" | "killed", unrun: Array<string> } | null;
  build: { core: BuildPart, ui?: BuildPart, deps: { fingerprint: string | null, versions: { [name: string]: string } } };
  machine: MachineInfo;
  // null from the runner.
  environment: { [k: string]: unknown } | null;
  fixtures: { [key: string]: { hash: string, dataHash?: string, options: unknown } };
  skipped: Array<{ id: string, reason: string }>;
  // Scenarios that threw (a check, jsonErrors on the runner's build): the result has no entry for them.
  failed: Array<{ id: string, error: string }>;
  results: Array<ResultEntry>;
}

export function checkManifest(m: unknown, from: string): Manifest {
  const obj = m as Partial<Manifest> | null;
  if (!obj || typeof obj !== "object") throw new Error(from + ": the manifest is not an object");
  if (obj.contract !== knownContract) throw new Error(from + ": runner contract " + obj.contract + ", monitor knows " + knownContract);
  if (obj.resultSchema !== knownResultSchema) throw new Error(from + ": result schema " + obj.resultSchema + ", monitor reads " + knownResultSchema);
  if (!obj.suites || typeof obj.suites !== "object" || Object.keys(obj.suites).length === 0) throw new Error(from + ": the manifest has no suites");
  for (const [name, sm] of Object.entries(obj.suites)) {
    const ok = sm && Array.isArray(sm.ids) && typeof sm.cwd === "string" && typeof sm.script === "string" && Array.isArray(sm.args);
    if (!ok) throw new Error(from + ": suite " + name + " is malformed");
  }
  return obj as Manifest;
}

// runner: the checkout whose tests run. Its perf/manifest.ts prints the manifest; it needs no build.
export function loadManifest(runner: string): Manifest {
  const script = path.join(runner, "perf", "manifest.ts");
  const out = execFileSync(process.execPath, [script], { cwd: runner, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return checkManifest(JSON.parse(out), script);
}

// The lists the report reads are checked too: a file without them fails its own suite (runner.ts: "suite failed:
// unreadable result file"), not the report of the night.
export function readResult(file: string): ResultFile {
  const result = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!result || typeof result !== "object" || Array.isArray(result)) throw new Error(file + ": not an object");
  if (result.schema !== knownResultSchema) throw new Error(file + ": result schema " + result.schema + ", monitor reads " + knownResultSchema);
  for (const key of ["results", "failed", "skipped"]) {
    if (!Array.isArray(result[key])) throw new Error(file + ": " + key + " is not a list");
  }
  return result;
}

// The suites in the manifest's order.
export function suitesOf(m: Manifest): Array<string> {
  return Object.keys(m.suites);
}

export function isBrowser(sm: SuiteManifest): boolean {
  return !!sm.package;
}
