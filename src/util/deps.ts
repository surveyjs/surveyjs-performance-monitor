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
