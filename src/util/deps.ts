import * as fs from "node:fs";
import * as path from "node:path";

// name@version of the external packages installed in a package folder (a copy of listInstalled in survey-library's
// perf/harness/node/deps.ts). Linked packages (survey-core in a UI package is a junction to its build) are left out.
// The result file's deps fingerprint is the runner's; this list only feeds the install notes and the bisect ends' diff.
export function listInstalled(packageDir: string): Array<string> {
  const res: Array<string> = [];
  const nm = path.join(packageDir, "node_modules");
  if (!fs.existsSync(nm)) return res;
  const add = (dir: string, name: string): void => {
    const full = path.join(dir, name);
    let stat: fs.Stats;
    try {
      stat = fs.lstatSync(full);
    } catch(e) {
      return;
    }
    if (stat.isSymbolicLink() || !stat.isDirectory()) return;
    const pkgFile = path.join(full, "package.json");
    if (!fs.existsSync(pkgFile)) return;
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
      if (pkg.name && pkg.version) res.push(pkg.name + "@" + pkg.version);
    } catch(e) {
      // An unreadable package.json is left out of the fingerprint.
    }
  };
  for (const entry of fs.readdirSync(nm)) {
    if (entry.charAt(0) === ".") continue;
    if (entry.charAt(0) === "@") {
      const scope = path.join(nm, entry);
      if (!fs.statSync(scope).isDirectory()) continue;
      for (const sub of fs.readdirSync(scope)) add(scope, sub);
    } else {
      add(nm, entry);
    }
  }
  return res;
}

// The full name@version list of several package folders, sorted, for the build notes and the diff between two builds.
export function installedList(dirs: Array<string>): Array<string> {
  const all = new Set<string>();
  dirs.forEach((dir: string) => listInstalled(dir).forEach((p: string) => all.add(p)));
  return Array.from(all).sort();
}

// "rollup 4.34.8 -> 4.35.0, +left-pad@1.3.0, -right-pad@1.0.0", at most `max` items.
export function depsDiff(before: Array<string>, after: Array<string>, max: number = 12): string {
  const split = (list: Array<string>): { [name: string]: string } => {
    const res: { [name: string]: string } = {};
    list.forEach((p: string) => {
      const at = p.lastIndexOf("@");
      res[p.substring(0, at)] = p.substring(at + 1);
    });
    return res;
  };
  const a = split(before);
  const b = split(after);
  const items: Array<string> = [];
  Object.keys(b).sort().forEach((name: string) => {
    if (a[name] === undefined) items.push("+" + name + "@" + b[name]);
    else if (a[name] !== b[name]) items.push(name + " " + a[name] + " -> " + b[name]);
  });
  Object.keys(a).sort().forEach((name: string) => { if (b[name] === undefined) items.push("-" + name + "@" + a[name]); });
  if (items.length <= max) return items.join(", ");
  return items.slice(0, max).join(", ") + ", +" + (items.length - max) + " more";
}
