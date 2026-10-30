import * as fs from "node:fs";
import { writeJsonAtomic } from "../util/json.ts";

// The runner contract of survey-library (perf/CONTRACT.md there): the versions this server reads, the suites, the
// result file and the scenario id grammar. survey-library writes these files; the server only reads and annotates them.
export const knownContract = 1;
export const knownResultSchema = 1;

export type Suite = "core" | "react" | "survey-js-ui";
export const SUITES: ReadonlyArray<Suite> = ["core", "react", "survey-js-ui"];

export type CounterKind = "work" | "dom";

export interface CounterValue {
  value: number | null;
  kind: CounterKind;
}

export type Counters = { [name: string]: CounterValue };

export interface CalibrationResult {
  median: number;
  before: number;
  after: number;
}

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

export interface DepsInfo {
  fingerprint: string | null;
  versions: { [name: string]: string };
}

export interface ResultEntry {
  id: string;
  rev: number;
  unit: "ms";
  samples: Array<number>;
  median: number;
  min: number;
  max: number;
  mad: number;
  calibration: CalibrationResult;
  phases?: { [phase: string]: { median: number, min: number } };
  counters: Counters;
  info: { [name: string]: any };
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
  schema: 1;
  suite: Suite;
  kind: string;
  label: string;
  ref: string | null;
  commit: string | null;
  previousCommit: string | null;
  date: string;
  requested: { only: Array<string> | null, notInSuite: Array<string> };
  incomplete: { reason: "timeout" | "killed", unrun: Array<string> } | null;
  build: { core: BuildPart, ui?: BuildPart, deps: DepsInfo };
  machine: MachineInfo;
  // null from the runner; the server writes the host load here (annotate).
  environment: any;
  fixtures: { [key: string]: { hash: string, dataHash?: string, options: any } };
  skipped: Array<{ id: string, reason: string }>;
  // Scenarios that threw (a check, a warning, jsonErrors on the runner's build); compare sees them as missing.
  failed: Array<{ id: string, error: string }>;
  results: Array<ResultEntry>;
}

export function readResult(file: string): ResultFile {
  const result = JSON.parse(fs.readFileSync(file, "utf8"));
  if (result.schema !== knownResultSchema) throw new Error(file + ": result file schema " + result.schema + ", this server reads " + knownResultSchema);
  return result;
}

// The night writes the environment block after the suite.
export function annotate(file: string, environment: any): ResultFile {
  const result = readResult(file);
  result.environment = environment;
  writeJsonAtomic(file, result);
  return result;
}

// <fixture>/<group>/<operation>[@<question>]: the fixture is everything before the group, so "extra/<name>" too.
export function fixtureOfId(id: string): string {
  const parts = id.split("/");
  if (parts.length < 3) throw new Error("Not a scenario id: " + id);
  return parts.slice(0, -2).join("/");
}
