import type { Particle } from "./types";

/** Paint one frame on a transparent canvas. Faster particles glow bluer and brighter. */
export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height);
  for (const p of particles) {
    const speed = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) * 0.1);
    ctx.fillStyle = `hsl(210 ${8 + speed * 70}% ${p.lightness + speed * 8}%)`;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
}
