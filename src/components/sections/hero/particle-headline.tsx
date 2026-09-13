"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";
import { mountParticleHeadline } from "@/lib/particles/particle-headline";

type Props = {
  lines: string[];
  className?: string;
  /** Fires once the headline has fully formed. */
  onSettled?: () => void;
};

/**
 * The headline drawn as a particle field that reacts to the pointer. Decorative:
 * the real heading is in the DOM. Drawn in the page's ink; a theme change
 * redraws it in place rather than flying it in again.
 */
export function ParticleHeadline({ lines, className, onSettled }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = lines.join("\n");
  const theme = useTheme();
  const lastTheme = useRef(theme);
  const settled = useEffectEvent(() => onSettled?.());

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const recoloured = lastTheme.current !== theme;
    lastTheme.current = theme;
    return mountParticleHeadline({
      canvas,
      host,
      lines: text.split("\n"),
      settleImmediately:
        recoloured || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      onLight: theme === "light",
      onSettled: settled,
    });
  }, [text, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
