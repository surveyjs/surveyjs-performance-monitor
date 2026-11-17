import { execFileSync } from "node:child_process";

// stdout of `git <args>` in cwd, trimmed; a failing git throws.
export function git(cwd: string, args: Array<string>): string {
  return execFileSync("git", args, { cwd: cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}
