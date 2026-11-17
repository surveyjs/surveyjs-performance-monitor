import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { parseCpuList } from "../../src/gate.ts";

// Whether a test can pin a process to these cores: Linux, taskset installed, and every core in this process's own
// affinity (a container or a CI runner may allow fewer cores than the machine has).
export function pinnable(cores: Array<number>): boolean {
  if (process.platform !== "linux") return false;
  try {
    execFileSync("taskset", ["-V"], { stdio: "ignore" });
    const m = /^Cpus_allowed_list:\s*(\S+)/m.exec(fs.readFileSync("/proc/self/status", "utf8"));
    const allowed = parseCpuList(m ? m[1] : "");
    return cores.every((c: number) => allowed.indexOf(c) > -1);
  } catch(e) {
    return false;
  }
}
