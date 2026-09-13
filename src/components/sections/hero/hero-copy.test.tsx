import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { siteConfig } from "@/lib/site/config";
import { HeroCopy } from "./hero-copy";

test("shows the role, the two calls to action, and every contact link", () => {
  render(<HeroCopy />);
  expect(screen.getByText(siteConfig.role)).toBeDefined();
  expect(screen.getByRole("link", { name: "See the work" }).getAttribute("href")).toBe("#projects");
  expect(screen.getByRole("link", { name: "More about me" }).getAttribute("href")).toBe("#about");
  for (const link of siteConfig.links) {
    expect(screen.getByRole("link", { name: link.label }).getAttribute("href")).toBe(link.href);
  }
  expect(screen.getByRole("link", { name: "Email" }).getAttribute("href")).toBe(
    "mailto:business@charalambous.network",
  );
});
