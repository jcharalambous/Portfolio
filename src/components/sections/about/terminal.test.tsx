import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Terminal } from "./terminal";

const script = [
  { kind: "command", text: "whoami" },
  { kind: "output", text: "john" },
] as const;

test("sizes the window to the whole script from the start, invisibly", () => {
  const { container } = render(<Terminal title="john — zsh" script={script} />);
  const ghost = container.querySelector('[aria-hidden="true"].invisible')!;
  // Every line plus the resting prompt, so the height matches the finished terminal.
  expect(ghost.querySelectorAll("p")).toHaveLength(script.length + 1);
  expect(ghost.textContent).toContain("whoami");
  expect(ghost.textContent).toContain("john");
});
