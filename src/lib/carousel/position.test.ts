import { expect, test } from "vitest";
import { nearestIndex, scrollLeftFor } from "./position";

const centres = [200, 600, 1000];

test("picks the centre closest to the point", () => {
  expect(nearestIndex(centres, 550)).toBe(1);
  expect(nearestIndex(centres, 950)).toBe(2);
});

test("a point exactly between two centres goes to the earlier one", () => {
  expect(nearestIndex(centres, 400)).toBe(0);
});

test("points beyond either end clamp to that end", () => {
  expect(nearestIndex(centres, -500)).toBe(0);
  expect(nearestIndex(centres, 5000)).toBe(2);
});

test("no centres is a safe zero", () => {
  expect(nearestIndex([], 100)).toBe(0);
});

test("the scroll position puts the centre in the middle of the viewport", () => {
  expect(scrollLeftFor(600, 800)).toBe(200);
});
