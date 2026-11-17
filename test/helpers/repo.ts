import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

export interface FakeCommit {
  date: string;
  subject: string;
  files?: Record<string, string>;
}

function run(cwd: string, args: Array<string>, date?: string): string {
  const env = Object.assign({}, process.env);
  if (date) {
    env.GIT_AUTHOR_DATE = date;
    env.GIT_COMMITTER_DATE = date;
  }
  return execFileSync("git", args, { cwd: cwd, env: env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

// A temporary repository with a commit per entry (in order, on one branch), refs/remotes/origin/<branch> at the last.
// Every commit has the root and the core package.json, so a build can be made at any of them.
export function repoWith(commits: Array<FakeCommit>, o: { branch?: string, coreDir?: string } = {}): string {
  const branch = o.branch || "master";
  const coreDir = o.coreDir || "packages/survey-core";
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-repo-"));
  run(dir, ["init", "--quiet", "--initial-branch=" + branch]);
  run(dir, ["config", "user.name", "test"]);
  run(dir, ["config", "user.email", "test@example.com"]);
  run(dir, ["config", "commit.gpgsign", "false"]);
  commits.forEach((c: FakeCommit, i: number) => {
    const files: Record<string, string> = {
      "package.json": JSON.stringify({ name: "fake-project", private: true }),
    };
    files[coreDir + "/package.json"] = JSON.stringify({ name: path.basename(coreDir), version: "1.0.0", scripts: { build: "true" } });
    files["file.txt"] = String(i);
    Object.assign(files, c.files || {});
    for (const f of Object.keys(files)) {
      fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
      fs.writeFileSync(path.join(dir, f), files[f]);
    }
    run(dir, ["add", "-A"]);
    run(dir, ["commit", "--quiet", "--allow-empty", "-m", c.subject], c.date);
  });
  run(dir, ["update-ref", "refs/remotes/origin/" + branch, "HEAD"]);
  return dir;
}
