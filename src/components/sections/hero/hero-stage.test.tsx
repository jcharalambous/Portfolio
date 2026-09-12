import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { HeroStage } from "./hero-stage";

const props = { lines: ["Hello"], scene: "/s.splinecode", poster: "/p.png" };

function pretendScreenIs(wide: boolean) {
  vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
    matches: wide,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

test("a phone gets the still and never the live scene", () => {
  pretendScreenIs(false);
  const { container } = render(<HeroStage {...props} />);
  act(() => vi.advanceTimersByTime(5000));
  expect(container.querySelector("img")?.getAttribute("src")).toContain("p.png");
  expect(container.querySelector("spline-viewer")).toBeNull();
});

test("a wide screen starts the live scene once the headline has had time to form", () => {
  pretendScreenIs(true);
  const { container } = render(<HeroStage {...props} />);
  expect(container.querySelector("spline-viewer")).toBeNull();
  act(() => vi.advanceTimersByTime(5000));
  expect(container.querySelector("spline-viewer")?.getAttribute("url")).toBe("/s.splinecode");
});
