/**
 * How the robot answers the lights coming on: a quick flinch, the near hand up
 * across the visor, held while the glare fades, then lowered with a little
 * follow-through.
 */
export const RAISE_MS = 380;
export const HOLD_MS = 700;
export const LOWER_MS = 550;
export const TOTAL_MS = RAISE_MS + HOLD_MS + LOWER_MS;

/** Radians added to the joints' resting pose with the hand up at the visor. Found by posing the model on screen. */
export const SHIELD = { arm: { x: -1.9, z: -0.6 }, elbow: { x: 1.4 } } as const;
/** The scene's point light at rest, and at the flash. */
export const LIGHT = { rest: 5, dazzled: 12 } as const;

/** Strong ease-out: a flinch starts fast. */
export function easeOut(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - c, 4);
}

/** Ease-out with a small overshoot at the end: the arm drops past rest and settles. */
export function easeOutBack(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  const k = 0.9;
  return 1 + (k + 1) * Math.pow(c - 1, 3) + k * Math.pow(c - 1, 2);
}

export type Pose = {
  /** 0 at rest, 1 with the hand at the visor. Dips a touch below 0 as it settles. */
  raise: number;
  /** How hard the light flares: full at the flinch, fading through the hold. */
  glare: number;
};

export function pose(elapsed: number): Pose {
  if (elapsed <= RAISE_MS) {
    const p = easeOut(elapsed / RAISE_MS);
    return { raise: p, glare: p };
  }
  const held = elapsed - RAISE_MS;
  if (held <= HOLD_MS) return { raise: 1, glare: 1 - (held / HOLD_MS) * 0.7 };
  const t = (held - HOLD_MS) / LOWER_MS;
  if (t >= 1) return { raise: 0, glare: 0 };
  return { raise: 1 - easeOutBack(t), glare: 0.3 * (1 - t) };
}
