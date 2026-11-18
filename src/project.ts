import * as fs from "node:fs";
import * as path from "node:path";
import { UsageError } from "./errors.ts";

// A project the monitor measures: everything specific to it lives in projects/<name>.json (the projects/ folder of this
// repository), nothing in src/.
export interface Project {
  name: string;
  // https://github.com/<owner>/<repo>, the base of the commit links.
  repo: string;
  branch: string;
  build: {
    // The core package: its folder, the npm scripts that build it (and, for a UI package, the extra ones), the output.
    core: { dir: string, steps: Array<string>, uiSteps: Array<string>, out: string },
    // A UI package: `dir` has a {package} placeholder for the package name the manifest gives.
    ui: { dir: string, script: string, out: string },
  };
  // Where the runner's npm install runs (`dirs`) and which pinned-framework folders may stay missing (`optional`).
  tool: { dirs: Array<string>, optional: Array<string> };
  // The environment variable that holds the project's Discord webhook.
  discordEnv: string;
}

type Obj = { [key: string]: unknown };

function fail(file: string, field: string): never {
  throw new UsageError("bad project config: " + file + ": " + field);
}

// The keys of an object are exactly `keys`: an extra key is named, a missing one too.
function exact(o: unknown, keys: Array<string>, file: string, at: string): Obj {
  if (!o || typeof o !== "object" || Array.isArray(o)) return fail(file, at || "(root)");
  const obj = o as Obj;
  for (const k of Object.keys(obj)) if (keys.indexOf(k) < 0) return fail(file, at + k);
  for (const k of keys) if (!(k in obj)) return fail(file, at + k);
  return obj;
}

function str(v: unknown, file: string, field: string, re: RegExp): string {
  if (typeof v !== "string" || !re.test(v)) return fail(file, field);
  return v;
}

// A relative path without "..".
function relPath(v: unknown, file: string, field: string): string {
  if (typeof v !== "string" || !v || path.isAbsolute(v) || v.split(/[\\/]/).indexOf("..") > -1) return fail(file, field);
  return v;
}

function list(v: unknown, file: string, field: string, item: (x: unknown, f: string) => string): Array<string> {
  if (!Array.isArray(v)) return fail(file, field);
  return v.map((x: unknown, i: number) => item(x, field + "[" + i + "]"));
}

// `file` is the config's file name (name.json): the name inside must match it.
export function checkProject(json: unknown, file: string): Project {
  const j = exact(json, ["name", "repo", "branch", "build", "tool", "discordEnv"], file, "");
  const name = str(j.name, file, "name", /^[a-z0-9-]+$/);
  if (name + ".json" !== path.basename(file)) fail(file, "name");
  const repo = str(j.repo, file, "repo", /^https:\/\/github\.com\/[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/);
  if (/\.git$/.test(repo)) fail(file, "repo");
  // The branch and the steps reach git and npm: none may start with "-", so none reads as an option.
  const branch = str(j.branch, file, "branch", /^(?!-)[A-Za-z0-9._/-]+$/);
  if (branch.indexOf("..") > -1) fail(file, "branch");
  const build = exact(j.build, ["core", "ui"], file, "build.");
  const core = exact(build.core, ["dir", "steps", "uiSteps", "out"], file, "build.core.");
  const ui = exact(build.ui, ["dir", "script", "out"], file, "build.ui.");
  const tool = exact(j.tool, ["dirs", "optional"], file, "tool.");
  const step = (x: unknown, f: string): string => str(x, file, f, /^(?!-)[A-Za-z0-9:._-]+$/);
  const rel = (x: unknown, f: string): string => relPath(x, file, f);
  const uiDirTemplate = relPath(ui.dir, file, "build.ui.dir");
  if (uiDirTemplate.indexOf("{package}") < 0) fail(file, "build.ui.dir");
  return {
    name: name,
    repo: repo,
    branch: branch,
    build: {
      core: { dir: rel(core.dir, "build.core.dir"), steps: list(core.steps, file, "build.core.steps", step), uiSteps: list(core.uiSteps, file, "build.core.uiSteps", step), out: rel(core.out, "build.core.out") },
      ui: { dir: uiDirTemplate, script: step(ui.script, "build.ui.script"), out: rel(ui.out, "build.ui.out") },
    },
    tool: { dirs: list(tool.dirs, file, "tool.dirs", rel), optional: list(tool.optional, file, "tool.optional", rel) },
    discordEnv: str(j.discordEnv, file, "discordEnv", /^PERF_[A-Z0-9_]+$/),
  };
}

export function loadProject(dir: string, name: string): Project {
  const file = path.join(dir, name + ".json");
  if (!/^[a-z0-9-]+$/.test(name) || !fs.existsSync(file)) throw new UsageError("unknown project " + name);
  let json: unknown;
  try {
    json = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch(e) {
    throw new UsageError("bad project config: " + file + ": not JSON");
  }
  return checkProject(json, file);
}

// The configs live in this repository; a test points PERF_PROJECTS_DIR elsewhere.
export function projectsDir(env: NodeJS.ProcessEnv): string {
  return env.PERF_PROJECTS_DIR || path.join(import.meta.dirname, "..", "projects");
}

// The folder of a UI package.
export function uiDir(p: Project, pkg: string): string {
  return p.build.ui.dir.replace("{package}", pkg);
}
