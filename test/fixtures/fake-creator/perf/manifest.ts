// `node perf/manifest.ts` of the fake Creator runner: a contract 1 creator manifest. Self-contained (no imports), so a
// test can copy this one file into a temporary git repository.
const suites = {
  core: { ids: ["a/one", "a/two", "b/three"], cwd: "perf", script: "perf/fake-suite.ts", args: ["core"] },
  react: { ids: ["a/paint", "b/paint"], cwd: "perf", script: "perf/fake-suite.ts", args: ["react"] },
};

console.log(JSON.stringify({
  product: "creator",
  contract: 1,
  resultSchema: 2,
  library: {
    repo: "survey-library",
    layout: "sibling",
    builds: [
      { env: "PERF_CORE_DIR", package: "survey-core", cwd: "packages/survey-core", commands: ["npm run build"], dir: "packages/survey-core/build" },
      { env: "PERF_LIB_UI_DIR", package: "survey-react-ui", cwd: "packages/survey-react-ui", commands: ["npm run build"], dir: "packages/survey-react-ui/build", suites: ["react"] },
    ],
  },
  install: ["npm install"],
  builds: [
    { env: "PERF_CREATOR_CORE_DIR", cwd: "packages/survey-creator-core", install: ["npm install"], commands: ["npm run build"], dir: "packages/survey-creator-core/build", src: ["packages/survey-creator-core/src"] },
    { env: "PERF_UI_DIR", cwd: "packages/survey-creator-react", install: ["npm install"], commands: ["npm run build"], dir: "packages/survey-creator-react/build", src: ["packages/survey-creator-react/src"], suites: ["react"] },
  ],
  suites: suites,
  machine: { key: "fake", os: process.platform, cpu: "fake", cores: 1, availableParallelism: 1, node: process.version, chromium: null, extra: "" },
}));
