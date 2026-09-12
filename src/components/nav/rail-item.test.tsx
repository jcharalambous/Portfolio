import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { RailItem } from "./rail-item";

const section = { id: "about", label: "About", meta: "How I got here" } as const;

test("the active item is marked as the current location", () => {
  render(<RailItem section={section} state="active" />);
  const link = screen.getByRole("link", { name: /About/ });
  expect(link.getAttribute("href")).toBe("#about");
  expect(link.getAttribute("aria-current")).toBe("location");
});

test("other items are not marked current", () => {
  render(<RailItem section={section} state="upcoming" />);
  expect(screen.getByRole("link", { name: /About/ }).hasAttribute("aria-current")).toBe(false);
});
