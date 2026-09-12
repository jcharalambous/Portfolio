import { expect, test } from "vitest";
import { drawProgress } from "./draw-progress";

const viewportHeight = 1000;

test("nothing is drawn while the block is below the trigger line", () => {
  expect(drawProgress({ top: 900, height: 400, viewportHeight })).toBe(0);
});

test("half drawn when the trigger line is halfway down the block", () => {
  expect(drawProgress({ top: 550, height: 400, viewportHeight })).toBe(0.5);
});

test("fully drawn once the block has passed the trigger line", () => {
  expect(drawProgress({ top: -200, height: 400, viewportHeight })).toBe(1);
});

test("a block with no height counts as drawn", () => {
  expect(drawProgress({ top: 100, height: 0, viewportHeight })).toBe(1);
});
