"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { mountParticleHeadline } from "@/lib/particles/particle-headline";

type Props = {
  lines: string[];
  className?: string;
  /** Fires once the headline has fully formed. */
  onSettled?: () => void;
};

/** The headline drawn as a particle field that reacts to the pointer. Decorative: the real heading is in the DOM. */
export function ParticleHeadline({ lines, className, onSettled }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = lines.join("\n");
  const settled = useEffectEvent(() => onSettled?.());

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    return mountParticleHeadline({
      canvas,
      host,
      lines: text.split("\n"),
      settleImmediately: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      onSettled: settled,
    });
  }, [text]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
