// The gate and the load arithmetic (src/gate.ts): the tests moved from v1's nightly.test.ts without changes, plus the
// quiet-run case.
import { describe, test, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { parseProcStat, busyCores, parseCpuList, parseLoadLine, environmentOf, gateStep, intervalsOf } from "../src/gate.ts";

// /proc/stat lines: user nice system idle iowait irq softirq steal guest guest_nice (jiffies).
const stat = (rows: Array<Array<number>>): string => rows.map((r: Array<number>, i: number) => "cpu" + i + " " + r.join(" ")).join("\n");
const line = (t: number, rows: Array<Array<number>>, usageUsec: number | null, oom: number = 0): string =>
  JSON.stringify({ t: t, cpu: stat(rows).split("\n"), usage_usec: usageUsec, oom_kill: oom });

describe("gate.ts", () => {
  test("busy is user+nice+system+irq+softirq+steal; guest is inside user; iowait is idle", () => {
    const a = parseProcStat("cpu  1 2 3 4\n" + stat([[100, 0, 0, 900, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1000, 0, 0, 0, 0, 0, 0]]));
    // cpu0: +50 user of which 40 guest, +50 idle -> 0.5 busy; cpu1: +50 iowait, +50 idle -> 0 busy.
    const b = parseProcStat(stat([[150, 0, 0, 950, 0, 0, 0, 0, 40, 0], [0, 0, 0, 1050, 50, 0, 0, 0, 0, 0]]));
    expect(busyCores(a, b)).toBeCloseTo(0.5);
    expect(busyCores(a, b, [1])).toBe(0);
    const c = parseProcStat(stat([[150, 10, 10, 950, 0, 10, 10, 10, 40, 0], [0, 0, 0, 1050, 50, 0, 0, 0, 0, 0]]));
    expect(busyCores(b, c, [0])).toBe(1);
    expect(parseCpuList("2-4,7")).toEqual([2, 3, 4, 7]);
    expect(() => parseCpuList("2-x")).toThrow();
  });
  test("other work on the pinned cores, elsewhere, the busiest minute, oom kills", () => {
    // 4 cpus, cpus 2-3 pinned. Every 5 s each cpu has 500 jiffies. The container uses 1.5 cores.
    const lines: Array<string> = [];
    let usage = 0;
    const acc = [[0, 0], [0, 0], [0, 0], [0, 0]];
    for (let k = 0; k <= 36; k++) {
      // From 60 s to 120 s someone else uses 0.5 core on cpu 3 and 1.5 cores on cpus 0-1.
      const busy = k > 12 && k <= 24 ? [375, 375, 500, 500] : [0, 0, 500, 250];
      if (k > 0) {
        busy.forEach((b: number, i: number) => { acc[i][0] += b; acc[i][1] += 500 - b; });
        usage += 1.5 * 5 * 1e6;
      }
      lines.push(line(1000 + k * 5, acc.map((x: Array<number>) => [x[0], 0, 0, x[1], 0, 0, 0, 0, 0, 0]), usage, k > 30 ? 1 : 0));
    }
    const samples = lines.map(parseLoadLine).filter((s: any) => !!s) as any;
    const iv = intervalsOf(samples, [2, 3]);
    expect(iv[0].ours).toBeCloseTo(1.5);
    expect(iv[0].otherPinned).toBeCloseTo(0);
    expect(iv[14].otherPinned).toBeCloseTo(0.5);
    expect(iv[14].otherElsewhere).toBeCloseTo(1.5);
    const quiet = environmentOf(samples, { from: 1000, to: 1060, pinned: [2, 3] });
    expect(quiet.noisy).toBe(false);
    expect(quiet.oomKills).toBe(0);
    const env = environmentOf(samples, { from: 1000, to: 1180, pinned: [2, 3] });
    expect(env.noisy).toBe(true);
    expect(env.noisyReasons.length).toBe(2);
    expect(env.busiestMinutePinned).toBeCloseTo(0.5);
    expect(env.otherCoresPinned).toBeLessThan(0.25);
    expect(env.oomKills).toBe(1);
    // One 0.6-core burst of 5 s at the very end of a 3-minute suite is diluted like one in the middle.
    const burst = (at: number): any => {
      const out: Array<string> = [];
      const cpu = [[0, 0], [0, 0], [0, 0], [0, 0]];
      let used = 0;
      for (let k = 0; k <= 36; k++) {
        const b = [0, 0, 500, k === at ? 300 : 0];
        if (k > 0) {
          b.forEach((x: number, i: number) => { cpu[i][0] += x; cpu[i][1] += 500 - x; });
          used += 5 * 1e6;
        }
        out.push(line(2000 + k * 5, cpu.map((x: Array<number>) => [x[0], 0, 0, x[1], 0, 0, 0, 0, 0, 0]), used));
      }
      return environmentOf(out.map(parseLoadLine) as any, { from: 2000, to: 2180, pinned: [2, 3] });
    };
    expect([burst(18).noisy, burst(36).noisy]).toEqual([false, false]);
    expect(burst(36).busiestMinutePinned).toBeCloseTo(burst(18).busiestMinutePinned);
    expect(environmentOf([], { from: 0, to: 1, pinned: [] }).noisy).toBe(false);
    expect(environmentOf([], { from: 0, to: 1, pinned: [], requireSamples: true }).noisyReasons).toEqual(["no load samples"]);
    expect(environmentOf([], { from: 0, to: 1, pinned: [], gate: { ok: false, reason: "gate-timeout", waitMin: 60 } }).noisyReasons).toEqual(["gate-timeout"]);
  });
  test("saved real /proc/stat and cpu.stat samples, as run.sh's sampler writes them", () => {
    const text = fs.readFileSync(path.join(__dirname, "testdata", "proc-stat-linux.txt"), "utf8");
    const samples = text.split("=== sample ").slice(1).map((block: string, k: number) => {
      // run.sh: grep '^cpu[0-9]' /proc/stat (not the "cpu " total line), sed -n 's/^usage_usec //p' cpu.stat.
      const lines = block.split(/\r?\n/);
      const cpus = lines.filter((l: string) => /^cpu[0-9]/.test(l));
      const usage = Number(lines.filter((l: string) => /^usage_usec /.test(l))[0].split(" ")[1]);
      return parseLoadLine(JSON.stringify({ t: 100 + k * 5.02, cpu: cpus, usage_usec: usage, oom_kill: null }))!;
    });
    expect(Object.keys(samples[0].cpus)).toEqual(["0", "1", "2", "3"]);
    expect(samples[1].cpus[3]).toEqual({ user: 3, nice: 0, system: 40, idle: 977, iowait: 4, irq: 0, softirq: 2, steal: 0, guest: 0, guestNice: 0 });
    // cpu3: busy 36 -> 45 of total 529 -> 1026; cpu0 4 of 498; cpu1 1 of 499; cpu2 0.
    expect(busyCores(samples[0].cpus, samples[1].cpus, [3])).toBeCloseTo(9 / 497, 5);
    expect(busyCores(samples[0].cpus, samples[1].cpus)).toBeCloseTo(9 / 497 + 4 / 498 + 1 / 499, 5);
    const iv = intervalsOf(samples, [2, 3]);
    expect(iv[0].ours).toBeCloseTo(748000 / 1e6 / 5.02, 5);
    expect(iv[0].otherPinned).toBe(0);
    expect(iv[0].otherElsewhere).toBeCloseTo(4 / 498 + 1 / 499, 5);
  });
  test("the gate waits for 5 quiet minutes and gives up after 60", () => {
    const o = { maxBusy: 1, quietMin: 5, maxMin: 60 };
    const s = { start: 0, quietSince: null };
    expect(gateStep(s, 0.5, 10, o).done).toBe(false);
    expect(gateStep(s, 2, 20, o).done).toBe(false);
    expect(gateStep(s, 0.5, 30, o).done).toBe(false);
    expect(gateStep(s, 0.5, 329, o).done).toBe(false);
    expect(gateStep(s, 0.5, 330, o)).toEqual({ done: true, ok: true, waitMin: 5.5 });
    const busy = { start: 0, quietSince: null };
    expect(gateStep(busy, 3, 3600, o)).toEqual({ done: true, ok: false, reason: "gate-timeout", waitMin: 60 });
  });
  test("a quiet run is not noisy", () => {
    // 4 cpus, 500 jiffies each per 5 s. cpu0 (pinned) is busy 0.1 core, the container uses exactly that; cpu2 is busy 0.2
    // core elsewhere; cpu1 and cpu3 are idle.
    const quiet = Array.from({ length: 12 }, (_: unknown, k: number) =>
      parseLoadLine(line(1000 + k * 5, [[50 * k, 0, 0, 450 * k, 0, 0, 0, 0, 0, 0], [0, 0, 0, 500 * k, 0, 0, 0, 0, 0, 0],
        [100 * k, 0, 0, 400 * k, 0, 0, 0, 0, 0, 0], [0, 0, 0, 500 * k, 0, 0, 0, 0, 0, 0]], k * 500000))!);
    const env = environmentOf(quiet, { from: 1000, to: 1055, pinned: [0, 1], gate: { ok: true, waitMin: 5 }, requireSamples: true });
    expect(env.noisy).toBe(false);
    expect(env.noisyReasons).toEqual([]);
    expect(env.gateWaitMin).toBe(5);
    expect(env.otherCoresPinned).toBe(0);
    expect(env.otherCoresElsewhere).toBeCloseTo(0.2, 2);
  });
});
