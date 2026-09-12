import { expect, test } from "vitest";
import { fitFontSize, headlineBox } from "./fit-headline";

test("wide viewports keep the headline in the left half", () => {
  const box = headlineBox(1440, 900, 266);
  expect(box.left).toBe(266);
  expect(box.maxWidth).toBeLessThanOrEqual(620);
  expect(box.maxHeight).toBe(900 * 0.46);
});

test("narrow viewports use the full width minus the gutter", () => {
  const box = headlineBox(390, 800, 86);
  expect(box.maxWidth).toBe(390 - 86 * 2);
  expect(box.maxHeight).toBe(800 * 0.34);
});

test("font size is limited by width when lines are long", () => {
  const box = { left: 0, top: 0, maxWidth: 300, maxHeight: 10000 };
  expect(fitFontSize((size) => size * 5, 5, box)).toBeCloseTo(60);
});

test("font size is limited by height when there are many lines", () => {
  const box = { left: 0, top: 0, maxWidth: 10000, maxHeight: 510 };
  expect(fitFontSize((size) => size, 5, box)).toBeCloseTo(100);
});
