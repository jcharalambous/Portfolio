import { act, render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { SplineScene, VIEWER_SRC } from "./spline-scene";

test("renders the viewer element pointing at the self-hosted scene, reacting to the whole page", () => {
  const { container } = render(<SplineScene src="/spline/nexbot.splinecode" />);
  const viewer = container.querySelector("spline-viewer")!;
  expect(viewer.getAttribute("url")).toBe("/spline/nexbot.splinecode");
  expect(viewer.getAttribute("events-target")).toBe("global");
});

test("loads the viewer script once, however many scenes mount", () => {
  render(<SplineScene src="/a.splinecode" />);
  render(<SplineScene src="/b.splinecode" />);
  const scripts = document.querySelectorAll(`script[src="${VIEWER_SRC}"]`);
  expect(scripts).toHaveLength(1);
  expect(scripts[0].getAttribute("type")).toBe("module");
});

test("rests the scene while off screen and runs it again when back", () => {
  let cross: (isIntersecting: boolean) => void = () => {};
  class Observer {
    constructor(callback: IntersectionObserverCallback) {
      cross = (isIntersecting) =>
        callback(
          [{ isIntersecting } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  const app = { stop: vi.fn(), play: vi.fn() };

  const { container } = render(<SplineScene src="/spline/nexbot.splinecode" />);
  const viewer = container.querySelector("spline-viewer") as SplineViewerElement;
  viewer._spline = app;
  // Nothing to pause until the scene has loaded.
  act(() => cross(false));
  expect(app.stop).not.toHaveBeenCalled();

  act(() => {
    viewer.dispatchEvent(new Event("load-complete"));
  });
  expect(app.stop).toHaveBeenCalledTimes(1);
  act(() => cross(true));
  expect(app.play).toHaveBeenCalledTimes(1);
  vi.unstubAllGlobals();
});
