"use client";

import { useEffect, useRef } from "react";
import { glyph, seedColumns, stepColumns } from "@/lib/code-rain/columns";

/** Glyph size and column pitch, in px. */
const CELL = 11;
/** Time between rows, in ms. */
const STEP_MS = 90;
/** Matches the canvas's fade-out, so it clears once it can't be seen. */
const CLEAR_MS = 420;
const FONT = `${CELL}px "SF Mono", ui-monospace, Menlo, monospace`;

/**
 * Falling code behind the GitHub button, drawn only while the pointer is over
 * it. Decorative, so it needs a real pointer and never runs under reduced motion.
 */
export function CodeRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let columns: number[] = [];
    let rows = 0;
    let frame = 0;
    let last = 0;
    let clearTimer = 0;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (now - last < STEP_MS) return;
      last = now;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = FONT;
      columns.forEach((y, i) => {
        const ch = glyph();
        ctx.fillStyle = "#c8ffd6";
        ctx.fillText(ch, i * CELL, y * CELL);
        ctx.fillStyle = "rgba(48, 209, 88, 0.85)";
        ctx.fillText(ch, i * CELL, (y - 1) * CELL);
      });
      columns = stepColumns(columns, rows);
    };
    const start = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      window.clearTimeout(clearTimer);
      const { width, height } = host.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      columns = seedColumns(width, CELL);
      rows = height / CELL;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimer = window.setTimeout(
        () => ctx.clearRect(0, 0, canvas.width, canvas.height),
        CLEAR_MS,
      );
    };

    host.addEventListener("pointerenter", start);
    host.addEventListener("pointerleave", stop);
    return () => {
      host.removeEventListener("pointerenter", start);
      host.removeEventListener("pointerleave", stop);
      cancelAnimationFrame(frame);
      window.clearTimeout(clearTimer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-[400ms] ease-strong group-hover:opacity-100"
    />
  );
}
