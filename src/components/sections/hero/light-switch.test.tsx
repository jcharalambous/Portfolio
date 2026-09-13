import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { LightSwitch } from "./light-switch";

afterEach(() => {
  delete document.documentElement.dataset.theme;
  document.cookie = "theme=; Max-Age=0; Path=/";
});

test("pulling the cord switches the page to light, remembers it, and pulling again switches back", () => {
  render(<LightSwitch />);
  const cord = screen.getByRole("button", { name: "Turn the lights on" });
  expect(cord.getAttribute("aria-pressed")).toBe("false");

  fireEvent.click(cord);
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(document.cookie).toContain("theme=light");
  expect(cord.getAttribute("aria-pressed")).toBe("true");
  expect(cord.getAttribute("aria-label")).toBe("Turn the lights off");

  fireEvent.click(cord);
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(cord.getAttribute("aria-label")).toBe("Turn the lights on");
});
