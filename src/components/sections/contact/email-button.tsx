"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { NudgeArrow } from "@/components/ui/nudge-arrow";
import { useHydrated } from "@/hooks/use-hydrated";
import { emailAddress, mailto } from "@/lib/email/address";

type Props = {
  /** What the button says once mail is opening. */
  openingLabel: string;
};

/** Idle, then the plane flies on white, then the button turns green and says mail is opening. */
type Phase = "idle" | "flying" | "opening";

/** When the plane is out of the way and the button turns green. Reduced motion skips straight there. */
const LANDED_MS = 1250;
/** When the mail client opens, so the send is seen first. */
const FLIGHT_MS = 1350;
/** How long the button stays green before it resets. */
const RESET_MS = 4000;

const swap =
  "flex items-center justify-center gap-2.5 transition-[translate,opacity] duration-[360ms] ease-strong motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:translate-y-0";

/**
 * The address itself, as the section's main button. Pressing it sends the
 * paper plane off; once it's gone the button turns green, says mail is
 * opening, and opens it. A second press while that plays opens mail at once.
 * The address only exists once the page runs in the browser.
 */
export function EmailButton({ openingLabel }: Props) {
  const hydrated = useHydrated();
  const [phase, setPhase] = useState<Phase>("idle");
  // Counts presses. The timers hang off this, not the phase, so a phase change never cancels them.
  const [flight, setFlight] = useState(0);

  useEffect(() => {
    if (flight === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = [
      window.setTimeout(() => setPhase("opening"), reduce ? 0 : LANDED_MS),
      window.setTimeout(() => window.location.assign(mailto()), reduce ? 0 : FLIGHT_MS),
      window.setTimeout(() => setPhase("idle"), RESET_MS),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [flight]);

  const idle = phase === "idle";
  const opening = phase === "opening";

  return (
    <ButtonLink
      variant="light"
      href={hydrated ? mailto() : undefined}
      data-arm=""
      onClick={(event) => {
        // Already in flight: let the browser follow the link straight away.
        if (!idle) return;
        event.preventDefault();
        setPhase("flying");
        setFlight((count) => count + 1);
      }}
      data-opening={opening || undefined}
      className="group relative isolate min-w-[min(330px,100%)] overflow-hidden data-opening:bg-live data-opening:text-white data-opening:hover:bg-live"
    >
      <span aria-hidden={!idle} className={`${swap} ${idle ? "" : "-translate-y-[60%] opacity-0"}`}>
        {hydrated ? emailAddress() : " "}
        <NudgeArrow />
      </span>
      <Plane flying={!idle} />
      <span
        aria-hidden={!opening}
        className={`${swap} absolute inset-0 ${opening ? "" : "translate-y-[60%] opacity-0"}`}
      >
        {openingLabel}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-[18px] fill-none stroke-current"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5l4.5 4.5L19 7" />
        </svg>
      </span>
    </ButtonLink>
  );
}

/** A paper plane that winds up to the left, pauses, and shoots out the right with a streak behind it. */
function Plane({ flying }: { flying: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 ${flying ? "animate-fly motion-reduce:animate-none" : ""}`}
    >
      <span className="relative size-[26px]">
        <span
          className={`absolute top-[calc(50%-1px)] right-full h-0.5 w-[90px] origin-right scale-x-0 bg-linear-to-r from-transparent to-ink-muted opacity-0 ${flying ? "animate-trail motion-reduce:animate-none" : ""}`}
        />
        <svg
          viewBox="0 0 24 24"
          className="size-[26px] fill-white stroke-black/70"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M3 11.5 21 3l-6 18-3.5-7.5L3 11.5Z" />
          <path d="M11.5 13.5 21 3" />
        </svg>
      </span>
    </span>
  );
}
