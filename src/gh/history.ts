import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { git } from "../util/git.ts";
import { InfraError } from "../errors.ts";

export interface HistoryOptions {
  repo: string;
  from: string;
  branch: string;
  message: string;
  tries?: number;
  sleep?: (ms: number) => Promise<void>;
  beforePush?: (attempt: number) => void;
}

const WAIT_MS = 15000;
const IDENTITY = ["-c", "user.name=github-actions[bot]", "-c", "user.email=41898282+github-actions[bot]@users.noreply.github.com"];

function hasFiles(dir: string): boolean {
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir, { withFileTypes: true }).some((e: fs.Dirent) => (e.isDirectory() ? hasFiles(path.join(dir, e.name)) : true));
}

function removeWorktree(repo: string, dir: string): void {
  try {
    git(repo, ["worktree", "remove", "--force", dir]);
  } catch(e) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      git(repo, ["worktree", "prune"]);
    } catch(e2) {
      // nothing more to clean up
    }
  }
}

function pushError(e: unknown): string {
  const err = e as { stderr?: unknown, message?: string };
  const text = err && err.stderr ? String(err.stderr) : String((err && err.message) || e);
  return text.trim();
}

// Commits the files of `from` (laid out as <project>/<run id>/...) to the branch of repo's origin, an orphan branch
// that holds only these files, and pushes it. A push that loses to another run is tried again on the new tip, up to
// `tries` times with a growing wait. Returns "nothing" when `from` has no files, "unchanged" when the branch already
// holds them, "committed" when a commit was pushed.
export async function commitHistory(o: HistoryOptions): Promise<"committed" | "unchanged" | "nothing"> {
  if (!hasFiles(o.from)) return "nothing";
  const tries = o.tries === undefined ? 6 : o.tries;
  const sleep = o.sleep || ((ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms)));
  let lastError = "";
  for (let n = 1; n <= tries; n++) {
    const wt = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "perf-history-wt-")), "wt");
    let added = false;
    const tmpBranch = "h-" + process.pid + "-" + n;
    try {
      let remote = true;
      try {
        git(o.repo, ["fetch", "-q", "origin", "+refs/heads/" + o.branch + ":refs/remotes/origin/" + o.branch]);
      } catch(e) {
        remote = false;
      }
      if (remote) git(o.repo, ["worktree", "add", "-q", "--detach", wt, "origin/" + o.branch]);
      else git(o.repo, ["worktree", "add", "-q", "--detach", wt, "HEAD"]);
      added = true;
      if (!remote) {
        git(wt, ["checkout", "-q", "--orphan", tmpBranch]);
        git(wt, ["rm", "-r", "-q", "-f", "--ignore-unmatch", "."]);
      }
      fs.cpSync(o.from, wt, { recursive: true, filter: (src: string): boolean => src === o.from || !path.basename(src).startsWith(".") });
      git(wt, ["add", "-A"]);
      let changed = false;
      try {
        git(wt, ["diff", "--cached", "--quiet"]);
      } catch(e) {
        changed = true;
      }
      if (!changed) return "unchanged";
      git(wt, IDENTITY.concat(["commit", "-q", "-m", o.message]));
      if (o.beforePush) o.beforePush(n);
      try {
        git(wt, ["push", "-q", "origin", "HEAD:refs/heads/" + o.branch]);
        return "committed";
      } catch(e) {
        // lost the race (or the push was refused); try again on the new tip
        lastError = pushError(e);
        console.error(lastError.split("\n").slice(0, 5).map((l: string, i: number) => (i === 0 ? "push to history failed (try " + n + "): " : "") + l).join("\n"));
      }
    } finally {
      if (added) removeWorktree(o.repo, wt);
      try {
        git(o.repo, ["branch", "-D", tmpBranch]);
      } catch(e) {
        // not created, or already gone
      }
      fs.rmSync(path.dirname(wt), { recursive: true, force: true });
    }
    if (n < tries) await sleep(n * WAIT_MS);
  }
  throw new InfraError("push to " + o.branch + " failed after " + tries + " tries" + (lastError ? ": " + lastError.split("\n")[0] : ""));
}
