import { useEffect, useState } from "react";
import type { TerminalLine } from "@/content/about";
import { useHydrated } from "@/hooks/use-hydrated";
import { revealEnd, revealPlan } from "@/lib/typewriter/reveal-plan";

export type TypewriterState = {
  /** Index of the line being revealed. Equal to the script length once finished. */
  line: number;
  /** Characters of that line shown so far. */
  chars: number;
  done: boolean;
};

type Options = {
  /** Begin typing. Until then nothing is shown. */
  start: boolean;
  /** Skip the typing and show everything (reduced motion). */
  instant: boolean;
};

/**
 * Plays a terminal script. Server rendering shows the whole script, so the
 * text is in the HTML for readers without JavaScript and for search engines.
 * Once live in the browser it hides the lines and types them when told to start.
 */
export function useTypewriter(
  script: readonly TerminalLine[],
  { start, instant }: Options,
): TypewriterState {
  const hydrated = useHydrated();
  const [typed, setTyped] = useState<TypewriterState>({ line: 0, chars: 0, done: false });

  useEffect(() => {
    if (!start || instant) return;
    const timers = revealPlan(script).map((step) =>
      window.setTimeout(
        () => setTyped({ line: step.line, chars: step.chars, done: false }),
        step.at,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setTyped({ line: script.length, chars: 0, done: true }),
        revealEnd(script),
      ),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [start, instant, script]);

  if (!hydrated || instant) return { line: script.length, chars: 0, done: true };
  return typed;
}
