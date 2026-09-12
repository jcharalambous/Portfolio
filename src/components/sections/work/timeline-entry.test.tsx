import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { TimelineEntry } from "./timeline-entry";

test("shows the role, organisation, dates, lead, paragraphs and tags", () => {
  render(
    <TimelineEntry
      index={0}
      entry={{
        role: "Software Engineer",
        org: "Vending Sense",
        from: "Feb 2025",
        to: "Present",
        current: true,
        body: [{ lead: "Led the team.", text: " Built the platform." }],
        tags: ["Python", "Docker"],
      }}
    />,
  );
  expect(screen.getByRole("heading", { level: 3 }).textContent).toContain("Software Engineer");
  expect(screen.getByText("Vending Sense")).toBeDefined();
  expect(screen.getByText("Present")).toBeDefined();
  expect(screen.getByText("Led the team.")).toBeDefined();
  expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Python", "Docker"]);
});
