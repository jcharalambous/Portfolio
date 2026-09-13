import { expect, test } from "vitest";
import { easeOut, FLARE_MS, glare, HOLD_MS, TOTAL_MS } from "./timeline";

test("the ease starts fast and lands at rest", () => {
  expect(easeOut(0)).toBe(0);
  expect(easeOut(0.5)).toBeGreaterThan(0.5);
  expect(easeOut(1)).toBe(1);
});

test("the light flares, fades through the hold, and is gone by the end", () => {
  expect(glare(0)).toBe(0);
  expect(glare(FLARE_MS)).toBe(1);
  expect(glare(FLARE_MS + HOLD_MS)).toBeCloseTo(0.3);
  expect(glare(TOTAL_MS - 100)).toBeGreaterThan(0);
  expect(glare(TOTAL_MS)).toBe(0);
  expect(glare(TOTAL_MS + 1000)).toBe(0);
});
