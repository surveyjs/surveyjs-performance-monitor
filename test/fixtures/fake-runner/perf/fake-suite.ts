import * as fs from "node:fs";
import * as path from "node:path";
import { suites } from "./suites.ts";

// A stand-in for a project's suite (perf/CONTRACT.md, "Running a suite"): `node perf/fake-suite.ts <suite>`.
// It writes PERF_RESULT_FILE from FAKE_RESULTS_JSON[PERF_TARGET_COMMIT] (overrides of a default result; an entry
// { "exit": N } writes nothing and exits with N; "sleepMs" and "median" are read, not written; a key named after a
// suite holds overrides for that suite only; the commit "*" applies to every commit; "onlyMedian" is the median when
// PERF_ONLY is set, as in a second run of a few scenarios), with kind = PERF_KIND,
// build.core.dir = PERF_CORE_DIR and a `fake` block: the cpus it may run on, the runner root it was started from, and
// `env`: the values of PERF_CREATOR_CORE_DIR, PERF_LIB_UI_DIR, PERF_UI_DIR and PERF_LIB_COMMIT that are set.
// FAKE_SLEEP_MS (or the entry's sleepMs): it waits first; SIGTERM then writes `incomplete` and exits with 143, as the
// real runner does. A browser suite writes PERF_TARGET_COMMIT to <runner>/perf/results/.cache/bundle at its start and
// reads it back at its end: another value there means another job swapped the bundle under it ("bundle swapped").
// FAKE_TRACE: a file to append one JSON line per start and end to.
const suite = process.argv[2];
const env = process.env;
const runner = path.resolve(import.meta.dirname, "..");
const commit = env.PERF_TARGET_COMMIT || "";
const map = env.FAKE_RESULTS_JSON ? JSON.parse(env.FAKE_RESULTS_JSON) : {};
const pick = (e: { [key: string]: unknown } | undefined): { [key: string]: unknown } => {
  const res = Object.assign({}, e || {});
  for (const s of Object.keys(suites)) delete res[s];
  return Object.assign(res, (e || {})[suite] || {});
};
const entry = Object.assign(pick(map["*"]), pick(map[commit]));
const all = suites[suite].ids;
const ids = env.PERF_ONLY ? env.PERF_ONLY.split(",").filter((id: string) => all.indexOf(id) > -1) : all;

function cpus(): string | null {
  try {
    const m = /^Cpus_allowed_list:\s*(\S+)/m.exec(fs.readFileSync("/proc/self/status", "utf8"));
    return m ? m[1] : null;
  } catch(e) {
    return null;
  }
}

function trace(event: string): void {
  if (!env.FAKE_TRACE) return;
  fs.appendFileSync(env.FAKE_TRACE, JSON.stringify({ t: Date.now(), event: event, suite: suite, commit: commit, kind: env.PERF_KIND, runner: runner }) + "\n");
}

trace("start");
console.log("fake-suite " + suite + " at " + commit.substring(0, 9) + " in " + process.cwd());
if (typeof entry.exit === "number") process.exit(entry.exit);

const median = env.PERF_ONLY && typeof entry.onlyMedian === "number" ? entry.onlyMedian : typeof entry.median === "number" ? entry.median : 10;
const sleepMs = typeof entry.sleepMs === "number" ? entry.sleepMs : Number(env.FAKE_SLEEP_MS || 0);
delete entry.median;
delete entry.onlyMedian;
delete entry.sleepMs;
const browser = !!suites[suite].package;
const bundle = path.join(runner, "perf", "results", ".cache", "bundle");
if (browser) {
  fs.mkdirSync(path.dirname(bundle), { recursive: true });
  fs.writeFileSync(bundle, commit);
}

const part = (dir: string | undefined): unknown => ({ dir: dir || null, version: "1.0.0", commit: commit, mtime: null });
const result: { [key: string]: any } = Object.assign({
  schema: 2, suite: suite, kind: env.PERF_KIND || "local", label: env.PERF_LABEL || "", ref: env.PERF_REF || null, commit: commit, previousCommit: null,
  date: new Date().toISOString(), requested: { only: env.PERF_ONLY ? env.PERF_ONLY.split(",") : null, notInSuite: [] }, incomplete: null,
  build: Object.assign({ core: part(env.PERF_CORE_DIR), deps: { fingerprint: null, versions: {} } }, browser ? { ui: part(env.PERF_UI_DIR) } : {}),
  machine: { key: "fake", os: process.platform, cpu: "fake", cores: 1, availableParallelism: 1, node: process.version, chromium: null, extra: "" },
  environment: null, fixtures: {}, skipped: [], failed: [],
  results: ids.map((id: string) => ({ id: id, rev: 1, unit: "ms", samples: [median], median: median, min: median, max: median, mad: 0, counters: {}, info: {},
    jsonErrors: 0, tolerance: null, local: false })),
}, entry);
const fakeEnv: { [key: string]: string } = {};
for (const k of ["PERF_CREATOR_CORE_DIR", "PERF_LIB_UI_DIR", "PERF_UI_DIR", "PERF_LIB_COMMIT"]) if (env[k]) fakeEnv[k] = env[k] as string;
result.fake = { cpus: cpus(), runner: runner, env: fakeEnv };

function write(r: unknown): void {
  fs.writeFileSync(env.PERF_RESULT_FILE as string, JSON.stringify(r, null, 2) + "\n");
}

if (sleepMs > 0) {
  process.on("SIGTERM", () => {
    write(Object.assign({}, result, { results: [], incomplete: { reason: "timeout", unrun: ids } }));
    trace("term");
    process.exit(143);
  });
  console.log("sleeping " + sleepMs + " ms");
  await new Promise((resolve: (v: unknown) => void) => setTimeout(resolve, sleepMs));
}
if (browser && (!fs.existsSync(bundle) || fs.readFileSync(bundle, "utf8") !== commit)) {
  result.failed = result.failed.concat([{ id: ids[0], error: "bundle swapped" }]);
}
write(result);
trace("end");
