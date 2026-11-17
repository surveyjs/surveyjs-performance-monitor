// The middle value; the mean of the two middle ones for an even count. NaN for none.
export function median(values: Array<number>): number {
  const v = values.slice().sort((a: number, b: number) => a - b);
  if (v.length === 0) return NaN;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}
