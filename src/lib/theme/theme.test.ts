import { expect, test } from "vitest";
import { parseTheme } from "./theme";

test("only an explicit light is light; anything else is the dark default", () => {
  expect(parseTheme("light")).toBe("light");
  expect(parseTheme("dark")).toBe("dark");
  expect(parseTheme("blue")).toBe("dark");
  expect(parseTheme(undefined)).toBe("dark");
  expect(parseTheme(null)).toBe("dark");
});
