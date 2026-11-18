import * as path from "node:path";
import * as fs from "node:fs";
import { execFileSync } from "node:child_process";
import { relPathOk } from "./project.ts";
import type { Project } from "./project.ts";

// The runner contract of the project's perf suites (perf/CONTRACT.md in survey-library): the versions this monitor
// reads, the manifest and the result file. The project writes these; the monitor only reads them.
export const knownContracts: Record<string, number> = { "survey-library": 2, creator: 1 };
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

// The variables a Creator manifest may name for the folder of a build.
export const TARGET_ENV: ReadonlyArray<string> = ["PERF_CORE_DIR", "PERF_LIB_UI_DIR", "PERF_CREATOR_CORE_DIR", "PERF_UI_DIR"];

// A build of the library that a Creator night needs (built in the sibling survey-library checkout).
export interface LibraryBuild { env: string, package: string, cwd: string, commands: Array<string>, dir: string, suites?: Array<string> }

// A build of the Creator's own package.
export interface CreatorBuild { env: string, cwd: string, install: Array<string>, commands: Array<string>, dir: string, src: Array<string>, bundles?: Array<string>, suites?: Array<string> }

export interface Manifest {
  product?: string;
  contract: number;
  resultSchema: number;
  suites: { [suite: string]: SuiteManifest };
  machine: MachineInfo;
  library?: { repo: string, layout: "sibling", builds: Array<LibraryBuild> };
  install?: Array<string>;
  builds?: Array<CreatorBuild>;
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

export type Command = { op: "install" } | { op: "run", script: string };

// A manifest command: exactly `npm install` or `npm run <script>`. Anything else is refused.
export function parseCommand(text: string): Command {
  if (text === "npm install") return { op: "install" };
  const m = /^npm run ((?!-)[A-Za-z0-9:._-]+)$/.exec(text);
  if (m) return { op: "run", script: m[1] };
  throw new Error("unsupported command: " + text);
}

// The product a project's runner must declare: "creator" for a project built on top of the library.
export function expectedProduct(p: Project): string {
  return p.library ? "creator" : "survey-library";
}

function strList(v: unknown): v is Array<string> {
  return Array.isArray(v) && v.every((x: unknown) => typeof x === "string");
}

function commandList(v: unknown, from: string, what: string): Array<string> {
  if (!strList(v)) throw new Error(from + ": " + what + " is malformed");
  for (const c of v) {
    try { parseCommand(c); } catch(e) { throw new Error(from + ": " + (e as Error).message); }
  }
  return v;
}

function suiteNames(v: unknown, known: Array<string>): boolean {
  return v === undefined || (strList(v) && v.every((s: string) => known.indexOf(s) >= 0));
}

const NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function checkCreator(obj: any, from: string): void {
  const known = Object.keys(obj.suites);
  const lib = obj.library;
  if (!lib || typeof lib !== "object" || typeof lib.repo !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(lib.repo) || lib.layout !== "sibling" || !Array.isArray(lib.builds)) {
    throw new Error(from + ": library is malformed");
  }
  const names: Array<string> = [];
  const envs: Array<string> = [];
  lib.builds.forEach((b: any, i: number) => {
    const what = "library.builds[" + i + "]";
    const ok = b && typeof b === "object" && TARGET_ENV.indexOf(b.env) >= 0 && typeof b.package === "string" && NAME_RE.test(b.package) && relPathOk(b.cwd) && relPathOk(b.dir) && strList(b.commands) && suiteNames(b.suites, known);
    if (!ok) throw new Error(from + ": " + what + " is malformed");
    commandList(b.commands, from, what + ".commands");
    names.push(b.package);
    envs.push(b.env);
  });
  commandList(obj.install, from, "install");
  if (!Array.isArray(obj.builds)) throw new Error(from + ": builds is malformed");
  obj.builds.forEach((b: any, i: number) => {
    const what = "builds[" + i + "]";
    const ok = b && typeof b === "object" && TARGET_ENV.indexOf(b.env) >= 0 && relPathOk(b.cwd) && NAME_RE.test(path.basename(b.cwd)) && relPathOk(b.dir) && strList(b.install) && strList(b.commands)
      && Array.isArray(b.src) && b.src.every((x: unknown) => relPathOk(x)) && (b.bundles === undefined || strList(b.bundles)) && suiteNames(b.suites, known);
    if (!ok) throw new Error(from + ": " + what + " is malformed");
    commandList(b.install, from, what + ".install");
    commandList(b.commands, from, what + ".commands");
    names.push(path.basename(b.cwd));
    envs.push(b.env);
  });
  // A build name is a folder and a log name; a target variable has one build; the core library build must exist.
  if (new Set(names).size !== names.length) throw new Error(from + ": builds are malformed");
  if (new Set(envs).size !== envs.length || envs.indexOf("PERF_CORE_DIR") < 0) throw new Error(from + ": builds are malformed");
}

// Reads a manifest as the product's contract: the product first, then the contract and the schema, then the suites.
export function checkManifest(m: unknown, from: string, product: string = "survey-library"): Manifest {
  const obj = m as Partial<Manifest> | null;
  if (!obj || typeof obj !== "object") throw new Error(from + ": the manifest is not an object");
  const declared = obj.product || "survey-library";
  if (declared !== product) throw new Error(from + ": product " + declared + ", the project expects " + product);
  const known = knownContracts[product];
  if (obj.contract !== known) throw new Error(from + ": runner contract " + obj.contract + ", monitor knows " + known);
  if (obj.resultSchema !== knownResultSchema) throw new Error(from + ": result schema " + obj.resultSchema + ", monitor reads " + knownResultSchema);
  if (!obj.suites || typeof obj.suites !== "object" || Object.keys(obj.suites).length === 0) throw new Error(from + ": the manifest has no suites");
  for (const [name, sm] of Object.entries(obj.suites)) {
    const ok = sm && Array.isArray(sm.ids) && typeof sm.cwd === "string" && typeof sm.script === "string" && Array.isArray(sm.args);
    if (!ok) throw new Error(from + ": suite " + name + " is malformed");
  }
  if (product === "creator") checkCreator(obj, from);
  return obj as Manifest;
}

// runner: the checkout whose tests run. Its perf/manifest.ts prints the manifest; it needs no build.
export function loadManifest(runner: string, product: string = "survey-library"): Manifest {
  const script = path.join(runner, "perf", "manifest.ts");
  const out = execFileSync(process.execPath, [script], { cwd: runner, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return checkManifest(JSON.parse(out), script, product);
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

// A browser suite: it names a package, or its script is Playwright's CLI.
export function isBrowser(sm: SuiteManifest): boolean {
  return !!sm.package || sm.script.endsWith("@playwright/test/cli.js");
}
