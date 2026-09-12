/** Where the headline sits inside the hero, and how big it may grow. Pure. */
export type HeadlineBox = {
  left: number;
  top: number;
  maxWidth: number;
  maxHeight: number;
};

const TOP_OFFSET = 48;
/** Matches the `stack` breakpoint: below it the scene sits under the text. */
const STACK_BREAKPOINT = 820;

export const LINE_HEIGHT = 1.02;
export const TRACKING = -0.018;

export function headlineBox(width: number, height: number, gutter: number): HeadlineBox {
  const wide = width > STACK_BREAKPOINT;
  return {
    left: gutter,
    top: wide ? TOP_OFFSET + height * 0.19 : TOP_OFFSET + height * 0.12,
    maxWidth: wide ? Math.min(width * 0.5, 620) - gutter * 0.2 : width - gutter * 2,
    maxHeight: wide ? height * 0.46 : height * 0.34,
  };
}

/**
 * Largest font size at which every line fits the box. `widestAt` measures the
 * widest line at a given size, so the caller decides how text is measured.
 */
export function fitFontSize(
  widestAt: (size: number) => number,
  lineCount: number,
  box: HeadlineBox,
  probe = 120,
): number {
  const byWidth = probe * (box.maxWidth / widestAt(probe));
  const byHeight = box.maxHeight / (lineCount * LINE_HEIGHT);
  return Math.min(byWidth, byHeight);
}
