"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";

/** How far the glow drifts with the pointer, in px, and how much of the way it moves each frame. */
const DRIFT = { x: 30, y: 20, follow: 0.06 };

/**
 * A soft blue light in the corner: a radial gradient, with no blur filter, so
 * it costs nothing to draw. With a pointer it drifts a little towards it,
 * easing from wherever it is so it never snaps. Reduced motion holds it still.
 * It only listens, and only holds its own compositing layer, while on screen.
 */
export function Glow() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const step = () => {
      current.x += (target.x - current.x) * DRIFT.follow;
      current.y += (target.y - current.y) * DRIFT.follow;
      el.style.transform = `translate(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px)`;
      const settled = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const onMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2 * DRIFT.x;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2 * DRIFT.y;
      if (!frame) frame = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [onScreen]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={ref}
        className={`absolute -bottom-[30%] -left-[10%] size-[70vw] rounded-full bg-radial from-link/25 via-link/5 via-45% to-transparent to-70% ${onScreen ? "will-change-transform" : ""}`}
      />
    </div>
  );
}
