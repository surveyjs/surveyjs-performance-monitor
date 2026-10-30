import * as fs from "node:fs";
import * as path from "node:path";

// Atomic: a temp file, then a rename, so a reader never sees half a file.
export function writeJsonAtomic(file: string, value: any): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + "." + process.pid + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2) + "\n");
  fs.renameSync(tmp, file);
}
