import { describe, test, expect } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { reportMessage, plainMessage, writeMessage, limits } from "../src/discord.ts";
import { overviewText } from "../src/overview.ts";
import { loadProject } from "../src/project.ts";
import { matrix, hotRow } from "./helpers/matrix.ts";
import type { SuiteMatrix } from "../src/report.ts";
import type { BuildSpec } from "../src/versions.ts";

const project = loadProject(path.join(import.meta.dirname, "..", "projects"), "survey-library");
const other = loadProject(path.join(import.meta.dirname, "fixtures", "projects"), "other");
const specs: BuildSpec[] = [
  { role: "today", sha: "a".repeat(40), date: "2026-11-12T08:00:00Z" },
  { role: "yesterday", sha: "b".repeat(40), date: "2026-11-11T08:00:00Z" },
  { role: "week", sha: "c".repeat(40), date: "2026-11-05T08:00:00Z" },
  { role: "month", sha: "d".repeat(40), date: "2026-10-13T08:00:00Z" }
];
const base = { project: project, specs: specs, matrices: [matrix("core")], commits: [], overview: true, files: ["overview.png"] };
const make = (o: Record<string, unknown> = {}) => reportMessage({ ...base, ...o } as any);
const embedText = (m: ReturnType<typeof make>) => m.payload.embeds.map((e) => (e.title || "") + (e.description || "")).join("");

describe("reportMessage", () => {
  test("content is the icon and the kind", () => {
    expect(make().payload.content).toBe("📊 survey-library nightly");
    expect(make({ notes: ["a", "b"] }).payload.content).toBe("📊 survey-library nightly\na\nb");
  });
  test("icons: 🔺 slower than yesterday, ⚠️ for failures and it wins", () => {
    expect(make({ matrices: [matrix("core", { up: { yesterday: 1 } })] }).payload.content).toBe("🔺 survey-library nightly");
    expect(make({ matrices: [matrix("core", { up: { week: 1 } })] }).payload.content).toBe("📊 survey-library nightly");
    expect(make({ matrices: [matrix("core", { na: { week: { x: 1 } } })] }).payload.content).toBe("📊 survey-library nightly");
    const bad: Array<Partial<SuiteMatrix>> = [{ failed: [{ role: "week" as const, kind: "build failed" as const, reason: "r" }] }, { failedToday: [{ id: "a", error: "e" }] }, { incomplete: { week: 1 } }, { notRun: ["month" as const] }];
    for (const b of bad) expect(make({ matrices: [matrix("core", { up: { yesterday: 1 }, ...b })] }).payload.content).toBe("⚠️ survey-library nightly");
  });
  test("overview.png is the first attachment, then a file per suite", () => {
    const files = ["overview.png", "core.md", "react.md", "survey-js-ui.md", "results.tar.gz"];
    const m = make({ files: files });
    expect(m.payload.attachments!.map((a) => a.filename)).toEqual(files);
    expect(m.files).toEqual(files);
    expect(m.payload.embeds.some((e) => "image" in e)).toBe(false);
  });
  test("without the picture the summary goes to content", () => {
    const m = make({ overview: false, files: ["core.md"], matrices: [matrix("core", { down: { week: 3 } })] });
    expect(m.payload.content).toContain(overviewText([matrix("core", { down: { week: 3 } })])[0]);
    expect(m.payload.content).toContain("overview.png failed");
  });
  test("builds embed links every commit with its date", () => {
    const m = make({ project: other });
    const e = m.payload.embeds[0];
    expect(e.title).toBe("Builds");
    for (const s of specs) expect(e.description).toContain(other.repo + "/commit/" + s.sha);
    expect(e.description).toContain("12.11.2026");
    expect(e.description).toContain("13.10.2026");
    expect(m.payload.content).toBe("📊 other nightly");
  });
  test("commits embed", () => {
    const commits = Array.from({ length: 20 }, (_, i) => ({ sha: "e".repeat(40), pr: 100 + i, title: "t" + i, url: "https://x/" + i }));
    const e = make({ commits: commits }).payload.embeds[1];
    expect(e.title).toContain("Commits since yesterday");
    expect(e.description!.split("\n")).toHaveLength(16);
    expect(e.description).toContain("+5 more");
  });
  test("a suite embed only for changes against yesterday", () => {
    const quiet = matrix("core", { up: { week: 1, month: 2 }, na: { week: { x: 4 } } });
    expect(make({ matrices: [quiet] }).payload.embeds.map((e) => e.title)).toEqual(["Builds"]);
    const rows = Array.from({ length: 12 }, (_, i) => hotRow("s" + i, "yesterday", 0.31 + i / 100));
    const hot = matrix("core", { rows: rows, up: { yesterday: 12 } });
    const e = make({ matrices: [hot] }).payload.embeds.find((x) => x.title!.startsWith("core"))!;
    const lines = e.description!.split("\n");
    expect(lines).toHaveLength(9);
    expect(lines[8]).toBe("… +4 in core.md");
    const one = hotRow("records-1k/records/next@orders");
    one.cells.week = { median: 245, delta: -0.02, flags: [], counterDiffs: [] };
    one.cells.month = { mark: "n/a", flags: [], counterDiffs: [] };
    const e2 = make({ matrices: [matrix("core", { rows: [one], up: { yesterday: 1 } })] }).payload.embeds[1];
    expect(e2.description).toBe("`records-1k/records/next@orders` 240 ms · y 🔴 +31% · w −2% · m n/a");
  });
  test("a counterOnly scenario: its work verdict, never its time", () => {
    const timeOnly = hotRow("manyPages/pages/last");
    timeOnly.counterOnly = true;
    const quiet = matrix("core", { rows: [timeOnly] });
    expect(make({ matrices: [quiet] }).payload.embeds.map((e) => e.title)).toEqual(["Builds"]);
    const work = hotRow("records-10k/output/dispose", "yesterday", -0.41);
    work.counterOnly = true;
    work.cells.yesterday!.counterVerdict = "up";
    work.cells.yesterday!.counterDiffs = ["expressionRuns 0 → 12", "rowsCreated 0 → 5"];
    work.cells.week = { median: 250, delta: -0.04, flags: [], counterDiffs: [] };
    const plain = hotRow("manyPages/pages/validate", "yesterday", 0.27);
    const r = make({ matrices: [matrix("core", { rows: [plain, work], up: { yesterday: 2 } })] });
    const e = r.payload.embeds.find((x) => x.title!.startsWith("core"))!;
    expect(e.title).toBe("core · 2 slower vs yesterday");
    expect(e.description!.split("\n")).toEqual([
      "`manyPages/pages/validate` 240 ms · y 🔴 +27%",
      "`records-10k/output/dispose` 240 ms · y 🔴 work: expressionRuns 0 → 12 · w −4%"
    ]);
    expect(r.payload.content).toBe("🔺 survey-library nightly");
  });
  test("limits hold for a huge report", () => {
    const mats = ["core", "react", "survey-js-ui", "vue3", "angular"].map((s) => matrix(s, {
      rows: Array.from({ length: 300 }, (_, i) => hotRow(s + "/very/long/scenario/id/number/" + "x".repeat(60) + i)), up: { yesterday: 300 },
      failed: [{ role: "week", kind: "build failed", reason: "r", log: "/x/build-week-a.log", tail: Array.from({ length: 9 }, () => "e".repeat(400)) }]
    }));
    const commits = Array.from({ length: 40 }, (_, i) => ({ sha: "e".repeat(40), pr: 100 + i, title: "t".repeat(300), url: "https://x/" + i }));
    const files = ["overview.png"].concat(Array.from({ length: 11 }, (_, i) => "f" + i + ".md"));
    const m = make({ matrices: mats, commits: commits, files: files, notes: ["n".repeat(3000)] });
    expect(m.payload.content.length).toBeLessThanOrEqual(limits.content);
    for (const e of m.payload.embeds) expect(e.description!.length).toBeLessThanOrEqual(limits.description);
    expect(m.payload.embeds.reduce((s, e) => s + (e.title || "").length + (e.description || "").length, 0)).toBeLessThanOrEqual(limits.total);
    expect(m.payload.embeds.length).toBeLessThanOrEqual(limits.embeds);
    expect(m.payload.attachments!.length).toBeLessThanOrEqual(limits.files);
    expect(m.files[0]).toBe("overview.png");
  });
  test("a failed column attaches its log and shows the tail", () => {
    const m = matrix("core", { failed: [{ role: "week", kind: "build failed", reason: "survey-core does not build", log: "/x/build-week-survey-core.log", tail: ["ERR! x", "ERR! y"] }] });
    const files = ["overview.png", "core.md", "results.tar.gz", "build-week-survey-core.log"];
    const r = make({ matrices: [m], files: files });
    const e = r.payload.embeds.find((x) => x.title!.startsWith("core"))!;
    expect(e.description).toContain("**week: build failed**");
    expect(e.description).toContain("ERR! y");
    expect(r.payload.attachments![3].filename).toBe("build-week-survey-core.log");
    expect(r.payload.content).toBe("⚠️ survey-library nightly");
  });
  test("a failed suite is headed suite failed", () => {
    const m = matrix("core", { failed: [{ role: "month", kind: "suite failed", reason: "exit 1", log: "/x/suite-core-month.log" }] });
    const e = make({ matrices: [m] }).payload.embeds.find((x) => x.title!.startsWith("core"))!;
    expect(e.description).toContain("**month: suite failed**");
  });
  test("the dependency changes of today against yesterday are a line of content, not of the builds embed", () => {
    const m = make({ notes: ["stopped by a signal: 5 of 12 runs not run"], depsNote: "rollup 4.34.8 -> 4.35.0, +left_pad@1.3.0" });
    expect(m.payload.content).toBe("📊 survey-library nightly\nstopped by a signal: 5 of 12 runs not run\ndeps vs yesterday: rollup 4.34.8 -\\> 4.35.0, +left\\_pad@1.3.0");
    expect(embedText(m)).not.toContain("rollup");
    expect(make().payload.content).toBe("📊 survey-library nightly");
  });
  test("notes are shown", () => {
    expect(make({ notes: ["cancelled: 2 scenarios not measured"] }).payload.content.split("\n")[1]).toBe("cancelled: 2 scenarios not measured");
  });
});

describe("messages on disk", () => {
  test("writeMessage writes the files, files.txt and payload.json", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "msg-"));
    const src = path.join(dir, "src");
    fs.mkdirSync(src);
    fs.writeFileSync(path.join(src, "a.txt"), "a");
    const out = path.join(dir, "1-result");
    writeMessage(out, plainMessage("hi", ["a.txt", "gone.txt"]), { "a.txt": path.join(src, "a.txt") });
    expect(fs.readFileSync(path.join(out, "files.txt"), "utf8")).toBe("a.txt\n");
    expect(JSON.parse(fs.readFileSync(path.join(out, "payload.json"), "utf8")).attachments).toEqual([{ id: 0, filename: "a.txt" }]);
    expect(fs.readFileSync(path.join(out, "a.txt"), "utf8")).toBe("a");
  });
  test("a Creator night names both commits and lists both ranges", () => {
    const creator = loadProject(path.join(import.meta.dirname, "..", "projects"), "survey-creator");
    const lib = "f".repeat(40);
    const withLib = specs.map((s) => ({ ...s, lib: { sha: lib, date: s.date } }));
    const list = (tag: string) => Array.from({ length: 3 }, (_, i) => ({ sha: "e".repeat(40), pr: 100 + i, title: tag + i, url: "https://x/" + tag + i }));
    const m = make({ project: creator, specs: withLib, commits: list("c"), libCommits: list("l") });
    expect(m.payload.content).toBe("📊 survey-creator nightly");
    const builds = m.payload.embeds[0].description as string;
    expect(builds).toContain("library [" + lib.slice(0, 9) + "](https://github.com/surveyjs/survey-library/commit/" + lib + ")");
    const titles = m.payload.embeds.map((e) => e.title);
    expect(titles).toContain("Commits since yesterday (3)");
    expect(titles).toContain("survey-library commits since yesterday (3)");
  });
  test("two commit lists leave room for the suites", () => {
    const list = (tag: string) => Array.from({ length: 200 }, (_, i) => ({ sha: "e".repeat(40), pr: 1000 + i, title: tag + " a rather long commit subject number " + i, url: "https://github.com/surveyjs/survey-library/pull/" + i }));
    const creator = loadProject(path.join(import.meta.dirname, "..", "projects"), "survey-creator");
    const ms = ["a", "b", "c", "d", "e"].map((n) => matrix(n, { up: { yesterday: 20 }, rows: Array.from({ length: 20 }, (_, i) => hotRow("row " + n + i)) }));
    const m = make({ project: creator, matrices: ms, commits: list("c"), libCommits: list("l") });
    const total = m.payload.embeds.reduce((s, e) => s + (e.title || "").length + (e.description || "").length + (e.footer ? e.footer.text.length : 0), 0);
    expect(total).toBeLessThanOrEqual(limits.total);
    expect(m.payload.embeds.length).toBeLessThanOrEqual(limits.embeds);
    for (const n of ["a", "b", "c", "d", "e"]) expect(m.payload.embeds.some((e) => (e.title || "").startsWith(n + " "))).toBe(true);
  });
});
