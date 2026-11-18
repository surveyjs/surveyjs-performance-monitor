import * as fs from "node:fs";
import * as path from "node:path";
import { UsageError } from "./errors.ts";

// How a one-repo project is built: the core package, then the UI packages.
export interface BuildRecipe {
  // The core package: its folder, the npm scripts that build it (and, for a UI package, the extra ones), the output.
  core: { dir: string, steps: Array<string>, uiSteps: Array<string>, out: string };
  // A UI package: `dir` has a {package} placeholder for the package name the manifest gives.
  ui: { dir: string, script: string, out: string };
}

// A project the monitor measures: everything specific to it lives in projects/<name>.json (the projects/ folder of this
// repository), nothing in src/.
export interface Project {
  name: string;
  // https://github.com/<owner>/<repo>, the base of the commit links.
  repo: string;
  branch: string;
  // The build recipe of a one-repo project; null for a two-repo project (its recipe comes from the manifest).
  build: BuildRecipe | null;
  // The sibling library repository of a two-repo project; null for a one-repo project.
  library: { repo: string, branch: string } | null;
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

// Is `v` a non-empty relative path without ".."?
export function relPathOk(v: unknown): v is string {
  return typeof v === "string" && !!v && !path.isAbsolute(v) && v.split(/[\\/]/).indexOf("..") < 0;
}

// A relative path without "..".
function relPath(v: unknown, file: string, field: string): string {
  if (!relPathOk(v)) return fail(file, field);
  return v;
}

function list(v: unknown, file: string, field: string, item: (x: unknown, f: string) => string): Array<string> {
  if (!Array.isArray(v)) return fail(file, field);
  return v.map((x: unknown, i: number) => item(x, field + "[" + i + "]"));
}

// `file` is the config's file name (name.json): the name inside must match it.
export function checkProject(json: unknown, file: string): Project {
  const shape: Obj = json && typeof json === "object" && !Array.isArray(json) ? json as Obj : {};
  // Exactly one of the two shapes: `build` (one repository) or `library` (two repositories).
  if (("build" in shape) === ("library" in shape)) fail(file, "build");
  const two = "library" in shape;
  const j = exact(json, ["name", "repo", "branch", two ? "library" : "build", "tool", "discordEnv"], file, "");
  const name = str(j.name, file, "name", /^[a-z0-9-]+$/);
  if (name + ".json" !== path.basename(file)) fail(file, "name");
  const repoOf = (v: unknown, f: string): string => {
    const r = str(v, file, f, /^https:\/\/github\.com\/[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/);
    if (/\.git$/.test(r)) fail(file, f);
    return r;
  };
  // The branch and the steps reach git and npm: none may start with "-", so none reads as an option.
  const branchOf = (v: unknown, f: string): string => {
    const r = str(v, file, f, /^(?!-)[A-Za-z0-9._/-]+$/);
    if (r.indexOf("..") > -1) fail(file, f);
    return r;
  };
  const repo = repoOf(j.repo, "repo");
  const branch = branchOf(j.branch, "branch");
  const step = (x: unknown, f: string): string => str(x, file, f, /^(?!-)[A-Za-z0-9:._-]+$/);
  const rel = (x: unknown, f: string): string => relPath(x, file, f);
  let build: BuildRecipe | null = null;
  let library: Project["library"] = null;
  if (two) {
    const lib = exact(j.library, ["repo", "branch"], file, "library.");
    library = { repo: repoOf(lib.repo, "library.repo"), branch: branchOf(lib.branch, "library.branch") };
  } else {
    const b = exact(j.build, ["core", "ui"], file, "build.");
    const core = exact(b.core, ["dir", "steps", "uiSteps", "out"], file, "build.core.");
    const ui = exact(b.ui, ["dir", "script", "out"], file, "build.ui.");
    const uiDirTemplate = relPath(ui.dir, file, "build.ui.dir");
    if (uiDirTemplate.indexOf("{package}") < 0) fail(file, "build.ui.dir");
    build = {
      core: { dir: rel(core.dir, "build.core.dir"), steps: list(core.steps, file, "build.core.steps", step), uiSteps: list(core.uiSteps, file, "build.core.uiSteps", step), out: rel(core.out, "build.core.out") },
      ui: { dir: uiDirTemplate, script: step(ui.script, "build.ui.script"), out: rel(ui.out, "build.ui.out") },
    };
  }
  const tool = exact(j.tool, ["dirs", "optional"], file, "tool.");
  return {
    name: name,
    repo: repo,
    branch: branch,
    build: build,
    library: library,
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
  if (!p.build) throw new UsageError(p.name + " has no build recipe");
  return p.build.ui.dir.replace("{package}", pkg);
}
