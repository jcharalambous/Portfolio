import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { sections } from "@/content/sections";
import Home from "./page";

test("renders one section per entry in the list, in order", () => {
  const { container } = render(<Home />);
  const ids = Array.from(container.querySelectorAll("section"), (el) => el.id);
  expect(ids).toEqual(sections.map((section) => section.id));
});
