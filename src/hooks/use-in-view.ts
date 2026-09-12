import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** How much of the element must be visible, 0 to 1. */
  threshold?: number;
  /** Stay true after the first time, even when it scrolls away again. */
  once?: boolean;
};

/** True while (or, with `once`, after) the element is in the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0, once = true }: Options = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return inView;
}
