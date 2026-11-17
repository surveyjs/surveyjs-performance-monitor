// The fake runner's suites (runner contract 2): both run perf/fake-suite.ts, from a cwd that is not the script's folder,
// so a caller that resolves the script against cwd fails. `react` is a browser suite.
export const suites: { [suite: string]: { ids: Array<string>, cwd: string, script: string, args: Array<string>, package?: string, buildFile?: string, src?: Array<string> } } = {
  core: { ids: ["a/one", "a/two", "b/three"], cwd: "perf", script: "perf/fake-suite.ts", args: ["core"] },
  react: { ids: ["a/paint", "b/paint"], cwd: "perf", script: "perf/fake-suite.ts", args: ["react"], package: "survey-react-ui", buildFile: "survey-react-ui.min.js", src: [] },
};
