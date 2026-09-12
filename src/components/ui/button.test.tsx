import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Button, ButtonLink } from "./button";

test("a button defaults to type=button so it never submits a form by accident", () => {
  render(<Button>Copy</Button>);
  expect(screen.getByRole("button", { name: "Copy" }).getAttribute("type")).toBe("button");
});

test("a button link is an anchor with the same look", () => {
  render(<ButtonLink href="#projects">See the work</ButtonLink>);
  const link = screen.getByRole("link", { name: "See the work" });
  expect(link.getAttribute("href")).toBe("#projects");
  expect(link.className).toContain("bg-accent");
});
