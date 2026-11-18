// The build of one role: a slot (a git worktree in <work>/build-<role>) is installed and built, and the outputs are
// copied to the folder `dest`, which is what gets measured.
import * as fs from "node:fs";
import * as path from "node:path";
import { git } from "./util/git.ts";
import { runLogged } from "./util/proc.ts";
import { installedList } from "./util/deps.ts";
import { InfraError, UsageError } from "./errors.ts";
import { parseCommand } from "./contract.ts";
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
  // A two-repo build: the library commit, and per suite the built targets (target variable -> path in `dest`).
  lib?: string;
  targets?: Record<string, Record<string, string>>;
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
  if (!o.project.build) throw new UsageError(o.project.name + " has no build recipe");
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
    const browser = o.suites.filter((s: string) => !!o.m.suites[s].package);
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

// The build of one role of a two-repo project: the library at `spec.lib.sha` and the project at `spec.sha`, side by side
// in the slot, built in the order of the manifest. A build with `suites` that fails fails only those suites.
export async function buildPairAt(o: BuildOptions & { libRepo: string }, spec: BuildSpec): Promise<Build> {
  if (!spec.lib) throw new UsageError("no library commit for " + spec.role);
  const lib = o.m.library;
  const creatorBuilds = o.m.builds;
  if (!lib || !creatorBuilds || !o.m.install) throw new UsageError(o.project.name + " has no two-repo manifest");
  const { role, sha } = spec;
  const slot = slotDir(o.work, role);
  const libSlot = path.join(slot, lib.repo);
  const creatorSlot = path.join(slot, "survey-creator");
  const res: Build = { role: role, sha: sha, core: null, ui: {}, uiMissing: {}, uiFailed: {}, logs: [], deps: [], node: process.version, lib: spec.lib.sha, targets: {} };
  const logOf = (name: string): string => {
    const f = path.join(o.logs, "build-" + role + "-" + name + ".log");
    if (res.logs.indexOf(f) < 0) res.logs.push(f);
    return f;
  };
  // Suites that failed or whose package is missing; a build that has only such suites is skipped.
  const lost = new Set<string>();
  const live = (suites: Array<string>): Array<string> => suites.filter((s: string) => o.suites.indexOf(s) >= 0 && !lost.has(s));
  const built: Array<{ env: string, path: string, suites?: Array<string> }> = [];
  const dirs: Array<string> = [];
  // Runs manifest commands in `cwd`: an install with the given ignoreScripts, a script with its log. Returns false
  // when a script fails.
  const exec = async (cwd: string, name: string, commands: Array<string>, installName: string, ignoreScripts: boolean): Promise<boolean> => {
    for (const c of commands) {
      const cmd = parseCommand(c);
      if (cmd.op === "install") await o.npm.install(cwd, installName, ignoreScripts);
      else if (!await o.npm.run(cwd, cmd.script, logOf(name))) return false;
    }
    return true;
  };
  // One build: `pre` (its installs, scripts on), its commands, the copy. False when the whole build must stop.
  const one = async (b: { env: string, cwd: string, commands: Array<string>, dir: string, suites?: Array<string> }, name: string,
    repoSlot: string, pre: Array<string>, repoSha: string): Promise<boolean> => {
    const active = b.suites ? live(b.suites) : [];
    if (b.suites && active.length === 0) return true;
    const cwd = path.join(repoSlot, b.cwd);
    // A failure of a build with suites loses those suites; of a build without, the whole role.
    const fail = (reason: string, log?: string): boolean => {
      if (!b.suites) {
        res.failed = reason;
        return false;
      }
      for (const s of active) {
        lost.add(s);
        res.uiMissing[s] = "build failed";
        res.uiFailed[s] = { reason: reason, log: log };
      }
      return true;
    };
    if (b.suites && !fs.existsSync(path.join(cwd, "package.json"))) {
      for (const s of active) {
        lost.add(s);
        res.uiMissing[s] = "no " + name + " at " + repoSha.substring(0, 7);
      }
      return true;
    }
    try {
      if (!await exec(cwd, name, pre.concat(b.commands), "build-" + role + "-" + name, false)) return fail(name + " does not build", logOf(name));
    } catch(e: unknown) {
      if (!(e instanceof InfraError)) throw e;
      if (e.log && res.logs.indexOf(e.log) < 0) res.logs.push(e.log);
      return fail(e.message, e.log);
    }
    dirs.push(cwd);
    if (!copyOut(path.join(repoSlot, b.dir), path.join(o.dest, name))) return fail(name + " does not build", logOf(name));
    built.push({ env: b.env, path: path.join(o.dest, name), suites: b.suites });
    return true;
  };
  const failedBuild = (): Build => ({ role: role, sha: sha, core: null, ui: {}, uiMissing: {}, uiFailed: {}, failed: res.failed, logs: res.logs, deps: [], node: process.version, lib: spec.lib?.sha });
  try {
    addSlot(o.libRepo, libSlot, spec.lib.sha);
    addSlot(o.repo, creatorSlot, sha);
    await o.npm.install(libSlot, "build-" + role + "-library-root", true);
    dirs.push(libSlot);
    for (const b of lib.builds) {
      if (!await one(b, b.package, libSlot, ["npm install"], spec.lib.sha)) return failedBuild();
    }
    if (!await exec(creatorSlot, "survey-creator", o.m.install, "build-" + role + "-root", true)) {
      res.failed = "survey-creator does not build";
      return failedBuild();
    }
    dirs.push(creatorSlot);
    for (const b of creatorBuilds) {
      if (!await one(b, path.basename(b.cwd), creatorSlot, b.install, sha)) return failedBuild();
    }
    for (const t of built) {
      if (t.env === "PERF_CORE_DIR") res.core = t.path;
      if (t.env === "PERF_UI_DIR") for (const s of live(t.suites || [])) res.ui[s] = t.path;
    }
    for (const s of o.suites) {
      if (lost.has(s)) continue;
      const tg: Record<string, string> = {};
      for (const t of built) {
        if (!t.suites || t.suites.indexOf(s) >= 0) tg[t.env] = t.path;
      }
      (res.targets as Record<string, Record<string, string>>)[s] = tg;
    }
    res.deps = installedList(dirs);
    return res;
  } catch(e: unknown) {
    if (!(e instanceof InfraError)) throw e;
    res.failed = e.message;
    if (e.log && res.logs.indexOf(e.log) < 0) res.logs.push(e.log);
    return failedBuild();
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

// The runner's own `npm install` follows links such as `../../../survey-library/packages/survey-core/build` (the
// Creator packages point at the sibling library checkout); the suites get the real builds through the target
// variables. So every library build folder is created next to the runner checkout with a stub package.json.
// No-op and [] for a project without a library. Returns the files written.
export function siblingStubs(runner: string, m: Manifest): Array<string> {
  if (!m.library) return [];
  const files: Array<string> = [];
  for (const b of m.library.builds) {
    const dir = path.join(path.dirname(runner), m.library.repo, b.dir);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, "package.json");
    fs.writeFileSync(file, JSON.stringify({ name: b.package, version: "0.0.0", private: true }, null, 2) + "\n");
    files.push(file);
  }
  return files;
}
