import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SkillGroup } from "./skill-group";

test("renders the title and every item in order", () => {
  render(<SkillGroup group={{ title: "Backend", items: ["FastAPI", "RabbitMQ"] }} />);
  expect(screen.getByRole("heading", { level: 3, name: "Backend" })).toBeDefined();
  expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
    "FastAPI",
    "RabbitMQ",
  ]);
});
