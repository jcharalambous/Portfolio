/**
 * How the robot answers the lights coming on: it turns away while the scene's
 * light flares, holds until the glare fades, then looks back.
 */
export const FLARE_MS = 380;
export const HOLD_MS = 700;
export const FADE_MS = 550;
export const TOTAL_MS = FLARE_MS + HOLD_MS + FADE_MS;

/** The scene's point light at rest, and at the flash. */
export const LIGHT = { rest: 5, dazzled: 12 } as const;

/** Strong ease-out: a flash starts fast. */
export function easeOut(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - c, 4);
}

/** How hard the light flares at a given moment: full at the flash, fading through the hold, gone by the end. */
export function glare(elapsed: number): number {
  if (elapsed <= FLARE_MS) return easeOut(elapsed / FLARE_MS);
  const held = elapsed - FLARE_MS;
  if (held <= HOLD_MS) return 1 - (held / HOLD_MS) * 0.7;
  const t = (held - HOLD_MS) / FADE_MS;
  return t >= 1 ? 0 : 0.3 * (1 - t);
}
