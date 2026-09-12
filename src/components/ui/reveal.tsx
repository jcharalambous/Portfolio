"use client";

import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useInView } from "@/hooks/use-in-view";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger within a group, in ms. */
  delay?: number;
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
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-700 ease-strong motion-reduce:transition-none ${hidden ? "translate-y-4 opacity-0 motion-reduce:translate-y-0" : "translate-y-0 opacity-100"} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
