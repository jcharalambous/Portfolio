import { useEffect, useEffectEvent } from "react";
import {
  locateSection,
  type SectionPosition,
} from "@/lib/scroll/active-section";

/**
 * Reports which section sits under the middle of the viewport, and how far
 * through it the reader is, once per animation frame while scrolling.
 * The callback runs outside React state so a frame never forces a render.
 */
export function useSectionPosition(
  ids: readonly string[],
  onChange: (position: SectionPosition) => void,
): void {
  const report = useEffectEvent(onChange);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;

    const measure = () => {
      frame = 0;
      const probe = window.scrollY + window.innerHeight / 2;
      const bounds = elements.map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return { top, bottom: top + el.offsetHeight };
      });
      report(locateSection(bounds, probe));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);
}
