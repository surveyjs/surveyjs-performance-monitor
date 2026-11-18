import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { spawn } from "node:child_process";
import type { SuiteMatrix } from "./report.ts";
import type { Role } from "./versions.ts";
import { dateUtc, durationText } from "./util/format.ts";
import { runLogged } from "./util/proc.ts";

// The summary picture of a run (spec, section 5) and its text form for when the picture cannot be made.

export interface CellPart { text: string, cls: "bad" | "good" | "na" | "none" }

const none: CellPart = { text: "—", cls: "none" };

// The reference (today) has no result to compare with: it failed, or it is incomplete without a
// single measured row. Its cells would otherwise read "—", which means "nothing changed".
function referenceMissing(m: SuiteMatrix): boolean {
  const ref = m.roles[0];
  return m.failed.some((f) => f.role === ref) || (m.incomplete[ref] !== undefined && m.rows.length === 0);
}

// What the suite cell says after the name, in red: scenarios that failed on the reference, and the reference's own
// failure or incomplete result (the reasons are in <suite>.md).
export function suiteNotes(m: SuiteMatrix): string[] {
  const ref = m.roles[0];
  const notes: string[] = [];
  if (m.failedToday.length > 0) notes.push(m.failedToday.length + " failed");
  const failed = m.failed.find((f) => f.role === ref);
  if (failed) notes.push(ref + " " + failed.kind);
  if (m.incomplete[ref] !== undefined) notes.push(ref + " incomplete " + m.incomplete[ref]);
  return notes;
}

export function cellParts(m: SuiteMatrix, role: Role): CellPart[] {
  const failed = m.failed.find((f) => f.role === role);
  if (failed) return [{ text: failed.kind, cls: "bad" }];
  // A role left without a job because the reference's build failed is "not run" in <suite>.md; here it is the same "no
  // today" as any role against a reference without a result.
  if (role !== m.roles[0] && referenceMissing(m)) return [{ text: "no " + m.roles[0], cls: "na" }];
  if (m.notRun.indexOf(role) > -1) return [{ text: "not run", cls: "na" }];
  const same = m.rows.map((r) => r.cells[role]).find((c) => !!c && c.mark === "same");
  if (same) return [{ text: "= " + (same.reason || m.roles[0]), cls: "na" }];
  const parts: CellPart[] = [];
  const incomplete = m.incomplete[role];
  if (incomplete !== undefined) parts.push({ text: "incomplete " + incomplete, cls: "bad" });
  const up = m.up[role] || 0;
  const down = m.down[role] || 0;
  const na = Object.values(m.na[role] || {}).reduce((a: number, b: number) => a + b, 0);
  if (up > 0) parts.push({ text: up + " slower", cls: "bad" });
  if (down > 0) parts.push({ text: down + " faster", cls: "good" });
  if (na > 0) parts.push({ text: na + " n/a", cls: "na" });
  if (parts.length === 0) parts.push(none);
  const flagged = m.flagged[role] || 0;
  if (flagged > 0) parts.push({ text: flagged + " ⚑", cls: "na" });
  return parts;
}

const NIGHTLY_COLUMNS: Array<[Role, string]> = [["yesterday", "1d"], ["week", "7d"], ["month", "30d"]];

function html(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function overviewHtml(i: { project: string, sha: string, date: Date, durationMin: number, matrices: SuiteMatrix[] }): string {
  const columns = NIGHTLY_COLUMNS;
  const dim = '<span class="dim">·</span>';
  const rows = i.matrices.map((m: SuiteMatrix) => {
    const notes = suiteNotes(m).map((n: string) => ' <span class="fail">· ' + html(n) + "</span>").join("");
    // A cell stays on one line: a busy night makes the picture wider instead of wrapping.
    const cells = columns.map(([role]) => "<td>" + cellParts(m, role).map((p: CellPart) => '<span class="' + p.cls + '">' + html(p.text) + "</span>").join('&nbsp;<span class="na">·</span> ') + "</td>");
    return '<tr><td class="s">' + html(m.suite) + notes + "</td>" + cells.join("") + "</tr>";
  });
  return '<!doctype html><html><head><meta charset="utf-8"><style>\n' +
    "html,body{margin:0;background:#2b2d31;}\n" +
    'body{font-family:"Liberation Sans",sans-serif;color:#b5bac1;padding:10px 12px;width:max-content;min-width:728px;box-sizing:border-box}\n' +
    "table{border-collapse:collapse;width:100%;table-layout:auto;font-size:15px}\n" +
    "th{font-weight:600;color:#80848e;text-align:left;padding:7px 10px;border-bottom:1px solid #3f4147;font-size:13px;text-transform:uppercase;letter-spacing:.03em}\n" +
    "td{padding:8px 10px;border-bottom:1px solid #35373c;white-space:nowrap}\n" +
    "tr:last-child td{border-bottom:none}\n" +
    "td.s{font-weight:600;color:#c4c9ce}\n" +
    ".bad{color:#c9686a;font-weight:500}.good{color:#5f9e74;font-weight:500}.na{color:#6d7178}.none{color:#5c5f66}\n" +
    ".head{font-size:13px;color:#80848e;margin:2px 10px 6px}.head .dim{color:#5c5f66}.head b{font-weight:500}\n" +
    ".leg{font-size:12px;color:#6d7178;margin:8px 10px 0}.fail{color:#c9686a;font-weight:500;font-size:13px}\n" +
    "</style></head><body>\n" +
    '<div class="head"><b>' + html(i.project) + " · " + html(i.sha.slice(0, 9)) + "</b> " + dim + " " + dateUtc(i.date) + " " + i.date.toISOString().slice(11, 16) + " UTC " + dim + " " + durationText(i.durationMin) + "</div>\n" +
    "<table>\n" +
    "<tr><th>suite</th>" + columns.map(([, label]) => "<th>" + label + "</th>").join("") + "</tr>\n" +
    rows.join("\n") + "\n</table>\n" +
    '<div class="leg">slower / faster: over 25% · n/a: see &lt;suite&gt;.md</div>\n</body></html>\n';
}

// The picture's replacement: a line per suite.
export function overviewText(matrices: SuiteMatrix[]): string[] {
  return matrices.map((m: SuiteMatrix) => {
    const notes = suiteNotes(m);
    const head = notes.length > 0 ? " · " + notes.join(" · ") + " ·" : "";
    return "**" + m.suite + "**" + head + " " + NIGHTLY_COLUMNS.map(([role, label]) => label + " " + cellParts(m, role).map((p: CellPart) => p.text).join(" · ")).join(" · ");
  });
}

// The page's height in Chromium on the runner (measured 13.11): 94 px of head, header row, legend and padding, and 34 px a
// row, 35 when a cell has the ⚑ glyph (a fallback font); a row without it leaves 1 px of empty band at the bottom. Only
// the fallback when the measuring pass gives nothing.
export function overviewHeight(rows: number): number {
  return 94 + 35 * rows;
}

// The measuring pass: the same page with this script at the end of <body>; Chromium's --dump-dom prints the DOM with the
// page's height on <html> and its width (the body's: wider than 728 px on a busy night). The height of <html> is the
// content's (its scrollHeight is never less than the window).
const MEASURE = '<script>document.documentElement.setAttribute("data-height",String(Math.ceil(document.documentElement.getBoundingClientRect().height)));' +
  'document.documentElement.setAttribute("data-width",String(Math.ceil(document.body.getBoundingClientRect().width)))</script>';

// The height the measuring script wrote, or null for anything else (a crash, a page without it, a silly number).
export function heightOf(dom: string): number | null {
  const m = /<html\b[^>]*\sdata-height="(\d+)"/.exec(dom);
  if (!m) return null;
  const h = Number(m[1]);
  return h >= 50 && h <= 20000 ? h : null;
}

// The width the measuring script wrote, or null for anything else (missing, not a whole number, outside 728..4000).
export function widthOf(dom: string): number | null {
  const m = /<html\b[^>]*\sdata-width="(\d+)"/.exec(dom);
  if (!m) return null;
  const w = Number(m[1]);
  return w >= 728 && w <= 4000 ? w : null;
}

// Chromium's stdout (the DOM), its stderr to the log; null when it fails or is stopped. Never throws.
function dumpDom(chrome: string, args: Array<string>, o: { cwd: string, logFile: string, signal: AbortSignal }): Promise<string | null> {
  return new Promise((resolve: (v: string | null) => void) => {
    let out = "";
    try {
      fs.appendFileSync(o.logFile, "$ " + chrome + " " + args.join(" ") + "   (in " + o.cwd + ")\n");
      const proc = spawn(chrome, args, { cwd: o.cwd, stdio: ["ignore", "pipe", "pipe"], signal: o.signal });
      proc.stdout.on("data", (d: Buffer) => { if (out.length < 4 * 1024 * 1024) out += d.toString("utf8"); });
      proc.stderr.on("data", (d: Buffer) => { try { fs.appendFileSync(o.logFile, d); } catch(e) { /* the log is only information */ } });
      proc.on("error", (e: Error) => { if (e.name !== "AbortError") try { fs.appendFileSync(o.logFile, String(e) + "\n"); } catch(x) { /* as above */ } });
      proc.on("close", (code: number | null) => resolve(code === 0 ? out : null));
    } catch(e) {
      resolve(null);
    }
  });
}

// The Chromium of a Playwright install under `root` (by default Playwright's own folder, ~/.cache/ms-playwright, which
// the report job restores from the cache); null when there is none.
export function chromePath(root: string = path.join(os.homedir(), ".cache", "ms-playwright")): string | null {
  let names: string[] = [];
  try {
    names = fs.readdirSync(root).sort();
  } catch(e) {
    return null;
  }
  for (const name of names.filter((n: string) => /^chromium-/.test(n))) {
    let inner: string[] = [];
    try {
      inner = fs.readdirSync(path.join(root, name)).sort();
    } catch(e) {
      continue;
    }
    for (const dir of inner.filter((n: string) => /^chrome-linux/.test(n))) {
      const exe = path.join(root, name, dir, "chrome");
      if (fs.existsSync(exe)) return exe;
    }
  }
  return null;
}

const PNG = [137, 80, 78, 71, 13, 10, 26, 10];

// True when out is a PNG; never throws (no Chromium, a failed run, something else in the file all mean false). First a
// measuring pass (--dump-dom) gives the page's height and width, so a wide or tall page is not cut; when it fails or takes
// longer than measureMs (20 s by default) the window is 728 px wide and overviewHeight(rows) high. Both passes stop with `signal`.
export async function renderPng(htmlText: string, out: string, o: { chrome: string | null, rows: number, logFile: string, signal?: AbortSignal, measureMs?: number }): Promise<boolean> {
  if (!o.chrome) return false;
  try {
    const dir = path.dirname(out);
    const page = path.join(dir, "overview.html");
    const probe = path.join(dir, "overview-measure.html");
    fs.mkdirSync(dir, { recursive: true });
    fs.mkdirSync(path.dirname(o.logFile), { recursive: true });
    fs.writeFileSync(page, htmlText);
    fs.rmSync(out, { force: true });
    const flags = ["--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2"];
    const at = htmlText.lastIndexOf("</body>");
    fs.writeFileSync(probe, at < 0 ? htmlText + MEASURE : htmlText.substring(0, at) + MEASURE + "\n" + htmlText.substring(at));
    const limit = AbortSignal.timeout(o.measureMs || 20000);
    const dom = await dumpDom(o.chrome, flags.concat(["--window-size=728," + overviewHeight(o.rows), "--dump-dom", "file://" + path.resolve(probe)]),
      { cwd: dir, logFile: o.logFile, signal: o.signal ? AbortSignal.any([o.signal, limit]) : limit });
    fs.rmSync(probe, { force: true });
    const height = (dom !== null && heightOf(dom)) || overviewHeight(o.rows);
    const width = (dom !== null && widthOf(dom)) || 728;
    const r = await runLogged(o.chrome, flags.concat(["--window-size=" + width + "," + height, "--screenshot=" + out, "file://" + path.resolve(page)]),
      { cwd: dir, logFile: o.logFile, signal: o.signal });
    if (r.code !== 0 || !fs.existsSync(out)) return false;
    const head = fs.readFileSync(out).subarray(0, 8);
    return PNG.every((b: number, i: number) => head[i] === b);
  } catch(e) {
    return false;
  }
}
