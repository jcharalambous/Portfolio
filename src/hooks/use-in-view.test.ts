import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { useInView } from "./use-in-view";

// A stand-in observer the test can drive: `show(0.3)` puts 30% of the element on screen, `show(0)` none.
let show: (ratio: number) => void;
let disconnected: boolean;

beforeEach(() => {
  disconnected = false;
  class Observer {
    constructor(callback: IntersectionObserverCallback) {
      show = (ratio) =>
        callback(
          [{ isIntersecting: ratio > 0, intersectionRatio: ratio } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
    }
    observe() {}
    unobserve() {}
    disconnect() {
      disconnected = true;
    }
  }
  vi.stubGlobal("IntersectionObserver", Observer);
});
afterEach(() => vi.unstubAllGlobals());

const ref = { current: document.createElement("div") };

test("counts as in view from the threshold until fully off screen", () => {
  const { result } = renderHook(() => useInView(ref, { threshold: 0.25 }));
  expect(result.current).toBe(false);
  act(() => show(0.1)); // A sliver on the way in: not yet.
  expect(result.current).toBe(false);
  act(() => show(0.3));
  expect(result.current).toBe(true);
  act(() => show(0.1)); // Mostly gone but still being read: keep it.
  expect(result.current).toBe(true);
  act(() => show(0));
  expect(result.current).toBe(false);
});

test("with once, stays true after the first time and stops watching", () => {
  const { result } = renderHook(() => useInView(ref, { once: true }));
  act(() => show(0.5));
  expect(result.current).toBe(true);
  expect(disconnected).toBe(true);
  act(() => show(0));
  expect(result.current).toBe(true);
});
