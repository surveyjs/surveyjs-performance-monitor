// Which commits a run builds: the nightly's four from one point D0 (midnight UTC of the start day) on the project's
// branch, or an on-demand commit with its merge-base. The branch is always read as origin/<branch>, never bare.
import fs from "node:fs";
import { git } from "./util/git.ts";
import { InfraError } from "./errors.ts";

export type Role = "today" | "yesterday" | "week" | "month" | "branch" | "base";

export interface BuildSpec {
  role: Role;
  sha: string;
  // ISO date of the commit.
  date: string;
  sameAs?: Role;
}

const DAY = 86400000;
const NIGHTLY: Array<[Role, number]> = [["today", 0], ["yesterday", 1], ["week", 7], ["month", 30]];

function requireBranch(repo: string, branch: string): string {
  const ref = "origin/" + branch;
  let found = "";
  try {
    found = git(repo, ["rev-parse", "--verify", "-q", ref]);
  } catch(e) {
    found = "";
  }
  if (!found) throw new InfraError("no " + ref + " in the repo");
  return ref;
}

function spec(repo: string, role: Role, sha: string): BuildSpec {
  return { role: role, sha: sha, date: git(repo, ["log", "-1", "--format=%cI", sha, "--"]) };
}

function markSame(builds: Array<BuildSpec>): Array<BuildSpec> {
  builds.forEach((b: BuildSpec, i: number) => {
    const first = builds.slice(0, i).find((e: BuildSpec) => e.sha === b.sha);
    if (first) b.sameAs = first.role;
  });
  return builds;
}

export function nightlyBuilds(repo: string, start: Date, branch: string): Array<BuildSpec> {
  const ref = requireBranch(repo, branch);
  const d0 = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const builds: Array<BuildSpec> = [];
  for (const [role, days] of NIGHTLY) {
    const before = new Date(d0 - days * DAY).toISOString().replace(/\.\d+Z$/, "Z");
    const sha = git(repo, ["rev-list", "-1", "--first-parent", "--before=" + before, ref, "--"]);
    if (sha) builds.push(spec(repo, role, sha));
  }
  return markSame(builds);
}

export function onDemandBuilds(repo: string, sha: string, branch: string): Array<BuildSpec> {
  const ref = requireBranch(repo, branch);
  const full = git(repo, ["rev-parse", "--verify", sha + "^{commit}"]);
  const base = git(repo, ["merge-base", full, ref]);
  return markSame([spec(repo, "branch", full), spec(repo, "base", base)]);
}

// The first clone of the host's mirror, which keeps the branches in refs/remotes/origin/*: the mirror is only
// `origin`, its objects are copied, so the clone does not depend on the mirror staying mounted. `dir` is absent or empty.
export function cloneRepo(mirror: string, dir: string): void {
  if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0) throw new Error("clone target is not empty: " + dir);
  fs.mkdirSync(dir, { recursive: true });
  git(dir, ["init", "--quiet"]);
  git(dir, ["remote", "add", "origin", mirror]);
  git(dir, ["config", "--replace-all", "remote.origin.fetch", "+refs/remotes/origin/*:refs/remotes/origin/*"]);
  git(dir, ["config", "--add", "remote.origin.fetch", "+refs/tags/*:refs/tags/*"]);
  git(dir, ["fetch", "--quiet", "origin"]);
}
