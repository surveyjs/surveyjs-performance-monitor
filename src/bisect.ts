import { git } from "./util/git.ts";
import type { Measure, BisectResult } from "./judge/bisect-step.ts";
import { bisect } from "./judge/bisect-step.ts";
import type { BisectReport } from "./discord.ts";
import type { CommitPr } from "./pr.ts";
import { prOf } from "./pr.ts";
import type { KnownEntry } from "./judge/known.ts";

// The search for the first bad commit (05, D16) with 04's bisect step rule: the range lastOkCommit..current over
// first-parent master, a time budget for the night, and the PR of the first bad commit.
export class BudgetError extends Error {
  constructor() {
    super("bisect budget used up");
  }
}

// [good, ...the first-parent commits after it, up to bad], oldest first; refused when good is not an ancestor of bad.
export function firstParentRange(repo: string, good: string, bad: string): Array<string> {
  try {
    git(repo, ["merge-base", "--is-ancestor", good, bad]);
  } catch(e) {
    throw new RangeError(good.substring(0, 9) + " is not an ancestor of " + bad.substring(0, 9));
  }
  const list = git(repo, ["rev-list", "--first-parent", "--reverse", good + ".." + bad]).split(/\r?\n/).filter((s: string) => !!s);
  return [git(repo, ["rev-parse", good])].concat(list);
}

export function commitPr(repo: string, sha: string): CommitPr {
  const text = git(repo, ["log", "-1", "--format=%H%x00%s%x00%b", sha]);
  const [full, subject, body] = text.split("\u0000");
  return prOf(full, subject, body);
}

// The commits of a range as PRs, newest first, for the post's commit list.
export function rangePrs(repo: string, from: string | null, to: string, max: number = 200): Array<CommitPr> {
  if (!from) return [];
  let text = "";
  try {
    text = git(repo, ["log", "--first-parent", "-n", String(max), "--format=%H%x00%s%x00%b%x01", from + ".." + to]);
  } catch(e) {
    return [];
  }
  return text.split("\u0001").map((s: string) => s.replace(/^\r?\n/, "")).filter((s: string) => !!s.trim()).map((s: string) => {
    const [full, subject, body] = s.split("\u0000");
    return prOf(full.trim(), subject, body);
  });
}

export interface SearchOptions {
  suite: string;
  id: string;
  reference: number;
  tolerance: number;
  counter?: boolean;
  depsDiff?: string;
  // Epoch ms; past it, the next measurement throws BudgetError.
  deadline: number;
  now?: () => number;
  // The PR of a commit (git in nightly.ts, a table in the test).
  prOf: (sha: string) => CommitPr;
}

// Runs the step rule over commits with a budget, and turns the outcome into the bisect post's report.
export async function search(commits: Array<string>, measure: Measure, options: SearchOptions): Promise<BisectReport> {
  const now = options.now || Date.now;
  const start = now();
  const timed: Measure = async(commit: string): Promise<number | null> => {
    if (now() > options.deadline) throw new BudgetError();
    return measure(commit);
  };
  const base = { suite: options.suite, id: options.id };
  const minutes = (): number => (now() - start) / 60000;
  if (commits.length < 2) return Object.assign(base, { status: "not-in-range" as const, message: "empty range", durationMin: minutes() });
  let res: BisectResult;
  try {
    res = await bisect(commits, timed, { reference: options.reference, tolerance: options.tolerance, counter: options.counter, depsDiff: options.depsDiff });
  } catch(e: any) {
    if (e instanceof BudgetError) return Object.assign(base, { status: "timed out" as const, message: "bisect timed out (40 min a night)", durationMin: minutes() });
    return Object.assign(base, { status: "error" as const, message: String(e && e.message ? e.message : e).split("\n")[0], durationMin: minutes() });
  }
  const report: BisectReport = Object.assign(base, { status: res.result, message: res.message, result: res, durationMin: minutes() });
  if (res.firstBad && (res.result === "found" || res.result === "narrowed")) report.firstBad = options.prOf(res.firstBad);
  return report;
}

// A bisect that ends in an error or a timeout is tried again on later nights, at most this many times in all.
export const maxBisectAttempts = 2;

// A known.json entry a night bisects: a new one, or one a past night skipped.
export function bisectDue(entry: KnownEntry): boolean {
  return !entry.bisect || entry.bisect === "skipped";
}

// The known.json bisect field after a report; "covered" for a candidate another bisect of the night stands for. A
// budget skip is not an attempt: the bisect did not start.
export function markBisect(entry: KnownEntry, status: BisectReport["status"] | "covered"): void {
  if (status === "found") entry.bisect = "done";
  else if (status === "narrowed" || status === "not-reproduced" || status === "not-in-range" || status === "covered") entry.bisect = status;
  else if (status === "skipped (budget)") entry.bisect = "skipped";
  else {
    entry.bisectAttempts = (entry.bisectAttempts || 0) + 1;
    entry.bisect = entry.bisectAttempts >= maxBisectAttempts ? "failed" : "skipped";
  }
}
