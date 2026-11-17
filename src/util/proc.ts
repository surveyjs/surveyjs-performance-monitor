import * as fs from "node:fs";
import * as path from "node:path";
import { spawn } from "node:child_process";

// Runs a command with stdout and stderr appended to a log file, its first line `$ cmd args (in cwd)`. No time limit;
// `signal` goes to spawn: an abort sends the child SIGTERM.
export function runLogged(cmd: string, args: Array<string>, o: { cwd: string, env?: NodeJS.ProcessEnv, logFile: string, signal?: AbortSignal }): Promise<{ code: number | null }> {
  fs.mkdirSync(path.dirname(o.logFile), { recursive: true });
  const out = fs.openSync(o.logFile, "a");
  fs.writeSync(out, "$ " + cmd + " " + args.join(" ") + "   (in " + o.cwd + ")\n");
  return new Promise((resolve: (r: { code: number | null }) => void) => {
    const proc = spawn(cmd, args, { cwd: o.cwd, env: o.env || process.env, stdio: ["ignore", "pipe", "pipe"], signal: o.signal });
    const write = (d: Buffer): void => { fs.writeSync(out, d); };
    proc.stdout.on("data", write);
    proc.stderr.on("data", write);
    proc.on("error", (e: Error) => {
      // An abort is reported through "close"; any other error (no such program) lands in the log.
      if (e.name !== "AbortError") fs.writeSync(out, String(e) + "\n");
    });
    proc.on("close", (code: number | null) => {
      fs.closeSync(out);
      resolve({ code: code });
    });
  });
}
