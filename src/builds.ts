// The build of one role: a slot (a git worktree in <work>/build-<role>) is installed and built, and the outputs are
// copied to the folder `dest`, which is what gets measured.
import * as fs from "node:fs";
import * as path from "node:path";
import { git } from "./util/git.ts";
import { runLogged } from "./util/proc.ts";
import { installedList } from "./util/deps.ts";
import { InfraError } from "./errors.ts";
import { isBrowser } from "./contract.ts";
import type { Manifest } from "./contract.ts";
import { uiDir } from "./project.ts";
import type { Project } from "./project.ts";
import type { Role, BuildSpec } from "./versions.ts";

export interface Npm {
  // Always installs (a fresh worker has nothing); a failure is an InfraError.
  install(dir: string, name: string, ignoreScripts: boolean): Promise<void>;
  run(dir: string, script: string, logFile: string): Promise<boolean>;
}

export interface Build {
  role: Role;
  sha: string;
  // Paths of the copies in `dest`, not of the slot.
  core: string | null;
  ui: Record<string, string>;
  // Per suite without a UI package to measure: "no <package> at <sha7>" (n/a), or "build failed" when the package is
  // there but does not install or build; then uiFailed has the reason and the log.
  uiMissing: Record<string, string>;
  uiFailed: Record<string, { reason: string, log?: string }>;
  failed?: string;
  logs: Array<string>;
  deps: Array<string>;
  node: string;
}

export interface BuildOptions {
  work: string;
  // The folder the build's outputs are copied to.
  dest: string;
  repo: string;
  logs: string;
  npm: Npm;
  m: Manifest;
  suites: Array<string>;
  project: Project;
}

export function slotDir(work: string, role: Role): string {
  return path.join(work, "build-" + role);
}

export function npmFor(o: { logs: string }): Npm {
  const env = (ignoreScripts: boolean): NodeJS.ProcessEnv => {
    const e: NodeJS.ProcessEnv = Object.assign({}, process.env, { PUPPETEER_SKIP_DOWNLOAD: "true", HUSKY: "0" });
    if (ignoreScripts) e.npm_config_ignore_scripts = "true";
    return e;
  };
  return {
    async install(dir: string, name: string, ignoreScripts: boolean): Promise<void> {
      const logFile = path.join(o.logs, "install-" + name + ".log");
      const r = await runLogged("npm", ["install", "--no-audit", "--no-fund", "--no-package-lock"], { cwd: dir, env: env(ignoreScripts), logFile: logFile });
      if (r.code !== 0) throw new InfraError("npm install failed in " + name, logFile);
    },
    async run(dir: string, script: string, logFile: string): Promise<boolean> {
      const r = await runLogged("npm", ["run", script], { cwd: dir, env: env(false), logFile: logFile });
      return r.code === 0;
    },
  };
}

// The recipe's steps, plus the UI steps when a UI package is built, those the commit's package.json has. A commit
// without the recipe's first step (the build itself) has none.
export function coreSteps(scripts: Record<string, string>, recipe: Project["build"]["core"], needUi: boolean): Array<string> {
  if (recipe.steps.length > 0 && !Object.prototype.hasOwnProperty.call(scripts, recipe.steps[0])) return [];
  return recipe.steps.concat(needUi ? recipe.uiSteps : []).filter((s: string) => Object.prototype.hasOwnProperty.call(scripts, s));
}

// A checkout into a folder that does not exist yet. core.longpaths: the screenshot etalons have long names.
function addSlot(repo: string, slot: string, sha: string): void {
  try {
    fs.mkdirSync(path.dirname(slot), { recursive: true });
    git(repo, ["-c", "core.longpaths=true", "worktree", "add", "--detach", "--", slot, sha]);
  } catch(e: unknown) {
    const msg = String((e as Error).message || e).split("\n").filter((l: string) => /error|fatal/.test(l)).join(" ").substring(0, 300);
    throw new InfraError("checkout of " + sha.substring(0, 9) + " in " + path.basename(slot) + " failed: " + msg);
  }
}

function copyOut(from: string, to: string): boolean {
  if (!fs.existsSync(from)) return false;
  fs.cpSync(from, to, { recursive: true });
  return true;
}

export async function buildAt(o: BuildOptions, spec: BuildSpec): Promise<Build> {
  const { role, sha } = spec;
  const slot = slotDir(o.work, role);
  const b = o.project.build;
  const res: Build = { role: role, sha: sha, core: null, ui: {}, uiMissing: {}, uiFailed: {}, logs: [], deps: [], node: process.version };
  const logOf = (pkg: string): string => {
    const f = path.join(o.logs, "build-" + role + "-" + pkg + ".log");
    if (res.logs.indexOf(f) < 0) res.logs.push(f);
    return f;
  };
  try {
    addSlot(o.repo, slot, sha);
    await o.npm.install(slot, "build-" + role + "-root", true);
    const coreDir = path.join(slot, b.core.dir);
    const coreName = path.basename(b.core.dir);
    await o.npm.install(coreDir, "build-" + role + "-" + coreName, false);
    const browser = o.suites.filter((s: string) => isBrowser(o.m.suites[s]));
    const scripts = JSON.parse(fs.readFileSync(path.join(coreDir, "package.json"), "utf8")).scripts || {};
    for (const step of coreSteps(scripts, b.core, browser.length > 0)) {
      if (!await o.npm.run(coreDir, step, logOf(coreName))) {
        res.failed = coreName + " does not build";
        return res;
      }
    }
    if (!copyOut(path.join(coreDir, b.core.out), path.join(o.dest, coreName))) {
      res.failed = coreName + " does not build";
      return res;
    }
    res.core = path.join(o.dest, coreName);
    const dirs = [slot, coreDir];
    for (const s of browser) {
      const pkg = o.m.suites[s].package as string;
      const dir = path.join(slot, uiDir(o.project, pkg));
      if (!fs.existsSync(path.join(dir, "package.json"))) {
        res.uiMissing[s] = "no " + pkg + " at " + sha.substring(0, 7);
        continue;
      }
      // A UI package that does not install fails its suite only, as one that does not build (R11): survey-core and
      // the other packages stay.
      try {
        await o.npm.install(dir, "build-" + role + "-" + pkg, false);
      } catch(e: unknown) {
        if (!(e instanceof InfraError)) throw e;
        if (e.log && res.logs.indexOf(e.log) < 0) res.logs.push(e.log);
        res.uiMissing[s] = "build failed";
        res.uiFailed[s] = { reason: e.message, log: e.log };
        continue;
      }
      dirs.push(dir);
      if (!await o.npm.run(dir, b.ui.script, logOf(pkg)) || !copyOut(path.join(dir, b.ui.out), path.join(o.dest, pkg))) {
        res.uiMissing[s] = "build failed";
        res.uiFailed[s] = { reason: pkg + " does not build", log: logOf(pkg) };
        continue;
      }
      res.ui[s] = path.join(o.dest, pkg);
    }
    res.deps = installedList(dirs);
    return res;
  } catch(e: unknown) {
    if (!(e instanceof InfraError)) throw e;
    return { role: role, sha: sha, core: null, ui: {}, uiMissing: {}, uiFailed: {}, failed: e.message, logs: e.log ? [e.log] : [], deps: [], node: process.version };
  }
}

// The runner's install: the project's folders, then the optional ones the checkout has, one after another.
// The frameworks' pins are installed here, so the suites install nothing.
export async function installTool(npm: Npm, tool: string, p: Project): Promise<void> {
  const dirs = p.tool.dirs.concat(p.tool.optional.filter((d: string) => fs.existsSync(path.join(tool, d))));
  for (const d of dirs) {
    await npm.install(path.join(tool, d), "tool-" + (d === "." ? "root" : d.replace(/[\\/]/g, "-")), false);
  }
}
