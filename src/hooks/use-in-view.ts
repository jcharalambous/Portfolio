import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** How much of the element must be visible before it counts as in view, 0 to 1. */
  threshold?: number;
  /** Stay true after the first time, even when it scrolls away again. */
  once?: boolean;
};

/**
 * True from when `threshold` of the element is on screen until it has scrolled
 * fully off again, so nothing still being read fades under the reader. With
 * `once`, it stays true after the first time.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0, once = false }: Options = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!entry.isIntersecting && !once) {
          setInView(false);
        }
      },
      // Fires on reaching `threshold` on the way in, and on the way out only once fully gone.
      { threshold: [0, threshold] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return inView;
}
