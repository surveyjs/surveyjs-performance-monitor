// The middle value; the mean of the two middle ones for an even count. NaN for none.
export function median(values: Array<number>): number {
  const v = values.slice().sort((a: number, b: number) => a - b);
  if (v.length === 0) return NaN;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

export function mean(values: Array<number>): number {
  return values.reduce((a: number, b: number) => a + b, 0) / values.length;
}

// The sample standard deviation (n - 1); NaN for fewer than two values.
export function sd(values: Array<number>): number {
  if (values.length < 2) return NaN;
  const m = mean(values);
  return Math.sqrt(values.reduce((a: number, b: number) => a + (b - m) * (b - m), 0) / (values.length - 1));
}

// Student's t at 0.995 (a two-sided 99% interval) for 1 to 8 degrees of freedom: PERF_REPEATS is 1 to 9.
const T995 = [63.657, 9.925, 5.841, 4.604, 4.032, 3.707, 3.499, 3.355];

export function t995(df: number): number {
  if (!(df >= 1 && df <= T995.length) || df !== Math.floor(df)) throw new RangeError("t995: no value for " + df + " degrees of freedom");
  return T995[df - 1];
}
