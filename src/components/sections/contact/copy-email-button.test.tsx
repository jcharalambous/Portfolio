import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { CopyEmailButton } from "./copy-email-button";

const writeText = vi.fn().mockResolvedValue(undefined);

beforeEach(() => {
  vi.useFakeTimers();
  Object.assign(navigator, { clipboard: { writeText } });
});
afterEach(() => vi.useRealTimers());

test("copies the address and confirms for a moment", async () => {
  render(<CopyEmailButton label="Copy email" copiedLabel="Copied" />);
  const button = screen.getByRole("button");

  await act(async () => {
    fireEvent.click(button);
  });
  expect(writeText).toHaveBeenCalledWith("business@charalambous.network");
  expect(screen.getByText("Copied").getAttribute("aria-hidden")).toBe("false");

  act(() => vi.advanceTimersByTime(2000));
  expect(screen.getByText("Copied").getAttribute("aria-hidden")).toBe("true");
});
