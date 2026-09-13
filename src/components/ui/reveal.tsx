"use client";

import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useInView } from "@/hooks/use-in-view";

/** Stagger steps within a group, on the way in only. Classes rather than inline styles, so the policy can stay strict. */
const delays = {
  0: "",
  60: "[transition-delay:60ms]",
  120: "[transition-delay:120ms]",
  180: "[transition-delay:180ms]",
  240: "[transition-delay:240ms]",
  300: "[transition-delay:300ms]",
  360: "[transition-delay:360ms]",
  420: "[transition-delay:420ms]",
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
  /** A span where a div would be invalid, such as inside a heading. */
  as?: "div" | "span";
};

/**
 * Fades and lifts its children in as they scroll into view, and drops them back
 * out once they have left, so the effect plays again on the way down. Reduced
 * motion keeps a short fade and loses the lift.
 * Server rendering shows them plainly, so nothing is hidden without JavaScript.
 */
export function Reveal({ children, className, delay = 0, threshold = 0.25, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const inView = useInView(ref, { threshold });
  const away = hydrated && !inView;
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,translate] ease-strong motion-reduce:transition-opacity motion-reduce:duration-200 ${away ? hidden : `${shown} ${delays[delay]}`} ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}
