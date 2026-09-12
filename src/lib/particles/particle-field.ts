import type { Particle, Point } from "./types";

export const PHYSICS = {
  /** Pull toward the resting position, per frame. */
  pull: 0.06,
  damping: 0.84,
  /** Pointer influence radius in CSS pixels. */
  radius: 100,
  repel: 2.6,
  /** Extra push right after a click, decaying each frame. */
  burstForce: 36,
  burstDecay: 0.92,
  /** How fast the smoothed pointer follows the real one. */
  pointerLag: 0.2,
};

export function createParticles(
  points: Point[],
  width: number,
  height: number,
  settled = false,
  random: () => number = Math.random,
): Particle[] {
  return points.map((p) => {
    const size = 1.1 + random() * 0.7;
    const lightness = 88 + random() * 8;
    if (settled) return { tx: p.x, ty: p.y, x: p.x, y: p.y, vx: 0, vy: 0, size, lightness };
    // Start on a ring well outside the viewport so the headline flies in.
    const angle = random() * Math.PI * 2;
    const distance = Math.max(width, height) * (0.5 + random() * 0.6);
    return {
      tx: p.x,
      ty: p.y,
      x: width / 2 + Math.cos(angle) * distance,
      y: height / 2 + Math.sin(angle) * distance,
      vx: 0,
      vy: 0,
      size,
      lightness,
    };
  });
}

/** Advance every particle one frame. Mutates in place; no DOM. */
export function stepParticles(particles: Particle[], pointer: Point, burst: number): void {
  const radius2 = PHYSICS.radius * PHYSICS.radius;
  for (const p of particles) {
    let ax = (p.tx - p.x) * PHYSICS.pull;
    let ay = (p.ty - p.y) * PHYSICS.pull;
    const dx = p.x - pointer.x;
    const dy = p.y - pointer.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < radius2) {
      const d = Math.sqrt(d2) || 1;
      const force = (1 - d / PHYSICS.radius) * (PHYSICS.repel + burst * PHYSICS.burstForce);
      ax += (dx / d) * force;
      ay += (dy / d) * force;
    }
    p.vx = (p.vx + ax) * PHYSICS.damping;
    p.vy = (p.vy + ay) * PHYSICS.damping;
    p.x += p.vx;
    p.y += p.vy;
  }
}
