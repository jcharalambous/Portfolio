"use client";

import { useEffect, useRef, useState } from "react";
import { lightsContent } from "@/content/lights";
import { setTheme, useTheme } from "@/hooks/use-theme";
import { clickSound } from "@/lib/robot/click-sound";
import { shieldEyes, type Robot } from "@/lib/robot/shield";
import { PendantIcon } from "./pendant-icon";

/** How long the pendant swings after a pull. Matches the swing keyframes. */
const SWING_MS = 900;

/** The visitor's last known pointer, so the robot can look back at them afterwards. */
const lastPointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.isTrusted) Object.assign(lastPointer, { x: event.clientX, y: event.clientY });
    },
    { passive: true },
  );
}

/** The live robot, if the viewer has loaded it. */
function findRobot(): Robot | undefined {
  const viewer = document.querySelector<SplineViewerElement>("spline-viewer");
  const app = viewer?._spline as (Robot & { getAllObjects?: unknown }) | undefined;
  return app && typeof app.getAllObjects === "function" ? app : undefined;
}

/**
 * A pendant bulb hanging from the top right of the hero, and the site's light
 * switch. Pulling it swaps the page's colours and remembers the choice. When
 * the lights come on, the robot flinches and shields its visor for a moment.
 * Without the live robot, or under reduced motion, the colours simply swap.
 */
export function LightSwitch() {
  const theme = useTheme();
  const lit = theme === "light";
  const [swinging, setSwinging] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const stop = useRef<() => void>(() => {});

  useEffect(() => {
    if (!swinging) return;
    const timer = window.setTimeout(() => setSwinging(false), SWING_MS);
    return () => window.clearTimeout(timer);
  }, [swinging]);
  useEffect(() => () => stop.current(), []);

  const pull = () => {
    const next = lit ? "dark" : "light";
    setTheme(next);
    clickSound();
    setSwinging(true);
    stop.current();
    stop.current = () => {};
    const robot = findRobot();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (next === "light" && robot && !reduce) {
      const box = button.current!.getBoundingClientRect();
      stop.current = shieldEyes(robot, {
        // Away from the bulb: down and to the far left of the page.
        away: { x: 0, y: window.innerHeight },
        back:
          lastPointer.x || lastPointer.y
            ? lastPointer
            : { x: box.x - window.innerWidth / 3, y: box.y + window.innerHeight / 2 },
        onDone: () => (stop.current = () => {}),
      });
    }
  };

  const label = lit ? lightsContent.offLabel : lightsContent.onLabel;

  return (
    <button
      ref={button}
      type="button"
      aria-pressed={lit}
      aria-label={label}
      title={label}
      // The hero bursts its particles on any press; this press is for the switch alone.
      onPointerDown={(event) => event.stopPropagation()}
      onClick={pull}
      className="group absolute top-0 right-[clamp(22px,4vw,64px)] z-30 block outline-none max-stack:hidden focus-visible:[&>svg]:text-ink"
    >
      <PendantIcon lit={lit} swinging={swinging} />
    </button>
  );
}
