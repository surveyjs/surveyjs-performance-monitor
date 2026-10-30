// The numbers of the compare table and the Discord messages.
export function pct(v: number | undefined): string {
  return v === undefined || !isFinite(v) ? "" : (v >= 0 ? "+" : "") + (v * 100).toFixed(1) + "%";
}

// Milliseconds rounded to `digits` decimals, `missing` for no value: the table keeps 0.01 ms, a message 0.1 ms.
export function fixedMs(v: number | undefined, digits: number, missing: string): string {
  const k = Math.pow(10, digits);
  return v === undefined || isNaN(v) ? missing : String(Math.round(v * k) / k);
}
