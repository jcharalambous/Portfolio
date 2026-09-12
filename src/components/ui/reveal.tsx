"use client";

import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useInView } from "@/hooks/use-in-view";

/** Stagger steps within a group. Classes rather than a style attribute, which the security policy would block. */
const delays = {
  0: "",
  60: "[transition-delay:60ms]",
  120: "[transition-delay:120ms]",
  180: "[transition-delay:180ms]",
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger within a group, in ms. */
  delay?: keyof typeof delays;
  threshold?: number;
};

/**
 * Fades and lifts its children in the first time they scroll into view.
 * Server rendering shows them plainly, so nothing is hidden without JavaScript.
 */
export function Reveal({ children, className, delay = 0, threshold = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const inView = useInView(ref, { threshold });
  const hidden = hydrated && !inView;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-strong motion-reduce:transition-none ${delays[delay]} ${hidden ? "translate-y-4 opacity-0 motion-reduce:translate-y-0" : "translate-y-0 opacity-100"} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
