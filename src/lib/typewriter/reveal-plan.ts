import type { TerminalLine } from "@/content/about";

/** One moment in the typing: how much of which line is visible, and when. */
export type RevealStep = { at: number; line: number; chars: number };

export type RevealTiming = {
  /** Per typed character of a command. */
  charMs: number;
  /** Pause after a command is fully typed, before its output. */
  afterCommandMs: number;
  /** Pause after an output, before the next command starts. */
  afterOutputMs: number;
};

export const DEFAULT_TIMING: RevealTiming = { charMs: 38, afterCommandMs: 180, afterOutputMs: 260 };

/**
 * Turns a script into timed steps. Commands appear a character at a time;
 * outputs appear whole. Pure, so the schedule can be tested without a clock.
 */
export function revealPlan(
  script: readonly TerminalLine[],
  timing: RevealTiming = DEFAULT_TIMING,
): RevealStep[] {
  const steps: RevealStep[] = [];
  let at = 0;
  script.forEach((entry, line) => {
    if (entry.kind === "command") {
      for (let chars = 1; chars <= entry.text.length; chars++) {
        at += timing.charMs;
        steps.push({ at, line, chars });
      }
      at += timing.afterCommandMs;
    } else {
      steps.push({ at, line, chars: entry.text.length });
      at += timing.afterOutputMs;
    }
  });
  return steps;
}

/** When the whole script has finished, including the pause after the last line. */
export function revealEnd(
  script: readonly TerminalLine[],
  timing: RevealTiming = DEFAULT_TIMING,
): number {
  const last = script[script.length - 1];
  if (!last) return 0;
  const steps = revealPlan(script, timing);
  const tail = last?.kind === "command" ? timing.afterCommandMs : timing.afterOutputMs;
  return (steps[steps.length - 1]?.at ?? 0) + tail;
}
