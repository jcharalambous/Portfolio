import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import { Carousel } from "./carousel";

const lessons = ["One", "Two", "Three"].map((title) => ({
  setting: "Then",
  title,
  teaser: `${title} teaser`,
  story: [`${title} story`],
  lesson: `${title} lesson`,
}));

const labels = {
  readLabel: "Read the story",
  previousLabel: "Previous lesson",
  nextLabel: "Next lesson",
  closeLabel: "Close",
  lessonLabel: "What it taught me",
};

const scrollTo = vi.fn();
beforeEach(() => {
  scrollTo.mockClear();
  // jsdom lays nothing out, so every card measures at zero and scrolling is a no-op it records.
  Element.prototype.scrollTo = scrollTo;
});

test("shows every lesson, the first in the middle, with the previous arrow dimmed", () => {
  render(<Carousel lessons={lessons} labels={labels} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  expect(screen.getAllByRole("listitem")[0].hasAttribute("data-active")).toBe(true);
  expect(
    (screen.getByRole("button", { name: "Previous lesson" }) as HTMLButtonElement).disabled,
  ).toBe(true);
  expect((screen.getByRole("button", { name: "Next lesson" }) as HTMLButtonElement).disabled).toBe(
    false,
  );
});

test("the next arrow scrolls the track and moves the middle along at once", () => {
  render(<Carousel lessons={lessons} labels={labels} />);
  fireEvent.click(screen.getByRole("button", { name: "Next lesson" }));
  expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
  expect(screen.getAllByRole("listitem")[1].hasAttribute("data-active")).toBe(true);
});

test("the arrow keys move the middle too", () => {
  render(<Carousel lessons={lessons} labels={labels} />);
  fireEvent.keyDown(screen.getByRole("list"), { key: "ArrowRight" });
  fireEvent.keyDown(screen.getByRole("list"), { key: "ArrowRight" });
  fireEvent.keyDown(screen.getByRole("list"), { key: "ArrowRight" });
  expect(screen.getAllByRole("listitem")[2].hasAttribute("data-active")).toBe(true);
  expect((screen.getByRole("button", { name: "Next lesson" }) as HTMLButtonElement).disabled).toBe(
    true,
  );
});

test("pressing the middle card opens its story; a side card comes to the middle", () => {
  const { container } = render(<Carousel lessons={lessons} labels={labels} />);
  const dialog = container.querySelector("dialog")!;
  fireEvent.click(screen.getByRole("button", { name: "Read the story: Two" }), { detail: 1 });
  expect(dialog.open).toBe(false);
  expect(screen.getAllByRole("listitem")[1].hasAttribute("data-active")).toBe(true);

  fireEvent.click(screen.getByRole("button", { name: "Read the story: Two" }), { detail: 1 });
  expect(dialog.open).toBe(true);
  expect(screen.getByText("Two story")).toBeDefined();

  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  expect(dialog.open).toBe(false);
});
