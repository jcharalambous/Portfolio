import { render } from "@testing-library/react";
import { expect, test } from "vitest";
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
