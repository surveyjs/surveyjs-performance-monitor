import { describe, test, expect } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { cellParts, overviewHtml, overviewText, overviewHeight, chromePath, renderPng, renderWithin, heightOf } from "../src/overview.ts";
import { durationText } from "../src/util/format.ts";
import { matrix, hotRow } from "./helpers/matrix.ts";

const html = (matrices = [matrix("core")], extra: Record<string, unknown> = {}) =>
  overviewHtml({ project: "survey-library", kind: "nightly", sha: "7c92c9c4a1234", date: new Date("2026-11-12T09:37:00Z"), durationMin: 87, matrices: matrices, ...extra } as any);

describe("cellParts", () => {
  test("a cell lists slower, faster and n/a, only the non-zero ones", () => {
    const m = matrix("core", { up: { week: 2 }, down: { week: 15 }, na: { week: { "x": 34 } } });
    expect(cellParts(m, "week")).toEqual([{ text: "2 slower", cls: "bad" }, { text: "15 faster", cls: "good" }, { text: "34 n/a", cls: "na" }]);
    expect(cellParts(m, "month")).toEqual([{ text: "—", cls: "none" }]);
  });
  test("a cell without a result says why", () => {
    const row = { id: "a", cells: { yesterday: { mark: "same" as const, reason: "today", flags: [], counterDiffs: [] } } };
    expect(cellParts(matrix("core", { rows: [row] }), "yesterday")).toEqual([{ text: "= today", cls: "na" }]);
    expect(cellParts(matrix("core", { failed: [{ role: "week", kind: "build failed", reason: "r" }] }), "week")).toEqual([{ text: "build failed", cls: "bad" }]);
    const sf = matrix("core", { failed: [{ role: "week", kind: "suite failed", reason: "r" }] });
    expect(cellParts(sf, "week")).toEqual([{ text: "suite failed", cls: "bad" }]);
    expect(overviewText([sf])[0]).toContain("7d suite failed");
    expect(cellParts(matrix("core", { notRun: ["month"] }), "month")).toEqual([{ text: "not run", cls: "na" }]);
    expect(cellParts(matrix("core", { incomplete: { week: 3 } }), "week")[0].text).toBe("incomplete 3");
    const noisy = cellParts(matrix("core", { up: { week: 1 }, noisy: ["week"], flagged: { week: 2 } }), "week");
    expect(noisy.slice(-2)).toEqual([{ text: "noisy", cls: "na" }, { text: "2 ⚑", cls: "na" }]);
  });
});

// Today without a result (I1): no row compares with it, so a cell must not say "—" (nothing changed).
describe("today without a result", () => {
  const roles = ["yesterday", "week", "month"] as const;
  const noToday = [{ text: "no today", cls: "na" }];
  test("today's suite failed: the suite cell says so in red, the cells say no today", () => {
    const m = matrix("react", { failed: [{ role: "today", kind: "suite failed", reason: "no result file (exit 1)" }] });
    for (const r of roles) expect(cellParts(m, r)).toEqual(noToday);
    const h = html([m]);
    expect(h).toMatch(/<td class="s">react <span class="fail">· today suite failed<\/span><\/td>/);
    expect(h).not.toContain("—");
    expect(overviewText([m])).toEqual(["**react** · today suite failed · 1d no today · 7d no today · 30d no today"]);
  });
  test("today's build failed: the same, and a failed old build still shows its own failure", () => {
    const m = matrix("react", { failed: [{ role: "today", kind: "build failed", reason: "survey-react-ui does not build" }, { role: "month", kind: "build failed", reason: "r" }],
      notRun: ["yesterday", "week"] });
    expect(cellParts(m, "yesterday")).toEqual(noToday);
    expect(cellParts(m, "week")).toEqual(noToday);
    expect(cellParts(m, "month")).toEqual([{ text: "build failed", cls: "bad" }]);
    expect(html([m])).toMatch(/<td class="s">react <span class="fail">· today build failed<\/span><\/td>/);
    expect(overviewText([m])).toEqual(["**react** · today build failed · 1d no today · 7d no today · 30d build failed"]);
  });
  test("today incomplete without a row: the suite cell says incomplete N, the cells no today", () => {
    const m = matrix("core", { incomplete: { today: 12, week: 2 }, up: { week: 1 } });
    for (const r of roles) expect(cellParts(m, r)).toEqual(noToday);
    expect(html([m])).toMatch(/<td class="s">core <span class="fail">· today incomplete 12<\/span><\/td>/);
    expect(overviewText([m])).toEqual(["**core** · today incomplete 12 · 1d no today · 7d no today · 30d no today"]);
  });
  test("today partly incomplete: the cells keep their parts, the suite cell says incomplete N", () => {
    const m = matrix("core", { rows: [hotRow("a", "week")], incomplete: { today: 3 }, up: { week: 1 }, failedToday: [{ id: "b", error: "e" }] });
    expect(cellParts(m, "week")).toEqual([{ text: "1 slower", cls: "bad" }]);
    expect(cellParts(m, "month")).toEqual([{ text: "—", cls: "none" }]);
    expect(html([m])).toContain('<td class="s">core <span class="fail">· 1 failed</span> <span class="fail">· today incomplete 3</span></td>');
    expect(overviewText([m])[0]).toBe("**core** · 1 failed · today incomplete 3 · 1d — · 7d 1 slower · 30d —");
  });
  test("on demand the reference is the branch", () => {
    const m = matrix("core", { roles: ["branch", "base"], failed: [{ role: "branch", kind: "build failed", reason: "r" }] });
    expect(cellParts(m, "base")).toEqual([{ text: "no branch", cls: "na" }]);
    expect(overviewText([m])).toEqual(["**core** · branch build failed · base no branch"]);
  });
});

describe("overviewHtml", () => {
  test("the table: SUITE · 1D · 7D · 30D with fixed widths", () => {
    const h = html();
    expect(h).toContain("<th>suite</th><th>1d</th><th>7d</th><th>30d</th>");
    expect(h).toContain("table-layout:fixed");
    expect(h).toContain('<col style="width:28%"><col style="width:23%"><col style="width:23%"><col style="width:26%">');
    // A long cell wraps between its parts inside its column instead of running into the next one (I3).
    expect(h).toMatch(/td\{[^}]*white-space:normal/);
    expect(h).toMatch(/td span\{white-space:nowrap\}/);
    expect(html([matrix("core", { up: { week: 2 }, down: { week: 1 } })])).toContain('2 slower</span>&nbsp;<span class="na">·</span> <span class="good">1 faster</span>');
    expect(html([matrix("core", { roles: ["branch", "base"] })], { kind: "on-demand" })).toContain("<th>base</th>");
  });
  test("failed on today stands next to the suite", () => {
    const f = html([matrix("core", { failedToday: [{ id: "a", error: "e" }, { id: "b", error: "e" }] })]);
    expect(f).toMatch(/class="fail"[^>]*>[^<]*· 2 failed/);
    expect(html()).not.toContain("failed");
  });
  test("head and legend", () => {
    const h = html([matrix("<x>")]);
    expect(h).toContain("survey-library · 7c92c9c4a");
    expect(h).not.toContain("7c92c9c4a1");
    expect(h).toContain("12.11.2026 09:37 UTC");
    expect(h).toContain("1 h 27 min");
    expect(h).toContain("slower / faster: over 25% · n/a: see &lt;suite&gt;.md");
    expect(h).toContain("&lt;x&gt;");
    expect(h).not.toContain("<x>");
  });
});

describe("overviewText", () => {
  test("the text form for when the picture fails", () => {
    const m = matrix("core", { down: { week: 15, month: 10 }, na: { month: { r: 34 } } });
    expect(overviewText([m])).toEqual(["**core** 1d — · 7d 15 faster · 30d 10 faster · 34 n/a"]);
    const f = overviewText([{ ...m, failedToday: [{ id: "a", error: "" }, { id: "b", error: "" }] }]);
    expect(f[0]).toBe("**core** · 2 failed · 1d — · 7d 15 faster · 30d 10 faster · 34 n/a");
  });
});

describe("durationText and height", () => {
  test("forms", () => {
    expect(durationText(48)).toBe("48 min");
    expect(durationText(87)).toBe("1 h 27 min");
  });
  test("the window fits the content: 94 px of head, header row and legend, 35 px a row", () => {
    // Measured 13.11 in the image's Chromium (Liberation Sans): the page is 94 + 34 px a row, 35 with the ⚑ glyph from a
    // fallback font. The old 80 + 37 px a row cut 11 px off a one-row picture.
    expect(overviewHeight(1)).toBe(129);
    expect(overviewHeight(3)).toBe(199);
    expect(overviewHeight(5)).toBe(269);
  });
});

describe("chromePath", () => {
  test("finds the versioned folder", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "chrome-"));
    expect(chromePath(root)).toBeNull();
    const dir = path.join(root, "chromium-1200", "chrome-linux64");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "chrome"), "");
    expect(chromePath(root)).toBe(path.join(dir, "chrome"));
    expect(chromePath(path.join(root, "nope"))).toBeNull();
  });
});

describe("the measured height", () => {
  test("heightOf reads the height the measuring script wrote on <html>", () => {
    expect(heightOf('<html lang="x" data-height="321"><head></head><body></body></html>')).toBe(321);
    expect(heightOf("<html><head></head><body>data-height=\"321\"</body></html>")).toBeNull();
    expect(heightOf("")).toBeNull();
    expect(heightOf('<html data-height="12">')).toBeNull();
    expect(heightOf('<html data-height="99999">')).toBeNull();
    expect(heightOf('<html data-height="3e2">')).toBeNull();
  });
});

describe("renderPng", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "png-"));
  function fake(name: string, body: string): string {
    const f = path.join(dir, name);
    fs.writeFileSync(f, "#!/usr/bin/env node\n" + body);
    fs.chmodSync(f, 0o755);
    return f;
  }
  const png = "const fs=require('fs');const o=process.argv.find(a=>a.startsWith('--screenshot=')).slice(13);";
  test("never throws", async () => {
    const argvFile = path.join(dir, "argv.json");
    const good = fake("good", png + "fs.writeFileSync(o,Buffer.from([137,80,78,71,13,10,26,10]));fs.writeFileSync(" + JSON.stringify(argvFile) + ",JSON.stringify(process.argv));");
    const out = path.join(dir, "o", "overview.png");
    fs.mkdirSync(path.dirname(out));
    const log = path.join(dir, "r.log");
    expect(await renderPng("<html></html>", out, { chrome: good, rows: 3, logFile: log })).toBe(true);
    const argv: string[] = JSON.parse(fs.readFileSync(argvFile, "utf8"));
    expect(argv).toContain("--headless");
    expect(argv).toContain("--window-size=728," + overviewHeight(3));
    expect(argv).toContain("--force-device-scale-factor=2");
    expect(fs.readFileSync(path.join(dir, "o", "overview.html"), "utf8")).toBe("<html></html>");
    expect(await renderPng("x", out, { chrome: fake("bad", "process.exit(1)"), rows: 3, logFile: log })).toBe(false);
    fs.rmSync(out, { force: true });
    expect(await renderPng("x", out, { chrome: fake("text", png + "fs.writeFileSync(o,'not a png at all')"), rows: 3, logFile: log })).toBe(false);
    expect(await renderPng("x", out, { chrome: null, rows: 3, logFile: log })).toBe(false);
    expect(await renderPng("x", out, { chrome: path.join(dir, "missing"), rows: 3, logFile: log })).toBe(false);
  });
});

// A fake Chromium: --dump-dom prints the page with the height its script would write (FAKE_DUMP: "fail" exits 1, "hang"
// sleeps), --screenshot writes a PNG (FAKE_SHOT: "hang" sleeps, unless the file FAKE_SHOT_ONCE exists, which the first
// hung call makes). Each call appends its argv to FAKE_ARGV.
describe("measuring, then the screenshot", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "png-measure-"));
  const chrome = path.join(dir, "chrome");
  fs.writeFileSync(chrome, "#!/usr/bin/env node\nconst fs = require('fs');\nconst a = process.argv.slice(2);\nconst e = process.env;\n" +
    "fs.appendFileSync(e.FAKE_ARGV, JSON.stringify(a) + '\\n');\n" +
    "const sleep = () => setTimeout(() => {}, 30000);\n" +
    "if (a.includes('--dump-dom')) {\n" +
    "  const page = a[a.length - 1].replace('file://', '');\n" +
    "  fs.writeFileSync(e.FAKE_ARGV + '.page', fs.readFileSync(page, 'utf8'));\n" +
    "  if (e.FAKE_DUMP === 'fail') process.exit(1);\n" +
    "  if (e.FAKE_DUMP === 'hang') sleep();\n" +
    "  else process.stdout.write('<html data-height=\"' + (e.FAKE_HEIGHT || '321') + '\"><head></head><body></body></html>\\n');\n" +
    "} else {\n" +
    "  const o = a.find((x) => x.startsWith('--screenshot=')).slice(13);\n" +
    "  if (e.FAKE_SHOT === 'hang' && !fs.existsSync(e.FAKE_SHOT_ONCE)) { fs.writeFileSync(e.FAKE_SHOT_ONCE, ''); sleep(); }\n" +
    "  else fs.writeFileSync(o, Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));\n" +
    "}\n");
  fs.chmodSync(chrome, 0o755);
  const argvFile = path.join(dir, "argv.jsonl");
  const calls = (): Array<Array<string>> => fs.readFileSync(argvFile, "utf8").split("\n").filter((l) => !!l).map((l) => JSON.parse(l));
  const env = (vars: Record<string, string>): void => {
    for (const k of ["FAKE_DUMP", "FAKE_SHOT", "FAKE_HEIGHT"]) delete process.env[k];
    Object.assign(process.env, { FAKE_ARGV: argvFile, FAKE_SHOT_ONCE: path.join(dir, "shot-once") }, vars);
    fs.rmSync(argvFile, { force: true });
    fs.rmSync(path.join(dir, "shot-once"), { force: true });
  };
  const out = path.join(dir, "o", "overview.png");
  const log = path.join(dir, "r.log");
  const page = "<!doctype html><html><head></head><body><table></table>\n</body></html>\n";

  test("the window takes the height measured in Chromium", async () => {
    env({ FAKE_HEIGHT: "321" });
    expect(await renderPng(page, out, { chrome: chrome, rows: 3, logFile: log })).toBe(true);
    const [dump, shot] = calls();
    expect(dump).toContain("--dump-dom");
    expect(shot).toContain("--window-size=728,321");
    // The same flags apart from what each pass writes.
    const same = (a: Array<string>): Array<string> => a.filter((x) => x !== "--dump-dom" && !x.startsWith("--screenshot=") && !x.startsWith("file://") && !x.startsWith("--window-size="));
    expect(same(dump)).toEqual(same(shot));
    // The same page with the measuring script; it is gone afterwards and the page that was shot is the page.
    const measured = fs.readFileSync(argvFile + ".page", "utf8");
    expect(measured.replace(/<script>[^<]*<\/script>\n/, "")).toBe(page);
    expect(measured).toMatch(/<script>[^<]*data-height[^<]*<\/script>\n<\/body>/);
    expect(fs.readdirSync(path.dirname(out)).sort()).toEqual(["overview.html", "overview.png"]);
    expect(fs.readFileSync(path.join(path.dirname(out), "overview.html"), "utf8")).toBe(page);
  });

  test("a measuring pass that fails or hangs leaves the formula's height", async () => {
    env({ FAKE_DUMP: "fail" });
    expect(await renderPng(page, out, { chrome: chrome, rows: 3, logFile: log })).toBe(true);
    expect(calls()[1]).toContain("--window-size=728," + overviewHeight(3));
    env({ FAKE_DUMP: "hang" });
    const t0 = Date.now();
    expect(await renderPng(page, out, { chrome: chrome, rows: 2, logFile: log, measureMs: 500 })).toBe(true);
    expect(Date.now() - t0).toBeLessThan(5000);
    expect(calls()[1]).toContain("--window-size=728," + overviewHeight(2));
    env({ FAKE_HEIGHT: "nonsense" });
    expect(await renderPng(page, out, { chrome: chrome, rows: 1, logFile: log })).toBe(true);
    expect(calls()[1]).toContain("--window-size=728," + overviewHeight(1));
  });

  test("a SIGTERM during the render stops Chromium at once, then 10 s are left for one more try", async () => {
    env({ FAKE_SHOT: "hang" });
    const night = new AbortController();
    const t0 = Date.now();
    const running = renderWithin(page, out, { chrome: chrome, rows: 3, logFile: log }, night.signal, { budget: 60000, afterStop: 3000 });
    await new Promise<void>((resolve) => { const t = setInterval(() => { if (fs.existsSync(path.join(dir, "shot-once"))) { clearInterval(t); resolve(); } }, 20); });
    night.abort();
    expect(await running).toBe(true);
    expect(Date.now() - t0).toBeLessThan(10000);
    expect(calls().filter((a) => a.some((x) => x.startsWith("--screenshot="))).length).toBe(2);
    // Stopped before the render: one try within the short budget.
    env({});
    expect(await renderWithin(page, out, { chrome: chrome, rows: 3, logFile: log }, night.signal, { budget: 60000, afterStop: 3000 })).toBe(true);
    expect(calls().filter((a) => a.some((x) => x.startsWith("--screenshot="))).length).toBe(1);
  });
});
