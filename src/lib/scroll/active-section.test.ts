import { expect, test } from "vitest";
import { locateSection } from "./active-section";

const bounds = [
  { top: 0, bottom: 1000 },
  { top: 1000, bottom: 2000 },
  { top: 2000, bottom: 2600 },
];

test("before the first section counts as the first, at the start", () => {
  expect(locateSection(bounds, -50)).toEqual({ index: 0, progress: 0 });
});

test("halfway between two section tops is halfway through the earlier one", () => {
  expect(locateSection(bounds, 1500)).toEqual({ index: 1, progress: 0.5 });
});

test("the last section measures progress against its own end", () => {
  expect(locateSection(bounds, 2300)).toEqual({ index: 2, progress: 0.5 });
});

test("past the end is the last section, complete", () => {
  expect(locateSection(bounds, 9999)).toEqual({ index: 2, progress: 1 });
});

test("no sections is a safe zero", () => {
  expect(locateSection([], 100)).toEqual({ index: 0, progress: 0 });
});
