type Args = {
  /** The block's top edge relative to the viewport. */
  top: number;
  height: number;
  viewportHeight: number;
  /** Fraction of the viewport height at which drawing starts, measured from the top. */
  trigger?: number;
};

/** 0 before the block reaches the trigger line, 1 once its bottom has passed it. */
export function drawProgress({ top, height, viewportHeight, trigger = 0.75 }: Args): number {
  if (height <= 0) return 1;
  const line = viewportHeight * trigger;
  return Math.min(1, Math.max(0, (line - top) / height));
}
