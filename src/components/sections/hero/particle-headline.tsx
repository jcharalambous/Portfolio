"use client";

import { useEffect, useRef } from "react";
import { mountParticleHeadline } from "@/lib/particles/particle-headline";

type Props = {
  lines: string[];
  className?: string;
};

/** The headline drawn as a particle field that reacts to the pointer. Decorative: the real heading is in the DOM. */
export function ParticleHeadline({ lines, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = lines.join("\n");

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    return mountParticleHeadline({
      canvas,
      host,
      lines: text.split("\n"),
      settleImmediately: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, [text]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
