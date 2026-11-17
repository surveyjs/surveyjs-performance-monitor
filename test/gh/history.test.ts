import { describe, test, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { commitHistory } from "../../src/gh/history.ts";
import type { HistoryOptions } from "../../src/gh/history.ts";
import { git } from "../../src/util/git.ts";
import { repoWith } from "../helpers/repo.ts";

let tmp = "";
let origin = "";
let work = "";
let from1 = "";
let from2 = "";
let emptyDir = "";

const put = (root: string, file: string, text: string): void => {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), text);
};

// Clones origin, commits `file` on `history` (creating the branch if needed) and pushes.
function pushOther(originDir: string, file: string): void {
  const dir = fs.mkdtempSync(path.join(tmp, "other-"));
  git(tmp, ["clone", "-q", originDir, dir]);
  const id = ["-c", "user.name=other", "-c", "user.email=other@example.com"];
  let exists = true;
  try {
    git(dir, ["rev-parse", "--verify", "-q", "refs/remotes/origin/history"]);
  } catch(e) {
    exists = false;
  }
  if (exists) git(dir, ["checkout", "-q", "-B", "history", "origin/history"]);
  else {
    git(dir, ["checkout", "-q", "--orphan", "history"]);
    git(dir, ["rm", "-r", "-q", "-f", "."]);
  }
  put(dir, file, "x");
  git(dir, ["add", "-A"]);
  git(dir, id.concat(["commit", "-q", "-m", "other " + file]));
  git(dir, ["push", "-q", "origin", "history"]);
}

const opts = (from: string, run: string): HistoryOptions => ({ repo: work, from, branch: "history", message: "report survey-library/" + run });

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "perf-history-"));
  const src = repoWith([{ date: "2026-01-01T00:00:00Z", subject: "init" }]);
  origin = path.join(tmp, "origin.git");
  git(tmp, ["clone", "-q", "--bare", src, origin]);
  work = path.join(tmp, "work");
  git(tmp, ["clone", "-q", origin, work]);
  from1 = path.join(tmp, "from1");
  put(from1, "survey-library/run1/core.md", "one");
  from2 = path.join(tmp, "from2");
  put(from2, "survey-library/run2/core.md", "two");
  emptyDir = path.join(tmp, "empty");
  fs.mkdirSync(emptyDir);
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe("commitHistory", () => {
  test("the first report creates the branch with only the history files", async () => {
    expect(await commitHistory(opts(from1, "run1"))).toBe("committed");
    expect(git(origin, ["log", "history", "--format=%s"])).toBe("report survey-library/run1");
    expect(git(origin, ["ls-tree", "-r", "--name-only", "history"])).toBe("survey-library/run1/core.md");
    expect(git(origin, ["log", "history", "-1", "--format=%an <%ae>"])).toBe("github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>");
    expect(() => git(work, ["config", "--local", "user.name"])).toThrow();
    expect(git(work, ["worktree", "list"]).split("\n").length).toBe(1);
  });
  test("the next report adds its folder on top; the same files again change nothing", async () => {
    const o1 = opts(from1, "run1");
    const o2 = opts(from2, "run2");
    await commitHistory(o1);
    expect(await commitHistory(o2)).toBe("committed");
    expect(git(origin, ["ls-tree", "-r", "--name-only", "history"]).split("\n")).toEqual(["survey-library/run1/core.md", "survey-library/run2/core.md"]);
    expect(await commitHistory(o2)).toBe("unchanged");
    expect(git(origin, ["rev-list", "--count", "history"])).toBe("2");
  });
  test("a competing push: recommitted on the new tip", async () => {
    await commitHistory(opts(from1, "run1"));
    const slept: number[] = [];
    const res = await commitHistory({
      ...opts(from2, "run2"),
      sleep: async (ms: number) => { slept.push(ms); },
      beforePush: (n: number) => { if (n === 1) pushOther(origin, "other/x.md"); },
    });
    expect(res).toBe("committed");
    expect(slept).toEqual([15000]);
    expect(git(origin, ["ls-tree", "-r", "--name-only", "history"]).split("\n")).toEqual(["other/x.md", "survey-library/run1/core.md", "survey-library/run2/core.md"]);
  });
  test("nothing to add", async () => {
    expect(await commitHistory({ ...opts(from1, "run1"), from: emptyDir })).toBe("nothing");
    expect(() => git(origin, ["rev-parse", "--verify", "history"])).toThrow();
  });
  test("gives up after the tries", async () => {
    await expect(commitHistory({
      ...opts(from1, "run1"),
      tries: 2,
      sleep: async () => {},
      beforePush: () => pushOther(origin, "y" + Math.random() + ".md"),
    })).rejects.toThrow("push to history failed after 2 tries");
    expect(git(work, ["worktree", "list"]).split("\n").length).toBe(1);
  });
  test("two refused pushes on the orphan path: the push error, not a branch-name error", async () => {
    const hooks = path.join(origin, "hooks");
    fs.mkdirSync(hooks, { recursive: true });
    fs.writeFileSync(path.join(hooks, "pre-receive"), "#!/bin/sh\necho refused-by-hook >&2\nexit 1\n", { mode: 0o755 });
    const errs: string[] = [];
    const orig = console.error;
    console.error = (...a: unknown[]): void => { errs.push(a.join(" ")); };
    try {
      let msg = "";
      try {
        await commitHistory({ ...opts(from1, "run1"), tries: 2, sleep: async () => {} });
      } catch(e) {
        msg = (e as Error).message;
      }
      expect(msg).toContain("push to history failed after 2 tries");
      expect(msg).not.toContain("branch named");
      expect(errs.join("\n")).toContain("push to history failed (try 1): ");
      expect(errs.join("\n")).toContain("push to history failed (try 2): ");
      expect(errs.join("\n")).toContain("refused-by-hook");
    } finally {
      console.error = orig;
    }
    expect(git(work, ["branch", "--list", "h-*"])).toBe("");
    expect(git(work, ["worktree", "list"]).split("\n").length).toBe(1);
  });
  test("dot entries of from never reach the branch", async () => {
    put(from1, ".git", "gitdir: /elsewhere");
    put(from1, "survey-library/run1/.hidden", "x");
    await commitHistory(opts(from1, "run1"));
    expect(git(origin, ["ls-tree", "-r", "--name-only", "history"])).toBe("survey-library/run1/core.md");
  });
});
