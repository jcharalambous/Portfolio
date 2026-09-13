"use client";

import type { ReactNode } from "react";
import { ThemeContext } from "@/hooks/use-theme";
import type { Theme } from "@/lib/theme/theme";

/** Hands the served theme to the client, so the first render matches the server's. */
export function ThemeProvider({ theme, children }: { theme: Theme; children: ReactNode }) {
  return <ThemeContext value={theme}>{children}</ThemeContext>;
}
