import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { LessonWindow } from "./lesson-window";

const lesson = {
  setting: "Infrastructure",
  title: "Seven months",
  teaser: "Decided with a calculator.",
  story: ["I ran the numbers.", "It cost less than seven months of compute."],
  lesson: "A trade you take knowingly beats a win you can't explain.",
};

function draw(open: boolean) {
  const onClose = vi.fn();
  const view = render(
    <LessonWindow
      lesson={lesson}
      index={4}
      open={open}
      onClose={onClose}
      closeLabel="Close"
      lessonLabel="What it taught me"
    />,
  );
  return { onClose, view, dialog: view.container.querySelector("dialog")! };
}

test("opens as a modal with the whole story and the lesson", () => {
  const { dialog } = draw(true);
  expect(dialog.open).toBe(true);
  expect(screen.getByRole("heading", { level: 3, name: "Seven months" })).toBeDefined();
  expect(screen.getByText("I ran the numbers.")).toBeDefined();
  expect(screen.getByText("It cost less than seven months of compute.")).toBeDefined();
  expect(
    screen.getByText("A trade you take knowingly beats a win you can't explain."),
  ).toBeDefined();
  expect(screen.getByText("05 · Infrastructure")).toBeDefined();
});

test("stays closed until asked", () => {
  const { dialog } = draw(false);
  expect(dialog.open).toBe(false);
});

test("the red button asks to close", () => {
  const { onClose } = draw(true);
  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  expect(onClose).toHaveBeenCalledOnce();
});

test("closing the dialog itself, as Escape does, reports back", () => {
  const { onClose, dialog } = draw(true);
  dialog.close();
  expect(onClose).toHaveBeenCalledOnce();
});

test("a press on the backdrop closes; a press inside does not", () => {
  const { onClose, dialog } = draw(true);
  fireEvent.click(screen.getByText("I ran the numbers."));
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.click(dialog);
  expect(onClose).toHaveBeenCalledOnce();
});

test("closes again when told to", () => {
  const { view, dialog } = draw(true);
  view.rerender(
    <LessonWindow
      lesson={lesson}
      index={4}
      open={false}
      onClose={() => {}}
      closeLabel="Close"
      lessonLabel="What it taught me"
    />,
  );
  expect(dialog.open).toBe(false);
});
