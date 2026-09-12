export type SectionBounds = { top: number; bottom: number };

/** Which section a point on the page falls in, and how far through it that point is (0 to 1). */
export type SectionPosition = { index: number; progress: number };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function locateSection(
  bounds: readonly SectionBounds[],
  probe: number,
): SectionPosition {
  if (bounds.length === 0) return { index: 0, progress: 0 };

  let index = 0;
  for (let i = 0; i < bounds.length; i++) {
    if (probe >= bounds[i].top) index = i;
  }

  const start = bounds[index].top;
  // Progress runs to the next section's top, or to this section's end when it is last.
  const end = bounds[index + 1]?.top ?? bounds[index].bottom;
  if (end <= start) return { index, progress: 1 };
  return { index, progress: clamp01((probe - start) / (end - start)) };
}
