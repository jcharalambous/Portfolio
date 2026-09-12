import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Facts } from "./facts";

test("renders every label with its value and detail, plus the trailing row", () => {
  render(
    <Facts
      facts={[
        { label: "Status", value: "Open to senior roles", live: true },
        { label: "Based", value: "Hertfordshire, UK", detail: "London commuter belt" },
      ]}
      trailing={{ label: "Local time", value: <span>12:00:00</span> }}
    />,
  );
  expect(screen.getByText("Status")).toBeDefined();
  expect(screen.getByText("Open to senior roles")).toBeDefined();
  expect(screen.getByText("London commuter belt")).toBeDefined();
  expect(screen.getByText("Local time")).toBeDefined();
  expect(screen.getByText("12:00:00")).toBeDefined();
});
