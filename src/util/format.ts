import * as fs from "node:fs";

// A relative change as a whole percent: +12%, −3% (a real minus sign), — for no value.
export function pct(v: number | undefined): string {
  if (v === undefined || !isFinite(v)) return "—";
  const n = Math.round(v * 100);
  return n > 0 ? "+" + n + "%" : n < 0 ? "−" + (-n) + "%" : "0%";
}

// Milliseconds rounded to `digits` decimals, `missing` for no value.
export function fixedMs(v: number | undefined, digits: number, missing: string): string {
  const k = Math.pow(10, digits);
  return v === undefined || isNaN(v) ? missing : String(Math.round(v * k) / k);
}

// Terminal colour codes (a Playwright error message, a build log).
export const stripAnsi = new RegExp(String.fromCharCode(27) + "\\[[0-9;]*[A-Za-z]", "g");

// The last n non-empty lines of a log, without colour codes; no file, no lines.
export function tail(file: string, n: number): Array<string> {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").replace(stripAnsi, "").split(/\r?\n/).filter((l: string) => !!l.trim()).slice(-n);
}

// A UTC date as YYYYMMDDTHHMMSS: run ids (run.sh's RUN_ID has the same form).
export function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "");
}

// DD.MM.YYYY in UTC.
export function dateUtc(d: Date | string): string {
  const iso = new Date(d).toISOString();
  return iso.slice(8, 10) + "." + iso.slice(5, 7) + "." + iso.slice(0, 4);
}

// DD.MM.YYYY HH:MM UTC.
export function timeUtc(d: Date): string {
  return dateUtc(d) + " " + d.toISOString().slice(11, 16) + " UTC";
}

// A duration in minutes: 48 min, 1 h 27 min.
export function durationText(min: number): string {
  const total = Math.round(min);
  return total >= 60 ? Math.floor(total / 60) + " h " + (total % 60) + " min" : total + " min";
}
