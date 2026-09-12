import { expect, test } from "vitest";
import { createParticles, stepParticles } from "./particle-field";

const far = { x: -9999, y: -9999 };

test("settled particles start at their resting position", () => {
  const [p] = createParticles([{ x: 10, y: 20 }], 800, 600, true, () => 0.5);
  expect([p.x, p.y]).toEqual([10, 20]);
});

test("unsettled particles start on a ring at least half the viewport out", () => {
  const [p] = createParticles([{ x: 10, y: 20 }], 800, 600, false, () => 0.5);
  expect(Math.hypot(p.x - 400, p.y - 300)).toBeCloseTo(640);
});

test("particles settle onto their targets with no pointer nearby", () => {
  const particles = createParticles([{ x: 100, y: 100 }], 800, 600, false, () => 0.5);
  for (let i = 0; i < 200; i++) stepParticles(particles, far, 0);
  const [p] = particles;
  expect(Math.hypot(p.x - p.tx, p.y - p.ty)).toBeLessThan(0.5);
});

test("a pointer inside the radius pushes particles away from it", () => {
  const particles = createParticles([{ x: 100, y: 100 }], 800, 600, true);
  stepParticles(particles, { x: 90, y: 100 }, 0);
  expect(particles[0].x).toBeGreaterThan(100);
});

test("a burst pushes harder than a plain pointer", () => {
  const calm = createParticles([{ x: 100, y: 100 }], 800, 600, true);
  const burst = createParticles([{ x: 100, y: 100 }], 800, 600, true);
  stepParticles(calm, { x: 90, y: 100 }, 0);
  stepParticles(burst, { x: 90, y: 100 }, 1);
  expect(burst[0].x).toBeGreaterThan(calm[0].x);
});
