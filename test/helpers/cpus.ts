import fs from "node:fs";
import { execFileSync } from "node:child_process";

// A cpu list like "0-2,5" as the cores it names.
function parseCpuList(text: string | undefined): Array<number> {
  const res: Array<number> = [];
  (text || "").split(",").map((s: string) => s.trim()).filter((s: string) => !!s).forEach((part: string) => {
    const m = /^(\d+)(?:-(\d+))?$/.exec(part);
    if (!m) throw new Error("not a cpu list: " + text);
    const from = Number(m[1]);
    const to = m[2] === undefined ? from : Number(m[2]);
    for (let i = from; i <= to; i++) res.push(i);
  });
  return res;
}

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
