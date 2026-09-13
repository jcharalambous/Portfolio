import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { setTheme, useTheme } from "./use-theme";

afterEach(() => {
  delete document.documentElement.dataset.theme;
  document.cookie = "theme=; Max-Age=0; Path=/";
});

test("reads the theme from the page, and switching it updates readers, the page and the cookie", () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current).toBe("dark");

  act(() => setTheme("light"));
  expect(result.current).toBe("light");
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(document.cookie).toContain("theme=light");

  act(() => setTheme("dark"));
  expect(result.current).toBe("dark");
});
