import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { EmailButton } from "./email-button";

const assign = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  // jsdom cannot navigate, so stand in for the one call the button makes.
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...window.location, assign },
  });
});
afterEach(() => vi.useRealTimers());

test("flies first, then says mail is opening, opens it, and resets", () => {
  render(<EmailButton openingLabel="Opening Mail" />);
  const label = () => screen.getByText("Opening Mail").getAttribute("aria-hidden");

  fireEvent.click(screen.getByRole("link"));
  expect(label()).toBe("true");
  expect(assign).not.toHaveBeenCalled();

  act(() => vi.advanceTimersByTime(1250));
  expect(label()).toBe("false");
  expect(assign).not.toHaveBeenCalled();

  act(() => vi.advanceTimersByTime(100));
  expect(assign).toHaveBeenCalledWith("mailto:business@charalambous.network");

  act(() => vi.advanceTimersByTime(4000));
  expect(label()).toBe("true");
});
