import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProjectCard } from "./project-card";

test("links the title to the project page", () => {
  render(
    <ProjectCard
      project={{
        slug: "demo",
        title: "Demo",
        summary: "Summary",
        description: "",
        highlights: [],
        tags: ["Tag"],
        year: 2026,
      }}
    />,
  );
  const link = screen.getByRole("link", { name: "Demo" });
  expect(link.getAttribute("href")).toBe("/projects/demo");
  expect(screen.getByText("Tag")).toBeDefined();
});
