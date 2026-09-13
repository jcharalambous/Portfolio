import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { LessonCard } from "./lesson-card";

const lesson = {
  setting: "First months",
  title: "Two runs in five",
  teaser: "Nobody had designed for failure.",
  story: ["It wasn't random."],
  lesson: "Build for the people who exist.",
};

function draw(active: boolean) {
  const onOpen = vi.fn();
  const onCentre = vi.fn();
  render(
    <LessonCard
      lesson={lesson}
      index={0}
      active={active}
      readLabel="Read the story"
      onOpen={onOpen}
      onCentre={onCentre}
    />,
  );
  return {
    onOpen,
    onCentre,
    button: screen.getByRole("button", { name: "Read the story: Two runs in five" }),
  };
}

test("shows the chapter number, setting, title and teaser", () => {
  draw(true);
  expect(screen.getByText("01")).toBeDefined();
  expect(screen.getByText("First months")).toBeDefined();
  expect(screen.getByText("Two runs in five")).toBeDefined();
  expect(screen.getByText("Nobody had designed for failure.")).toBeDefined();
});

test("a pointer press on the middle card opens the story", () => {
  const { onOpen, onCentre, button } = draw(true);
  fireEvent.click(button, { detail: 1 });
  expect(onOpen).toHaveBeenCalledOnce();
  expect(onCentre).not.toHaveBeenCalled();
});

test("a pointer press on a side card brings it to the middle instead", () => {
  const { onOpen, onCentre, button } = draw(false);
  fireEvent.click(button, { detail: 1 });
  expect(onCentre).toHaveBeenCalledOnce();
  expect(onOpen).not.toHaveBeenCalled();
});

test("a keyboard press opens a side card straight away", () => {
  const { onOpen, button } = draw(false);
  fireEvent.click(button, { detail: 0 });
  expect(onOpen).toHaveBeenCalledOnce();
});

test("only the middle card is marked current", () => {
  const { button } = draw(false);
  expect(button.getAttribute("aria-current")).toBeNull();
  expect(screen.getByRole("listitem").hasAttribute("data-active")).toBe(false);
});
