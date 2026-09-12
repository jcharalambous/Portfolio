import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SectionShell } from "./section-shell";

test("uses the list's label as the kicker and, by default, the heading", () => {
  render(<SectionShell id="about" />);
  expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeDefined();
  expect(screen.getAllByText("About")).toHaveLength(2);
});

test("a given heading and intro replace the defaults", () => {
  const { container } = render(
    <SectionShell id="work" heading="Where I've ended up" intro="How I got here." />,
  );
  expect(container.querySelector("section")?.id).toBe("work");
  expect(screen.getByRole("heading", { level: 2, name: "Where I've ended up" })).toBeDefined();
  expect(screen.getByText("How I got here.")).toBeDefined();
});
