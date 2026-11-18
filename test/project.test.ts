import { describe, test, expect } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { checkProject, loadProject, uiDir, projectsDir } from "../src/project.ts";
import { UsageError } from "../src/errors.ts";

const real = path.join(import.meta.dirname, "..", "projects");
const realJson = (): any => JSON.parse(fs.readFileSync(path.join(real, "survey-library.json"), "utf8"));
const bad = (mutate: (j: any) => void, name = "survey-library"): void => {
  const j = realJson();
  mutate(j);
  expect(() => checkProject(j, name + ".json")).toThrow(/bad project config/);
};

describe("the project config", () => {
  test("the real project config is accepted", () => {
    const p = loadProject(real, "survey-library");
    expect(p.branch).toBe("master");
    expect(p.build.core.dir).toBe("packages/survey-core");
    expect(uiDir(p, "survey-react-ui")).toBe("packages/survey-react-ui");
    const o = loadProject(path.join(import.meta.dirname, "fixtures", "projects"), "other");
    expect(o.branch).toBe("main");
    expect(o.build.core.dir).toBe("lib/core");
    expect(o.discordEnv).toBe("PERF_DISCORD_WEBHOOK_OTHER");
  });
  test("a bad project config is refused", () => {
    const extra = realJson();
    extra.x = 1;
    expect(() => checkProject(extra, "survey-library.json")).toThrow(/bad project config: .*: x/);
    const noBranch = realJson();
    delete noBranch.branch;
    expect(() => checkProject(noBranch, "survey-library.json")).toThrow(/bad project config: .*: branch/);
    bad((j) => { j.repo += ".git"; });
    bad((j) => { j.repo = "https://gitlab.com/a/b"; });
    bad((j) => { j.discordEnv = "WEBHOOK"; });
    bad((j) => { j.name = "other"; });
    bad((j) => { j.build.core.steps = "build"; });
    bad((j) => { j.build.core.dir = "../x"; });
    bad((j) => { j.build.ui.dir = "packages/ui"; });
    bad((j) => { j.branch = "a..b"; });
    // Nothing that git or npm could read as an option.
    bad((j) => { j.branch = "-x"; });
    bad((j) => { j.branch = "--all"; });
    bad((j) => { j.build.core.steps = ["build", "-x"]; });
    bad((j) => { j.build.core.uiSteps = ["--ignore-scripts"]; });
    bad((j) => { j.build.ui.script = "-b"; });
    bad((j) => { j.tool.dirs = ["/abs"]; });
    bad((j) => { j.build.core.extra = 1; });
    expect(() => checkProject(null, "survey-library.json")).toThrow(UsageError);
    expect(() => loadProject(real, "nope")).toThrow(/unknown project nope/);
  });
  test("the projects folder", () => {
    expect(projectsDir({})).toBe(path.join(import.meta.dirname, "..", "projects"));
    expect(projectsDir({ PERF_PROJECTS_DIR: "/p" })).toBe("/p");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-project-"));
    expect(() => loadProject(dir, "../x")).toThrow(/unknown project/);
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
