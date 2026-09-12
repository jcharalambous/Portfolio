import { useEffect } from "react";

/** How long after mount the landing keeps correcting itself as layout settles. */
const SETTLE_MS = 1500;
/** The reader taking over ends the correction at once. */
const USER_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

/**
 * Makes sure a page opened at /#section really lands on that section.
 * Browsers scroll to the fragment while the page is still laying out, and
 * sections sized by the viewport can grow after that, pushing the target
 * away again. So for a short while after mount, whenever the page changes
 * size, put the target back at the top. Any input from the reader stops it.
 */
export function useAnchorLanding(ids: readonly string[]): void {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && ids.includes(id) ? document.getElementById(id) : null;
    if (!target) return;

    const land = () => {
      if (target.offsetHeight === 0) return;
      if (Math.abs(target.getBoundingClientRect().top) > 2) {
        target.scrollIntoView({ block: "start", behavior: "instant" });
      }
    };

    const layout = new ResizeObserver(land);
    layout.observe(document.body);
    const stop = () => {
      layout.disconnect();
      window.clearTimeout(timer);
      USER_EVENTS.forEach((type) => window.removeEventListener(type, stop));
    };
    const timer = window.setTimeout(stop, SETTLE_MS);
    USER_EVENTS.forEach((type) => window.addEventListener(type, stop, { passive: true }));
    land();

    return stop;
  }, [ids]);
}
