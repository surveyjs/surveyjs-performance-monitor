import { describe, test, expect, beforeEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildAt, buildPairAt, coreSteps, installTool, siblingStubs, slotDir } from "../src/builds.ts";
import type { Npm, BuildOptions } from "../src/builds.ts";
import type { BuildSpec, Role } from "../src/versions.ts";
import { checkProject, loadProject } from "../src/project.ts";
import { checkManifest } from "../src/contract.ts";
import type { Manifest } from "../src/contract.ts";
import { InfraError } from "../src/errors.ts";
import { git } from "../src/util/git.ts";
import { repoWith } from "./helpers/repo.ts";
import type { FakeCommit } from "./helpers/repo.ts";

const root = path.resolve(import.meta.dirname, "..");
const library = loadProject(path.join(root, "projects"), "survey-library");
const other = loadProject(path.join(root, "test/fixtures/projects"), "other");
const creator = loadProject(path.join(root, "projects"), "survey-creator");
const creatorManifest = checkManifest(JSON.parse(fs.readFileSync(path.join(root, "test/testdata/creator-manifest.json"), "utf8")), "creator-manifest.json", "creator") as Manifest;
const manifest = checkManifest(JSON.parse(fs.readFileSync(path.join(root, "test/testdata/manifest.json"), "utf8")), "manifest.json") as Manifest;

interface Call { dir: string, op: string, name: string, ignoreScripts?: boolean }
interface Fake extends Npm {
  calls: Array<Call>;
  out: string;
  failInstall: Array<string>;
  failRun: Array<string>;
}

function fakeNpm(): Fake {
  const f: Fake = {
    calls: [], out: "build", failInstall: [], failRun: [],
    async install(dir: string, name: string, ignoreScripts: boolean): Promise<void> {
      f.calls.push({ dir: dir, op: "install", name: name, ignoreScripts: ignoreScripts });
      if (f.failInstall.some((s: string) => dir.endsWith(s))) throw new InfraError("npm install failed in build-root", path.join(dir, "install.log"));
    },
    async run(dir: string, script: string, logFile: string): Promise<boolean> {
      f.calls.push({ dir: dir, op: "run", name: script });
      fs.mkdirSync(path.dirname(logFile), { recursive: true });
      fs.appendFileSync(logFile, "ran " + script + "\n");
      if (f.failRun.some((s: string) => dir.endsWith(s) && script.startsWith("build"))) return false;
      if (script === "build" || script === "compile" || script === "build:main") {
        fs.mkdirSync(path.join(dir, f.out), { recursive: true });
        fs.writeFileSync(path.join(dir, f.out, "package.json"), "{}");
      }
      return true;
    },
  };
  return f;
}

const dates = ["2026-10-01T12:00:00Z", "2026-10-12T12:00:00Z", "2026-11-03T12:00:00Z", "2026-11-10T23:00:00Z"];
const roles: Array<Role> = ["month", "week", "yesterday", "today"];
let work: string;
let npm: Fake;

beforeEach(() => {
  work = fs.mkdtempSync(path.join(os.tmpdir(), "perf-work-"));
  npm = fakeNpm();
});

// The folder a build's outputs are copied to; one per role when a test builds several.
function dest(role?: Role): string {
  return path.join(work, "dest", role || "");
}

// A clone of the source repository that keeps its branches in refs/remotes/origin/*, as the night's checkout does.
function cloneRepo(mirror: string, dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
  git(dir, ["init", "--quiet"]);
  git(dir, ["remote", "add", "origin", mirror]);
  git(dir, ["config", "--replace-all", "remote.origin.fetch", "+refs/remotes/origin/*:refs/remotes/origin/*"]);
  git(dir, ["fetch", "--quiet", "origin"]);
}

function setup(o: { project?: typeof library, branch?: string, coreDir?: string, ui?: string | Array<string>, suites?: Array<string> } = {}): { opts: BuildOptions, specs: Array<BuildSpec>, repo: string } {
  const project = o.project || library;
  const uiFiles: Record<string, string> = {};
  for (const u of o.ui === undefined ? [] : ([] as Array<string>).concat(o.ui)) uiFiles[u + "/package.json"] = "{\"scripts\":{\"build\":\"true\"}}";
  const commits: Array<FakeCommit> = dates.map((d: string, i: number) => ({ date: d, subject: "c" + i, files: Object.assign({ [(o.coreDir || "packages/survey-core") + "/package.json"]: "{\"scripts\":{\"build\":\"true\",\"compile\":\"true\"}}" }, uiFiles) }));
  const src = repoWith(commits, { branch: o.branch, coreDir: o.coreDir });
  const repo = path.join(work, "repo");
  cloneRepo(src, repo);
  const shas = git(src, ["rev-list", "--reverse", "HEAD"]).split("\n");
  const specs: Array<BuildSpec> = roles.map((r: Role, i: number) => ({ role: r, sha: shas[i], date: dates[i] }));
  return { opts: { work: work, dest: dest(), repo: repo, logs: path.join(work, "logs"), npm: npm, m: manifest, suites: o.suites || ["core", "react"], project: project }, specs: specs, repo: repo };
}

describe("coreSteps", () => {
  test("core steps follow the recipe and run only the scripts that exist", () => {
    const s = { build: "x", "build:i18n": "x", "build:icons": "x" };
    expect(coreSteps(s, library.build!.core, true)).toEqual(["build", "build:i18n", "build:icons"]);
    expect(coreSteps(s, library.build!.core, false)).toEqual(["build", "build:i18n"]);
    expect(coreSteps({ build: "x", "build:icons": "x" }, library.build!.core, true)).toEqual(["build", "build:icons"]);
    expect(coreSteps({ "build:i18n": "x" }, library.build!.core, true)).toEqual([]);
    expect(coreSteps({ compile: "x", build: "x" }, { steps: ["compile"], uiSteps: [], dir: "d", out: "o" } as never, true)).toEqual(["compile"]);
  });
});

describe("buildAt, one role", () => {
  test("a second project builds without code changes", async () => {
    npm.out = "dist";
    const { opts, specs } = setup({ project: other, branch: "main", coreDir: "lib/core", ui: "lib/survey-react-ui" });
    const res = await buildAt(opts, specs.find((x) => x.role === "today")!);
    expect(npm.calls.some((c: Call) => c.dir === path.join(work, "build-today", "lib/core"))).toBe(true);
    expect(res.core).toBe(path.join(dest(), "core"));
    expect(fs.existsSync(path.join(dest(), "core", "package.json"))).toBe(true);
    expect(npm.calls.some((c: Call) => c.dir.includes("packages"))).toBe(false);
  });

  test("every role is built into its own slot and copied", async () => {
    const { opts, specs } = setup({ ui: "packages/survey-react-ui" });
    for (const s of specs) {
      const b = await buildAt({ ...opts, dest: dest(s.role) }, s);
      expect(b.failed).toBeUndefined();
      expect(b.sha).toBe(s.sha);
      expect(b.core).toBe(path.join(dest(s.role), "survey-core"));
      expect(b.ui.react).toBe(path.join(dest(s.role), "survey-react-ui"));
      expect(fs.existsSync(path.join(dest(s.role), "survey-react-ui", "package.json"))).toBe(true);
      expect(b.uiMissing).toEqual({});
      expect(Array.isArray(b.deps)).toBe(true);
      expect(b.node).toBe(process.version);
      expect(npm.calls.some((c: Call) => c.op === "install" && c.dir === slotDir(work, s.role))).toBe(true);
      expect(npm.calls.some((c: Call) => c.dir === path.join(slotDir(work, s.role), "packages/survey-core"))).toBe(true);
    }
  });

  test("a failing install of an old build is a column", async () => {
    npm.failInstall = [path.join("build-month")];
    const { opts, specs } = setup({ suites: ["core"] });
    const month = await buildAt(opts, specs.find((x) => x.role === "month")!);
    const today = await buildAt(opts, specs.find((x) => x.role === "today")!);
    expect(month.failed).toBe("npm install failed in build-root");
    expect(month.core).toBeNull();
    expect(month.logs.length).toBe(1);
    expect(today.failed).toBeUndefined();
    expect(today.core).not.toBeNull();
  });
});

describe("buildAt", () => {
  test("a checkout that fails is a column", async () => {
    const { opts } = setup({ suites: ["core"] });
    const b = await buildAt(opts, { role: "month", sha: "0".repeat(40), date: "" });
    expect(b.failed?.startsWith("checkout of")).toBe(true);
    expect(b.core).toBeNull();
    expect(npm.calls.length).toBe(0);
  });

  test("a UI package missing at the commit is n/a", async () => {
    const { opts, specs } = setup();
    const b = await buildAt(opts, specs[3]);
    expect(b.uiMissing.react).toBe("no survey-react-ui at " + specs[3].sha.substring(0, 7));
    expect(b.core).not.toBeNull();
    expect(b.failed).toBeUndefined();
  });

  test("a failing UI build is recorded, core stays", async () => {
    npm.failRun = ["survey-react-ui"];
    const { opts, specs } = setup({ ui: "packages/survey-react-ui" });
    const b = await buildAt(opts, specs[3]);
    expect(b.uiMissing.react).toBe("build failed");
    expect(b.logs.some((l: string) => l.endsWith("build-today-survey-react-ui.log"))).toBe(true);
    expect(b.uiFailed.react).toEqual({ reason: "survey-react-ui does not build", log: path.join(work, "logs", "build-today-survey-react-ui.log") });
    expect(b.core).not.toBeNull();
    expect(b.ui.react).toBeUndefined();
  });

  test("a UI package that does not install fails only its suite, with its install log", async () => {
    npm.failInstall = ["survey-react-ui"];
    const { opts, specs } = setup({ ui: ["packages/survey-react-ui", "packages/survey-vue3-ui"], suites: ["core", "react", "vue3"] });
    const b = await buildAt(opts, specs[3]);
    expect(b.failed).toBeUndefined();
    expect(b.uiMissing).toEqual({ react: "build failed" });
    expect(b.uiFailed.react).toEqual({ reason: "npm install failed in build-root", log: path.join(slotDir(work, "today"), "packages/survey-react-ui", "install.log") });
    expect(b.logs).toContain(b.uiFailed.react.log);
    expect(b.core).toBe(path.join(dest(), "survey-core"));
    expect(b.ui).toEqual({ vue3: path.join(dest(), "survey-vue3-ui") });
    expect(fs.existsSync(path.join(dest(), "survey-react-ui"))).toBe(false);
    expect(npm.calls.some((c: Call) => c.op === "run" && c.dir.endsWith("survey-react-ui"))).toBe(false);
  });

  test("a failing core build fails the build", async () => {
    npm.failRun = ["survey-core"];
    const { opts, specs } = setup({ suites: ["core"] });
    const b = await buildAt(opts, specs[3]);
    expect(b.failed).toBe("survey-core does not build");
    expect(b.core).toBeNull();
    expect(fs.existsSync(path.join(dest(), "survey-core"))).toBe(false);
  });
});

describe("buildPairAt", () => {
  const date = "2026-11-10T12:00:00Z";
  let opts: BuildOptions & { libRepo: string };
  let spec: BuildSpec;
  beforeEach(() => {
    const pkg = (name: string): string => JSON.stringify({ name: name, scripts: { build: "true" } });
    const creatorRepo = repoWith([{ date: date, subject: "c", files: {
      "packages/survey-creator-react/package.json": pkg("survey-creator-react") } }], { coreDir: "packages/survey-creator-core" });
    const libRepo = repoWith([{ date: date, subject: "l", files: { "packages/survey-react-ui/package.json": pkg("survey-react-ui") } }]);
    spec = { role: "today", sha: git(creatorRepo, ["rev-parse", "HEAD"]), date: date, lib: { sha: git(libRepo, ["rev-parse", "HEAD"]), date: date } };
    opts = { work: work, dest: dest(), repo: creatorRepo, libRepo: libRepo, logs: path.join(work, "logs"), npm: npm, m: creatorManifest, suites: ["core", "react"], project: creator };
  });
  // "<op> <path relative to the slot> <script or scripts on/off>"
  const calls = (): Array<string> => npm.calls.map((c: Call) => c.op + " " + path.relative(slotDir(work, "today"), c.dir) + " " + (c.op === "run" ? c.name : c.ignoreScripts ? "off" : "on"));

  test("the library first, then the creator, side by side", async () => {
    const b = await buildPairAt(opts, spec);
    expect(b.failed).toBeUndefined();
    expect(calls()).toEqual([
      "install survey-library off", "install survey-library/packages/survey-core on",
      "run survey-library/packages/survey-core build", "run survey-library/packages/survey-core build:icons",
      "run survey-library/packages/survey-core build:linter", "run survey-library/packages/survey-core build:themes",
      "install survey-library/packages/survey-react-ui on", "run survey-library/packages/survey-react-ui build",
      "install survey-creator off", "install survey-creator/packages/survey-creator-core on",
      "run survey-creator/packages/survey-creator-core build:main", "run survey-creator/packages/survey-creator-core build:collaboration",
      "install survey-creator/packages/survey-creator-react on", "run survey-creator/packages/survey-creator-react build"]);
    expect(b.core).toBe(path.join(dest(), "survey-core"));
    expect(b.ui).toEqual({ react: path.join(dest(), "survey-creator-react") });
    expect(b.targets).toEqual({
      core: { PERF_CORE_DIR: path.join(dest(), "survey-core"), PERF_CREATOR_CORE_DIR: path.join(dest(), "survey-creator-core") },
      react: { PERF_CORE_DIR: path.join(dest(), "survey-core"), PERF_LIB_UI_DIR: path.join(dest(), "survey-react-ui"),
        PERF_CREATOR_CORE_DIR: path.join(dest(), "survey-creator-core"), PERF_UI_DIR: path.join(dest(), "survey-creator-react") } });
    expect(b.lib).toBe(spec.lib!.sha);
    expect(git(path.join(slotDir(work, "today"), "survey-creator"), ["rev-parse", "HEAD"])).toBe(spec.sha);
    expect(git(path.join(slotDir(work, "today"), "survey-library"), ["rev-parse", "HEAD"])).toBe(spec.lib!.sha);
  });

  test("survey-react-ui that does not build fails only react", async () => {
    npm.failRun = ["packages/survey-react-ui"];
    const b = await buildPairAt(opts, spec);
    expect(b.failed).toBeUndefined();
    expect(b.uiMissing).toEqual({ react: "build failed" });
    expect(b.uiFailed.react.reason).toBe("survey-react-ui does not build");
    expect(npm.calls.some((c: Call) => c.dir.endsWith("survey-creator-react"))).toBe(false);
    expect(Object.keys(b.targets!)).toEqual(["core"]);
  });

  test("survey-react-ui that does not install fails only react", async () => {
    npm.failInstall = ["packages/survey-react-ui"];
    const b = await buildPairAt(opts, spec);
    expect(b.failed).toBeUndefined();
    expect(b.uiMissing.react).toBe("build failed");
    expect(Object.keys(b.targets!)).toEqual(["core"]);
    expect(npm.calls.some((c: Call) => c.dir.endsWith("survey-creator-react"))).toBe(false);
  });

  test("a library without survey-react-ui names the library commit", async () => {
    const libRepo = repoWith([{ date: date, subject: "l", files: { "README.md": "x" } }]);
    const sp = { ...spec, lib: { sha: git(libRepo, ["rev-parse", "HEAD"]), date: date } };
    const b = await buildPairAt({ ...opts, libRepo: libRepo }, sp);
    expect(b.uiMissing.react).toBe("no survey-react-ui at " + sp.lib.sha.substring(0, 7));
  });

  test("survey-creator-core that does not build fails the role", async () => {
    npm.failRun = ["packages/survey-creator-core"];
    const b = await buildPairAt(opts, spec);
    expect(b.failed).toBe("survey-creator-core does not build");
    expect(b.core).toBeNull();
  });

  test("a creator root that does not install fails the role", async () => {
    npm.failInstall = ["survey-creator"];
    const b = await buildPairAt(opts, spec);
    expect(b.failed).toBe("npm install failed in build-root");
  });

  test("a spec without a library commit is a usage error", async () => {
    await expect(buildPairAt(opts, { ...spec, lib: undefined })).rejects.toThrow("no library commit for today");
  });
});

describe("installTool", () => {
  const tool = (): string => {
    const t = path.join(work, "tool");
    for (const d of ["packages/survey-core", "perf/react19", "perf/vue3"]) {
      fs.mkdirSync(path.join(t, d), { recursive: true });
      fs.writeFileSync(path.join(t, d, "package.json"), "{}");
    }
    return t;
  };
  const rel = (t: string): Array<string> => npm.calls.filter((c: Call) => c.op === "install").map((c: Call) => path.relative(t, c.dir) || ".");

  test("installTool installs what the project lists", async () => {
    const t = tool();
    await installTool(npm, t, library);
    expect(rel(t)).toEqual([".", "packages/survey-core", "perf/react19", "perf/vue3"]);
    npm.calls.length = 0;
    const { library: _none, ...oneRepo } = other;
    await installTool(npm, t, checkProject({ ...oneRepo, tool: { dirs: ["."], optional: [] } } as unknown, "other.json"));
    expect(rel(t)).toEqual(["."]);
  });
});

describe("siblingStubs", () => {
  test("writes a package.json for each library build next to the runner", () => {
    const T = fs.mkdtempSync(path.join(os.tmpdir(), "perf-stubs-"));
    try {
      const files = siblingStubs(path.join(T, "runner"), creatorManifest);
      const core = path.join(T, "survey-library/packages/survey-core/build/package.json");
      const react = path.join(T, "survey-library/packages/survey-react-ui/build/package.json");
      expect(files.sort()).toEqual([core, react].sort());
      expect(JSON.parse(fs.readFileSync(core, "utf8"))).toEqual({ name: "survey-core", version: "0.0.0", private: true });
      expect(JSON.parse(fs.readFileSync(react, "utf8")).name).toBe("survey-react-ui");
      expect(siblingStubs(path.join(T, "runner"), manifest)).toEqual([]);
    } finally {
      fs.rmSync(T, { recursive: true, force: true });
    }
  });
});
