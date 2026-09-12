/**
 * How far the progress line should extend from the first node's centre: to the
 * active node, then part of the way to the next one.
 */
export function fillOffset(centres: readonly number[], index: number, progress: number): number {
  if (centres.length === 0) return 0;
  const origin = centres[0];
  const active = centres[Math.min(index, centres.length - 1)] - origin;
  const next = centres[index + 1];
  if (next === undefined) return active;
  const clamped = Math.min(1, Math.max(0, progress));
  return active + (next - origin - active) * clamped;
}
