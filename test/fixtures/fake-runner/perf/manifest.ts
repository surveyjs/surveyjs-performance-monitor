import { suites } from "./suites.ts";

// `node perf/manifest.ts` of the fake runner: contract 2 with the suites `core` and `react`.
console.log(JSON.stringify({
  contract: 2,
  resultSchema: 2,
  suites: suites,
  machine: { key: "fake", os: process.platform, cpu: "fake", cores: 1, availableParallelism: 1, node: process.version, chromium: null, extra: "" },
}));
