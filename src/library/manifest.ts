import * as path from "node:path";
import { execFileSync } from "node:child_process";
import type { Suite, MachineInfo } from "./contract.ts";
import { SUITES, knownContract, knownResultSchema } from "./contract.ts";

// The suites of a survey-library checkout, from its `node perf/manifest.ts` (perf/CONTRACT.md there): ids, budgets, how
// to run each suite, the UI packages, and the machine key of this process.
export interface SuiteManifest {
  ids: Array<string>;
  budgetMin: number;
  // Relative to the checkout root: `node <script> ...args` in cwd.
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
  calibrationOnlyId: string;
  suites: { [suite: string]: SuiteManifest };
  machine: MachineInfo;
}

export function checkManifest(m: any, from: string): Manifest {
  if (!m || m.contract !== knownContract) throw new Error(from + ": runner contract " + (m ? m.contract : m) + ", this server knows " + knownContract);
  if (m.resultSchema !== knownResultSchema) throw new Error(from + ": result file schema " + m.resultSchema + ", this server reads " + knownResultSchema);
  SUITES.forEach((s: Suite) => {
    if (!m.suites || !m.suites[s]) throw new Error(from + ": the manifest has no suite " + s);
  });
  return m;
}

// runner: the survey-library checkout whose tests run (the tool on the server, the working copy in a local run).
export function loadManifest(runner: string, env: NodeJS.ProcessEnv = process.env): Manifest {
  const out = execFileSync(process.execPath, [path.join(runner, "perf", "manifest.ts")], { cwd: runner, env: env, encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"] });
  return checkManifest(JSON.parse(out), path.join(runner, "perf", "manifest.ts"));
}

export function parseOnly(text: string | undefined): Array<string> | null {
  if (!text) return null;
  const list = text.split(",").map((s: string) => s.trim()).filter((s: string) => !!s);
  return list.length > 0 ? list : null;
}

export function isExtraId(id: string): boolean {
  return id.indexOf("extra/") === 0;
}

export function idsOfSuite(m: Manifest, suite: Suite): Array<string> {
  return m.suites[suite].ids.slice().sort();
}

export function suitesOf(m: Manifest, id: string): Array<Suite> {
  return SUITES.filter((s: Suite) => m.suites[s].ids.indexOf(id) > -1);
}

// --only as the runner splits PERF_ONLY: an id in no suite is an error; a suite runs the ids it has and lists the
// others as notInSuite; extra/* ids belong to the core suite of a local run.
export function splitOnly(m: Manifest, only: ReadonlyArray<string> | null, suite: Suite): { run: Array<string>, notInSuite: Array<string> } {
  const all = idsOfSuite(m, suite);
  if (!only) return { run: all, notInSuite: [] };
  const unknown = only.filter((id: string) => !isExtraId(id) && suitesOf(m, id).length === 0);
  if (unknown.length > 0) throw new Error("PERF_ONLY names ids that are in no suite: " + unknown.join(", "));
  const run = only.filter((id: string) => all.indexOf(id) > -1 || (suite === "core" && isExtraId(id)));
  const notInSuite = only.filter((id: string) => run.indexOf(id) < 0);
  return { run: Array.from(new Set(run)).sort(), notInSuite: Array.from(new Set(notInSuite)).sort() };
}

// The UI package of a browser suite, as survey-library names its folder under packages/.
export function packageOf(m: Manifest, suite: Suite): string {
  const p = m.suites[suite].package;
  if (!p) throw new Error("the manifest names no package for " + suite);
  return p;
}

// The package folders a UI build reads, for "did the UI sources change" between two commits.
export function uiSourceDirs(m: Manifest, suite: Suite): Array<string> {
  return Array.from(new Set((m.suites[suite].src || []).map((s: string) => s.split("/").slice(0, 2).join("/") + "/")));
}
