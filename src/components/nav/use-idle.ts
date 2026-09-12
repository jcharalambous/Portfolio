import { useEffect, useState } from "react";

type IdleOptions = {
  /** Quiet time before the first idle, in ms. */
  initialDelay: number;
  /** Quiet time after any scroll before going idle again, in ms. */
  delay: number;
};

/** True once the reader has stopped scrolling for a while. Any scroll wakes it. */
export function useIdle({ initialDelay, delay }: IdleOptions): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), initialDelay);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), delay);
    };
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", wake);
    };
  }, [initialDelay, delay]);

  return idle;
}
