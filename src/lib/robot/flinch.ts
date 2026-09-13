import { glare, LIGHT, TOTAL_MS } from "./timeline";

type SceneObject = { name: string; intensity?: number };

/** The slice of the Spline runtime this needs. */
export type Robot = {
  getAllObjects(): SceneObject[];
};

type Point = { x: number; y: number };

type Options = {
  /** Where to look while dazzled: away from the light. */
  away: Point;
  /** Where to look once it's over: the visitor's pointer, if known. */
  back: Point;
  onDone: () => void;
};

function lookAt({ x, y }: Point) {
  // The scene follows the pointer, so a pointer over there turns its head.
  window.dispatchEvent(new PointerEvent("pointermove", { clientX: x, clientY: y, bubbles: true }));
}

/**
 * The robot's answer to the lights coming on: it turns away while the scene's
 * light flares, holds until the glare fades, then looks back. Runs on
 * animation frames outside React. Returns a function that stops it early.
 */
export function flinch(robot: Robot, { away, back, onDone }: Options): () => void {
  const lights = robot.getAllObjects().filter((o) => o.intensity !== undefined);
  const start = performance.now();
  let frame = 0;

  const settle = () => {
    for (const light of lights) light.intensity = LIGHT.rest;
  };

  lookAt(away);
  const step = (now: number) => {
    const g = glare(now - start);
    for (const light of lights) light.intensity = LIGHT.rest + (LIGHT.dazzled - LIGHT.rest) * g;
    if (now - start < TOTAL_MS) {
      frame = requestAnimationFrame(step);
    } else {
      settle();
      lookAt(back);
      onDone();
    }
  };

  frame = requestAnimationFrame(step);
  return () => {
    cancelAnimationFrame(frame);
    settle();
  };
}
