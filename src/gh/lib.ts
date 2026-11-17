// Git helpers of the GitHub workflow: the plan job clones the library without blobs, a measuring job fetches one commit.
import * as fs from "node:fs";
import { git } from "../util/git.ts";
import { InfraError } from "../errors.ts";

function errorLines(e: unknown): string {
  const err = e as { stderr?: string | Buffer, message?: string };
  const text = (err.stderr ? String(err.stderr) : "") || err.message || String(e);
  return text.split("\n").map((l: string) => l.trim()).filter((l: string) => l).join("; ");
}

// A blobless clone of `url` into `dir` without a checkout: all commits and trees, blobs on demand.
export function cloneBlobless(url: string, dir: string): void {
  try {
    git(process.cwd(), ["clone", "--filter=blob:none", "--no-checkout", "--quiet", "--", url, dir]);
  } catch(e) {
    throw new InfraError("clone of " + url + " failed: " + errorLines(e));
  }
}

// An empty repository in `dir` that has the one commit `sha` of `url` (depth 1), not checked out.
export function fetchCommit(url: string, sha: string, dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
  git(dir, ["init", "-q"]);
  git(dir, ["fetch", "-q", "--depth", "1", "--", url, sha]);
}

// The commit `sha` of `url` checked out (detached) in `dir`.
export function checkoutAt(url: string, sha: string, dir: string): void {
  fetchCommit(url, sha, dir);
  git(dir, ["checkout", "-q", "--detach", sha]);
}
