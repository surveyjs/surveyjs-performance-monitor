import fs from "node:fs";
import path from "node:path";
import type { Npm } from "../../src/builds.ts";

// A fake npm: installs do nothing, `build` and `compile` write <dir>/build/package.json. A dir that ends with one of
// `failRun` fails its runs (and leaves a log line).
export function fakeNpm(o: { failRun?: string[] } = {}): Npm {
  const fail = o.failRun || [];
  return {
    async install(): Promise<void> {
      // nothing to install
    },
    async run(dir: string, script: string, logFile: string): Promise<boolean> {
      fs.mkdirSync(path.dirname(logFile), { recursive: true });
      fs.appendFileSync(logFile, "ran " + script + "\n");
      if (fail.some((s: string) => dir.endsWith(s))) return false;
      if (script === "build" || script === "compile") {
        fs.mkdirSync(path.join(dir, "build"), { recursive: true });
        fs.writeFileSync(path.join(dir, "build", "package.json"), "{}");
      }
      return true;
    },
  };
}
