import * as fs from "node:fs";
import * as path from "node:path";
import type { CommitPr } from "./pr.ts";
import type { BuildSpec, Role } from "./versions.ts";
import type { Project } from "./project.ts";
import type { SuiteMatrix, Row, KindDiff } from "./report.ts";
import { verdictOf, cellTimeVerdict } from "./report.ts";
import { overviewText } from "./overview.ts";
import { pct, fixedMs, stripAnsi, dateUtc } from "./util/format.ts";
import { writeJsonAtomic } from "./util/json.ts";

// The Discord messages: a payload and its files, no network. The report job writes them to its outbox and the post job sends them.
// Limits (docs.discord.com/developers, checked 2026-10-29): content 2,000 characters, 10 embeds, an embed title 256,
// description 4,096, footer 2,048, and 6,000 characters over all embeds of a message; 20 MiB per file. The number of
// files per message is not stated there: we attach at most 10.
export const limits = { content: 2000, embeds: 10, title: 256, description: 4096, footer: 2048, total: 6000, files: 10, fileBytes: 20 * 1024 * 1024 };
export const maxRangeLines = 15;
export const maxSuiteLines = 8;

export interface Embed {
  title?: string;
  description?: string;
  color?: number;
  footer?: { text: string };
}

export interface Payload {
  content: string;
  embeds: Array<Embed>;
  allowed_mentions: { parse: [] };
  attachments?: Array<{ id: number, filename: string }>;
}

export interface Message {
  payload: Payload;
  // File names, in order: files[0], files[1], ...
  files: Array<string>;
}

// Untrusted text (commit subjects, labels, refs, log lines): Markdown escaped, URLs wrapped in <...> so they neither
// format nor unfurl. allowed_mentions stops pings; "<" is escaped too, so a mention cannot even render.
export function escapeText(text: string): string {
  // Colour codes and other control characters go first.
  const plain = String(text).replace(stripAnsi, "").split("").filter((c: string) => c === "\n" || (c.charCodeAt(0) >= 32 && c.charCodeAt(0) !== 127)).join("");
  const parts = plain.split(/(https?:\/\/[^\s<>]+)/);
  return parts.map((part: string, i: number) => (i % 2 === 1 ? "<" + part + ">" : part.replace(/([\\*_~`|>\[\]#<])/g, "\\$1"))).join("");
}

function cut(text: string, max: number): string {
  return text.length <= max ? text : text.substring(0, max - 1) + "…";
}

// Lines that fit max characters, then "+N more"; hidden counts items left out before (the 15-line cut of the range).
export function fitLines(lines: Array<string>, max: number, hidden: number = 0): string {
  const res: Array<string> = [];
  let size = 0;
  for (let i = 0; i < lines.length; i++) {
    const more = "+" + (lines.length - i + hidden) + " more";
    const room = max - size - (i < lines.length - 1 || hidden > 0 ? more.length + 1 : 0);
    if (lines[i].length + 1 > room) {
      res.push(more);
      return res.join("\n");
    }
    res.push(lines[i]);
    size += lines[i].length + 1;
  }
  if (hidden > 0) res.push("+" + hidden + " more");
  return res.join("\n");
}

// The commit range as "[#NNNN](url) title" lines, at most 15.
export function rangeLines(commits: Array<CommitPr>): Array<string> {
  return commits.slice(0, maxRangeLines).map((c: CommitPr) => (c.pr ? "[#" + c.pr + "](" + c.url + ") " : "[" + c.sha.substring(0, 9) + "](" + c.url + ") ") +
    escapeText(cut(c.title, 90)));
}

export function rangeText(commits: Array<CommitPr>, max: number): string {
  return fitLines(rangeLines(commits), max, Math.max(0, commits.length - maxRangeLines));
}

function withAttachments(payload: Payload, files: Array<string>): Message {
  const list = files.slice(0, limits.files);
  payload.attachments = list.map((f: string, i: number) => ({ id: i, filename: f.split(/[\\/]/).pop() as string }));
  return { payload: payload, files: list };
}

const WARN = "⚠️";
const ABBR: Partial<Record<Role, string>> = { yesterday: "y", week: "w", month: "m" };
// The build today is compared with in the post.
const COMPARE: Role = "yesterday";

function icon(matrices: SuiteMatrix[]): string {
  const cmp = COMPARE;
  const failed = matrices.some((m: SuiteMatrix) => m.failed.length > 0 || m.failedToday.length > 0 || Object.keys(m.incomplete).length > 0 || m.notRun.length > 0);
  if (failed) return WARN;
  return matrices.some((m: SuiteMatrix) => (m.up[cmp] || 0) > 0) ? "🔺" : "📊";
}

function median(v: number): string {
  return fixedMs(v, v < 10 ? 2 : v < 100 ? 1 : 0, "?");
}

function scenarioLine(m: SuiteMatrix, row: Row): string {
  const today = row.cells[m.roles[0]];
  const parts = m.roles.slice(1).map((role: Role): string | undefined => {
    const c = row.cells[role];
    if (!c) return undefined;
    const label = ABBR[role] || role;
    if (c.mark === "same") return label + " =";
    if (c.mark === "n/a") return label + " n/a";
    if (c.mark) return label + " " + c.mark;
    const v = verdictOf(row, role, m.suite);
    const badge = v === "up" ? "🔴 " : v === "down" ? "🟢 " : "";
    // A row its counters decided (a counterOnly row, or a time row whose time did not): the counter that decided (the
    // first of its kind, src/report.ts counterVerdictOfRepeats), not its time.
    if (v && (row.counterOnly || (c.counterVerdict === v && cellTimeVerdict(c, m.suite) !== v))) {
      const kind = c.counterKind || "work";
      const diff = kind === "work" ? c.counterDiffs[0] : (c.kindDiffs || []).find((d: KindDiff) => d.kind === kind)?.text;
      return label + " " + badge + kind + ": " + (diff || "changed");
    }
    return label + " " + badge + pct(c.delta);
  }).filter((p: string | undefined): p is string => p !== undefined);
  return "`" + row.id.replace(/`/g, "'") + "`" + (today && today.median !== undefined ? " " + median(today.median) + " ms" : "") + (parts.length ? " · " + parts.join(" · ") : "");
}

function suiteEmbed(m: SuiteMatrix, cmp: Role, max: number): Embed | undefined {
  const hot = m.rows.filter((r: Row) => verdictOf(r, cmp, m.suite) !== undefined);
  if (hot.length === 0 && m.failed.length === 0) return undefined;
  const lines: string[] = [];
  for (const f of m.failed) {
    const log = f.log ? path.basename(f.log) : "";
    lines.push("**" + f.role + ": " + f.kind + "**" + (log ? " · `" + log + "`" : ""));
    lines.push(escapeText(cut(f.reason, 200)));
    if (f.tail && f.tail.length > 0) lines.push("```\n" + f.tail.slice(-5).map((l: string) => cut(l.replace(stripAnsi, "").replace(/`/g, "'"), 150)).join("\n") + "\n```");
  }
  // Slower first; then the rows judged by time, the largest change first, then the counterOnly rows (their time says
  // nothing).
  const slower = (r: Row): number => (verdictOf(r, cmp, m.suite) === "up" ? 1 : 0);
  const byCounters = (r: Row): number => (r.counterOnly ? 1 : 0);
  const delta = (r: Row): number => (r.counterOnly ? 0 : Math.abs((r.cells[cmp] as { delta?: number }).delta || 0));
  hot.sort((a: Row, b: Row) => slower(b) - slower(a) || byCounters(a) - byCounters(b) || delta(b) - delta(a));
  hot.slice(0, maxSuiteLines).forEach((r: Row) => lines.push(scenarioLine(m, r)));
  if (hot.length > maxSuiteLines) lines.push("… +" + (hot.length - maxSuiteLines) + " in " + m.suite + ".md");
  const up = m.up[cmp] || 0;
  const down = m.down[cmp] || 0;
  const counts = [up ? up + " slower" : "", down ? down + " faster" : ""].filter((s: string) => !!s).join(" · ");
  return { title: cut(m.suite + (counts ? " · " + counts + " vs " + (ABBR[cmp] === "y" ? "yesterday" : cmp) : ""), limits.title),
    description: fitLines(lines, Math.min(limits.description, max)), color: m.failed.length > 0 ? 0xd83c3e : up > 0 ? 0xc9686a : 0x5f9e74 };
}

const size = (e: Embed): number => (e.title || "").length + (e.description || "").length + (e.footer ? e.footer.text.length : 0);

export interface ReportInput {
  project: Project;
  specs: BuildSpec[];
  matrices: SuiteMatrix[];
  commits: CommitPr[];
  // The commits of the library repository of a two-repo project.
  libCommits?: CommitPr[];
  depsNote?: string;
  notes?: string[];
  overview: boolean;
  files: string[];
}

export function reportMessage(i: ReportInput): Message {
  const head = icon(i.matrices) + " " + i.project.name + " nightly";
  const lines = [head, ...(i.notes || []).map(escapeText)];
  // Spec, sections 2 and 5: the dependencies that changed since the compared build are a line of content (the embeds may
  // be hidden).
  if (i.depsNote) lines.push(escapeText("deps vs " + COMPARE + ": " + i.depsNote));
  if (!i.overview) lines.push(...overviewText(i.matrices), "overview.png failed");
  const content = cut(lines.join("\n"), limits.content);

  const embeds: Embed[] = [];
  const buildLines = i.specs.map((s: BuildSpec) => "**" + s.role + "** [" + s.sha.slice(0, 9) + "](" + i.project.repo + "/commit/" + s.sha + ") · " + dateUtc(s.date) +
    (s.sameAs ? " · = " + s.sameAs : "") +
    (s.lib && i.project.library ? " · library [" + s.lib.sha.slice(0, 9) + "](" + i.project.library.repo + "/commit/" + s.lib.sha + ")" : ""));
  embeds.push({ title: "Builds", description: fitLines(buildLines, 1500) });
  const libCommits = i.libCommits || [];
  // One list gets 2,400 characters, two lists 1,200 each: the suite embeds keep their room.
  const listMax = i.commits.length > 0 && libCommits.length > 0 ? 1200 : 2400;
  if (i.commits.length > 0) {
    embeds.push({ title: "Commits since yesterday (" + i.commits.length + ")", description: rangeText(i.commits, listMax) });
  }
  if (libCommits.length > 0 && i.project.library) {
    const name = i.project.library.repo.replace(/\/+$/, "").split("/").pop() as string;
    embeds.push({ title: cut(name + " commits since yesterday (" + libCommits.length + ")", limits.title), description: rangeText(libCommits, listMax) });
  }
  const used = embeds.reduce((s: number, e: Embed) => s + size(e), 0);
  const cmp = COMPARE;
  const room = Math.max(200, Math.floor((limits.total - used - 100) / Math.max(1, i.matrices.length)));
  const suites: Embed[] = [];
  for (const m of i.matrices) {
    const e = suiteEmbed(m, cmp, room);
    if (e) suites.push(e);
  }
  suites.splice(Math.max(0, limits.embeds - embeds.length));
  // Over 6,000 characters in all: the suites at the end go first.
  while(suites.length > 0 && used + suites.reduce((s: number, e: Embed) => s + size(e), 0) > limits.total) suites.pop();
  return withAttachments({ content: content, embeds: embeds.concat(suites), allowed_mentions: { parse: [] } }, i.files);
}

// The infrastructure failures use fixed templates with no untrusted text.
export function plainMessage(text: string, files: Array<string> = []): Message {
  return withAttachments({ content: cut(text, limits.content), embeds: [], allowed_mentions: { parse: [] } }, files);
}

// A message directory: the files, files.txt (their order) and payload.json, which the post job sends.
export function writeMessage(dir: string, m: Message, sources: Record<string, string>): void {
  fs.mkdirSync(dir, { recursive: true });
  const names: Array<string> = [];
  m.files.forEach((f: string) => {
    const name = path.basename(f);
    const src = sources[name] || f;
    if (!fs.existsSync(src) || fs.statSync(src).size > limits.fileBytes) return;
    if (path.resolve(src) !== path.resolve(dir, name)) fs.copyFileSync(src, path.join(dir, name));
    names.push(name);
  });
  m.payload.attachments = names.map((n: string, i: number) => ({ id: i, filename: n }));
  writeJsonAtomic(path.join(dir, "payload.json"), m.payload);
  fs.writeFileSync(path.join(dir, "files.txt"), names.join("\n") + (names.length ? "\n" : ""));
}
