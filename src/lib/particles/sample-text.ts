import { LINE_HEIGHT, TRACKING, fitFontSize, headlineBox } from "./fit-headline";
import type { Point } from "./types";

type SampleTextOptions = {
  width: number;
  height: number;
  gutter: number;
  lines: string[];
  fontFamily: string;
  /** Sample every Nth pixel in each direction. */
  step?: number;
  /** Alpha above which a pixel counts as ink. */
  threshold?: number;
};

/** Render the headline to an offscreen canvas and return the pixels it covers. */
export function sampleTextPoints({
  width,
  height,
  gutter,
  lines,
  fontFamily,
  step = 2,
  threshold = 120,
}: SampleTextOptions): Point[] {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const o = off.getContext("2d");
  if (!o) return [];

  const font = (size: number) => `600 ${size}px ${fontFamily}`;
  const box = headlineBox(width, height, gutter);
  const size = fitFontSize(
    (probe) => {
      o.font = font(probe);
      return Math.max(...lines.map((line) => o.measureText(line).width));
    },
    lines.length,
    box,
  );

  o.font = font(size);
  o.fillStyle = "#fff";
  o.textBaseline = "top";
  o.textAlign = "left";
  const lineHeight = size * LINE_HEIGHT;
  const tracking = TRACKING * size;
  lines.forEach((line, i) => {
    let x = box.left;
    for (const ch of line) {
      o.fillText(ch, x, box.top + i * lineHeight);
      x += o.measureText(ch).width + tracking;
    }
  });

  const data = o.getImageData(0, 0, width, height).data;
  const points: Point[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > threshold) points.push({ x, y });
    }
  }
  return points;
}
