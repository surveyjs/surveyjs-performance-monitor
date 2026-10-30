// A UTC date as YYYYMMDDTHHMMSS: run ids (run.sh's RUN_ID has the same form, housekeeping reads its date) and, with a
// "Z", the kept copies of a renewed baseline (state.ts's baselineFiles leaves those out).
export function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "");
}
