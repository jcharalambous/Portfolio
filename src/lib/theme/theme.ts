export const THEMES = ["dark", "light"] as const;
export type Theme = (typeof THEMES)[number];

/** The site is designed dark. Light is a choice the visitor makes, and keeps. */
export const DEFAULT_THEME: Theme = "dark";
/** Remembered for a year, so the layout can serve the right colours before any script runs. */
export const THEME_COOKIE = "theme";

export function parseTheme(value: string | null | undefined): Theme {
  return value === "light" ? "light" : DEFAULT_THEME;
}

/** The page colour in each theme, for the one thing that paints its own: the 3D viewer. */
export const PAGE_COLOUR: Record<Theme, string> = { dark: "#000000", light: "#f5f5f7" };
