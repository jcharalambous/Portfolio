import { expect, test } from "vitest";
import { GLYPHS, glyph, seedColumns, stepColumns } from "./columns";

test("seeds one column per cell, each starting above the top", () => {
  const columns = seedColumns(100, 11, () => 0.5);
  expect(columns).toHaveLength(10);
  expect(columns.every((y) => y <= 0 && y >= -20)).toBe(true);
});

test("every column drops a row, and one past the bottom sometimes restarts", () => {
  expect(stepColumns([-3, 0, 5], 10, () => 0)).toEqual([-2, 1, 6]);
  expect(stepColumns([12], 10, () => 0.5)).toEqual([13]);
  expect(stepColumns([12], 10, () => 0.99)).toEqual([0]);
});

test("picks a glyph from the set", () => {
  expect(glyph(() => 0)).toBe(GLYPHS[0]);
  expect(glyph(() => 0.999)).toBe(GLYPHS[GLYPHS.length - 1]);
});
