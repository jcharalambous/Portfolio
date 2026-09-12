export type Point = { x: number; y: number };

export type Particle = {
  /** Resting position, sampled from the rendered headline. */
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Square size in CSS pixels. */
  size: number;
  /** One of a few base shades, so the field isn't flat. */
  tone: number;
};
