"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { childCentres, nearestIndex, scrollLeftFor } from "@/lib/carousel/position";

/**
 * Which card sits in the middle of a snapping track, and a way to bring another one there.
 * Asking for a card marks it active straight away, so the track responds on the press
 * rather than when the scroll passes halfway; a swipe or wheel takes over at any point.
 */
export function useCarousel(count: number) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  // The card a programmatic scroll is heading for, until the scroll reaches it or the reader interrupts.
  const settling = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const nearest = nearestIndex(childCentres(track), track.scrollLeft + track.clientWidth / 2);
      if (settling.current !== null && nearest !== settling.current) return;
      settling.current = null;
      setActive(nearest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const interrupt = () => {
      settling.current = null;
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", interrupt, { passive: true });
    track.addEventListener("wheel", interrupt, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", interrupt);
      track.removeEventListener("wheel", interrupt);
      cancelAnimationFrame(frame);
    };
  }, []);

  const go = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const target = Math.min(Math.max(index, 0), count - 1);
      settling.current = target;
      setActive(target);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({
        left: scrollLeftFor(childCentres(track)[target], track.clientWidth),
        behavior: reduce ? "instant" : "smooth",
      });
    },
    [count],
  );

  return { trackRef, active, go };
}
