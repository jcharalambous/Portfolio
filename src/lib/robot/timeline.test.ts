import { expect, test } from "vitest";
import { easeOut, easeOutBack, HOLD_MS, pose, RAISE_MS, TOTAL_MS } from "./timeline";

test("the eases start and end at rest, and the settle overshoots a little", () => {
  expect(easeOut(0)).toBe(0);
  expect(easeOut(1)).toBe(1);
  expect(easeOut(0.5)).toBeGreaterThan(0.5);
  expect(easeOutBack(0)).toBeCloseTo(0);
  expect(easeOutBack(1)).toBeCloseTo(1);
  expect(easeOutBack(0.8)).toBeGreaterThan(1);
});

test("flinches up, holds while the glare fades, then drops past rest and settles", () => {
  expect(pose(0)).toEqual({ raise: 0, glare: 0 });
  expect(pose(RAISE_MS / 2).raise).toBeGreaterThan(0.5);
  expect(pose(RAISE_MS)).toEqual({ raise: 1, glare: 1 });
  expect(pose(RAISE_MS + HOLD_MS).raise).toBe(1);
  expect(pose(RAISE_MS + HOLD_MS).glare).toBeCloseTo(0.3);
  expect(pose(TOTAL_MS - 120).raise).toBeLessThan(0);
  expect(pose(TOTAL_MS)).toEqual({ raise: 0, glare: 0 });
  expect(pose(TOTAL_MS + 1000)).toEqual({ raise: 0, glare: 0 });
});
