import { drawParticles } from "./draw-particles";
import { PHYSICS, createParticles, stepParticles } from "./particle-field";
import { sampleTextPoints } from "./sample-text";
import type { Particle, Point } from "./types";

export type ParticleHeadlineOptions = {
  canvas: HTMLCanvasElement;
  /** Element the canvas fills. Its pointer events drive the field, and its left padding is the gutter. */
  host: HTMLElement;
  lines: string[];
  /** Skip the fly-in and start at rest (reduced motion). */
  settleImmediately?: boolean;
};

const OFFSCREEN: Point = { x: -9999, y: -9999 };

/**
 * Wire the particle headline to the DOM: sizing, pointer input, the frame
 * loop, and pausing while off screen. Returns a function that tears it down.
 */
export function mountParticleHeadline({
  canvas,
  host,
  lines,
  settleImmediately = false,
}: ParticleHeadlineOptions): () => void {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const fontFamily = getComputedStyle(document.body).fontFamily;
  const pointer: Point = { ...OFFSCREEN };
  const target: Point = { ...OFFSCREEN };
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let burst = 0;
  let frameId = 0;
  let running = false;
  let disposed = false;

  function build() {
    width = host.clientWidth;
    height = host.clientHeight;
    if (!width || !height) return;
    const gutter = parseFloat(getComputedStyle(host).paddingLeft) || 0;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = createParticles(
      sampleTextPoints({ width, height, gutter, lines, fontFamily }),
      width,
      height,
      settleImmediately,
    );
  }

  function frame() {
    pointer.x += (target.x - pointer.x) * PHYSICS.pointerLag;
    pointer.y += (target.y - pointer.y) * PHYSICS.pointerLag;
    burst *= PHYSICS.burstDecay;
    stepParticles(particles, pointer, burst);
    drawParticles(ctx!, particles, width, height);
    frameId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || disposed) return;
    running = true;
    frameId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frameId);
  }

  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    target.x = e.clientX - r.left;
    target.y = e.clientY - r.top;
  };
  const onLeave = () => {
    target.x = OFFSCREEN.x;
    target.y = OFFSCREEN.y;
  };
  const onDown = () => {
    burst = 1;
  };
  host.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointerdown", onDown);

  const resize = new ResizeObserver(() => build());
  const visibility = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) start();
    else stop();
  });

  // Measure only once the real font is available, or the text is sampled in a fallback face.
  document.fonts.ready.then(() => {
    if (disposed) return;
    resize.observe(host); // fires once immediately, which does the first build
    visibility.observe(host);
  });

  return () => {
    disposed = true;
    stop();
    resize.disconnect();
    visibility.disconnect();
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    host.removeEventListener("pointerdown", onDown);
  };
}
