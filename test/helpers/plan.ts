import path from "node:path";
import { loadManifest } from "../../src/contract.ts";
import { jobsOf } from "../../src/gh/plan.ts";
import type { RunPlan } from "../../src/gh/plan.ts";
import type { BuildSpec } from "../../src/versions.ts";

const fakeRunner = path.resolve(import.meta.dirname, "../fixtures/fake-runner");

// A RunPlan for the fake runner: the nightly's four builds, every suite of the manifest, 5 repeats.
export function fakePlan(over: Partial<RunPlan> = {}): RunPlan {
  const manifest = loadManifest(fakeRunner);
  const suites = Object.keys(manifest.suites);
  const specs: BuildSpec[] = [
    { role: "today", sha: "1".repeat(40), date: "2026-11-16T12:00:00Z" },
    { role: "yesterday", sha: "2".repeat(40), date: "2026-11-15T12:00:00Z" },
    { role: "week", sha: "3".repeat(40), date: "2026-11-09T12:00:00Z" },
    { role: "month", sha: "4".repeat(40), date: "2026-10-17T12:00:00Z" },
  ];
  return Object.assign({
    project: "survey-library",
    kind: "nightly",
    start: "2026-11-17T01:00:00.000Z",
    runId: "20261117T010000-" + "5".repeat(7) + "-nightly",
    runnerSha: "5".repeat(40),
    repeats: 5,
    specs: specs,
    manifest: manifest,
    suites: suites,
    jobs: jobsOf(manifest, suites.map((s: string) => ({ suite: s, only: null }))),
  } as RunPlan, over);
}
