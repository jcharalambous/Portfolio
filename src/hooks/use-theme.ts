import { createContext, useContext, useSyncExternalStore } from "react";
import { DEFAULT_THEME, parseTheme, THEME_COOKIE, type Theme } from "@/lib/theme/theme";

/** The theme the page was served with, so hydration renders what the server rendered. */
export const ThemeContext = createContext<Theme>(DEFAULT_THEME);

const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const read = (): Theme => parseTheme(document.documentElement.dataset.theme);

/** Switches the whole page, remembers the choice, and tells every `useTheme` about it. */
export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.cookie = `${THEME_COOKIE}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  listeners.forEach((listener) => listener());
}

/** The current theme, live. The source of truth is the attribute on <html>. */
export function useTheme(): Theme {
  const served = useContext(ThemeContext);
  return useSyncExternalStore(subscribe, read, () => served);
}
