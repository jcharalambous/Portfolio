import { expect, test } from "vitest";
import { revealEnd, revealPlan } from "./reveal-plan";

const timing = { charMs: 10, afterCommandMs: 100, afterOutputMs: 200 };
const script = [
  { kind: "command", text: "ab" },
  { kind: "output", text: "hello" },
  { kind: "command", text: "c" },
] as const;

test("commands are typed a character at a time, outputs appear whole", () => {
  expect(revealPlan(script, timing)).toEqual([
    { at: 10, line: 0, chars: 1 },
    { at: 20, line: 0, chars: 2 },
    { at: 120, line: 1, chars: 5 },
    { at: 330, line: 2, chars: 1 },
  ]);
});

test("time only moves forward", () => {
  const times = revealPlan(script, timing).map((s) => s.at);
  expect(times).toEqual([...times].sort((a, b) => a - b));
});

test("the end includes the pause after the last line", () => {
  expect(revealEnd(script, timing)).toBe(430);
});

test("an empty script has nothing to reveal", () => {
  expect(revealPlan([], timing)).toEqual([]);
  expect(revealEnd([], timing)).toBe(0);
});
