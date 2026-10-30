// The statistics the judge needs (a copy of survey-library's perf/harness/stats.ts, these functions only).
export function sorted(values: ReadonlyArray<number>): Array<number> {
  return values.slice().sort((a: number, b: number) => a - b);
}

export function quantile(values: ReadonlyArray<number>, q: number): number {
  if (values.length === 0) return NaN;
  const s = sorted(values);
  const pos = (s.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return s[lo] + (s[hi] - s[lo]) * (pos - lo);
}

export function median(values: ReadonlyArray<number>): number {
  return quantile(values, 0.5);
}

// The median absolute deviation from the median (not scaled to sigma).
export function mad(values: ReadonlyArray<number>): number {
  if (values.length === 0) return NaN;
  const m = median(values);
  return median(values.map((v: number) => Math.abs(v - m)));
}
