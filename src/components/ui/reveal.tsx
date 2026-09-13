"use client";

import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useInView } from "@/hooks/use-in-view";

/** Stagger steps within a group, on the way in only. Classes rather than a style attribute, which the security policy would block. */
const delays = {
  0: "",
  60: "[transition-delay:60ms]",
  120: "[transition-delay:120ms]",
  180: "[transition-delay:180ms]",
} as const;

/** Arriving takes its time; leaving is quick, and only happens once the block is fully off screen. */
const shown = "translate-y-0 opacity-100 duration-700";
const hidden = "translate-y-4 opacity-0 duration-300 motion-reduce:translate-y-0";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger within a group, in ms. */
  delay?: keyof typeof delays;
  threshold?: number;
};

/**
 * Fades and lifts its children in as they scroll into view, and drops them back
 * out once they have left, so the effect plays again on the way down. Reduced
 * motion keeps a short fade and loses the lift.
 * Server rendering shows them plainly, so nothing is hidden without JavaScript.
 */
export function Reveal({ children, className, delay = 0, threshold = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const inView = useInView(ref, { threshold });
  const away = hydrated && !inView;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] ease-strong motion-reduce:transition-opacity motion-reduce:duration-200 ${away ? hidden : `${shown} ${delays[delay]}`} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
