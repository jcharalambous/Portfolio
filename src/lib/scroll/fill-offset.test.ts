import { expect, test } from "vitest";
import { fillOffset } from "./fill-offset";

const centres = [10, 50, 90];

test("starts at the first node", () => {
  expect(fillOffset(centres, 0, 0)).toBe(0);
});

test("reaches partway to the next node by progress", () => {
  expect(fillOffset(centres, 0, 0.5)).toBe(20);
});

test("stops at the last node whatever the progress", () => {
  expect(fillOffset(centres, 2, 0.7)).toBe(80);
});

test("an index past the end clamps to the last node", () => {
  expect(fillOffset(centres, 9, 0)).toBe(80);
});

test("no nodes is zero", () => {
  expect(fillOffset([], 0, 0)).toBe(0);
});
