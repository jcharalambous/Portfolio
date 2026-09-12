import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { revealEnd } from "@/lib/typewriter/reveal-plan";
import { useTypewriter } from "./use-typewriter";

const script = [
  { kind: "command", text: "ls" },
  { kind: "output", text: "about.md" },
] as const;

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

test("shows everything at first, hides it once mounted, then types when started", () => {
  const { result, rerender } = renderHook(
    ({ start }) => useTypewriter(script, { start, instant: false }),
    {
      initialProps: { start: false },
    },
  );
  // After mount, nothing is revealed and nothing happens until start.
  expect(result.current).toEqual({ line: 0, chars: 0, done: false });
  act(() => vi.advanceTimersByTime(5000));
  expect(result.current.done).toBe(false);

  rerender({ start: true });
  act(() => vi.advanceTimersByTime(revealEnd(script)));
  expect(result.current).toEqual({ line: 2, chars: 0, done: true });
});

test("reduced motion shows the whole script and never types", () => {
  const { result } = renderHook(() => useTypewriter(script, { start: true, instant: true }));
  expect(result.current.done).toBe(true);
  act(() => vi.advanceTimersByTime(5000));
  expect(result.current.done).toBe(true);
});
