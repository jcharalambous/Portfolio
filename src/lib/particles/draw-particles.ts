import { TONES } from "./particle-field";
import type { Particle } from "./types";

/*
 * Colour is quantised into a small palette so a frame is a handful of fills
 * rather than one fill per particle. Faster particles glow bluer and, on a
 * dark page, brighter; on a light page the ink is dark and speed lifts it.
 */
const SPEED_STEPS = 6;

function makePalette(onLight: boolean): string[] {
  const palette: string[] = [];
  for (let s = 0; s < SPEED_STEPS; s++) {
    const t = s / (SPEED_STEPS - 1);
    for (let tone = 0; tone < TONES; tone++) {
      palette.push(
        onLight
          ? `hsl(210 ${10 + t * 80}% ${14 + tone * 3 + t * 22}%)`
          : `hsl(210 ${8 + t * 70}% ${88 + tone * 3 + t * 8}%)`,
      );
    }
  }
  return palette;
}
const palettes = { dark: makePalette(false), light: makePalette(true) };
const buckets: Particle[][] = palettes.dark.map(() => []);

/** Paint one frame on a transparent canvas, in the ink of the page it sits on. */
export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  onLight = false,
): void {
  const palette = onLight ? palettes.light : palettes.dark;
  ctx.clearRect(0, 0, width, height);

  for (const p of particles) {
    const speed = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) * 0.1);
    const step = Math.round(speed * (SPEED_STEPS - 1));
    buckets[step * TONES + p.tone].push(p);
  }

  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i];
    if (bucket.length === 0) continue;
    ctx.fillStyle = palette[i];
    ctx.beginPath();
    for (const p of bucket) ctx.rect(p.x, p.y, p.size, p.size);
    ctx.fill();
    bucket.length = 0;
  }
}
