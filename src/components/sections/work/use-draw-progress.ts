import { useEffect, useEffectEvent, type RefObject } from "react";
import { drawProgress } from "@/lib/scroll/draw-progress";

/**
 * Reports how far the reader has scrolled down `block`, 0 to 1, once per
 * frame while scrolling. Reduced motion reports 1 straight away. The callback
 * runs outside React state so a frame never forces a render.
 */
export function useDrawProgress(
  block: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
): void {
  const report = useEffectEvent(onProgress);

  useEffect(() => {
    const el = block.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      report(
        reduce
          ? 1
          : drawProgress({
              top: rect.top,
              height: rect.height,
              viewportHeight: window.innerHeight,
            }),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [block]);
}
