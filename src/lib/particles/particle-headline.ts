import { drawParticles } from "./draw-particles";
import { PHYSICS, createParticles, stepParticles } from "./particle-field";
import { sampleTextPoints } from "./sample-text";
import type { Particle, Point } from "./types";

export type ParticleHeadlineOptions = {
  canvas: HTMLCanvasElement;
  /** Element the canvas fills. Its pointer events drive the field, and its left padding is the gutter. */
  host: HTMLElement;
  lines: string[];
  /** Skip the fly-in and start at rest (reduced motion, or a re-colour). */
  settleImmediately?: boolean;
  /** Draw in dark ink, for a light page. */
  onLight?: boolean;
  /** Called once, the first time the headline has fully formed. */
  onSettled?: () => void;
};

const OFFSCREEN: Point = { x: -9999, y: -9999 };
/** Below this speed a particle counts as at rest. */
const REST_SPEED = 0.02;
/** Consecutive resting frames before the loop stops. */
const REST_FRAMES = 30;

/**
 * Wire the particle headline to the DOM: sizing, pointer input, the frame
 * loop, and pausing while off screen. Returns a function that tears it down.
 */
export function mountParticleHeadline({
  canvas,
  host,
  lines,
  settleImmediately = false,
  onLight = false,
  onSettled,
}: ParticleHeadlineOptions): () => void {
  const ctx = canvas.getContext("2d");
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
  let stillFrames = 0;
  let settled = false;

  function reportSettled() {
    if (settled) return;
    settled = true;
    onSettled?.();
  }

  /** Lay the headline out again for the host's current size. A no-op if the size is unchanged. */
  function build() {
    const nextWidth = host.clientWidth;
    const nextHeight = host.clientHeight;
    if (!nextWidth || !nextHeight) return;
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    const gutter = parseFloat(getComputedStyle(host).paddingLeft) || 0;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Phones move fewer dots: sample every third pixel instead of every second.
    const step = width > 820 ? 2 : 3;
    particles = createParticles(
      sampleTextPoints({ width, height, gutter, lines, fontFamily, step }),
      width,
      height,
      settleImmediately,
    );
    if (settleImmediately) reportSettled();
    start();
  }

  function frame() {
    pointer.x += (target.x - pointer.x) * PHYSICS.pointerLag;
    pointer.y += (target.y - pointer.y) * PHYSICS.pointerLag;
    burst *= PHYSICS.burstDecay;
    const fastest = stepParticles(particles, pointer, burst);
    drawParticles(ctx!, particles, width, height, onLight);

    // Once the field has settled and nothing is pushing it, stop drawing until something changes.
    const pointerAway = target.x === OFFSCREEN.x;
    stillFrames = fastest < REST_SPEED && pointerAway ? stillFrames + 1 : 0;
    if (stillFrames > REST_FRAMES) {
      reportSettled();
      stop();
      return;
    }
    frameId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || disposed) return;
    running = true;
    stillFrames = 0;
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
    start();
  };
  const onLeave = () => {
    target.x = OFFSCREEN.x;
    target.y = OFFSCREEN.y;
  };
  const onDown = () => {
    burst = 1;
    start();
  };
  host.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointerdown", onDown);

  // Rebuilding samples the whole headline again, so wait for the resize to settle.
  // The host's padding is the gutter, which can change without its content box
  // changing, so watch the border box and the window as well.
  let rebuildTimer = 0;
  const rebuildSoon = () => {
    window.clearTimeout(rebuildTimer);
    rebuildTimer = window.setTimeout(build, 120);
  };
  const resize = new ResizeObserver(rebuildSoon);
  const visibility = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) start();
    else stop();
  });

  // Measure only once the real font is available, or the text is sampled in a fallback face.
  document.fonts.ready.then(() => {
    if (disposed) return;
    build();
    resize.observe(host, { box: "border-box" });
    window.addEventListener("resize", rebuildSoon);
    visibility.observe(host);
  });

  return () => {
    disposed = true;
    stop();
    window.clearTimeout(rebuildTimer);
    window.removeEventListener("resize", rebuildSoon);
    resize.disconnect();
    visibility.disconnect();
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    host.removeEventListener("pointerdown", onDown);
  };
}
