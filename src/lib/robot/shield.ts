import { LIGHT, pose, SHIELD, TOTAL_MS } from "./timeline";

type Rotation = { x: number; y: number; z: number };
type SceneObject = { name: string; rotation: Rotation; intensity?: number };

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

/**
 * The model builds one arm and mirrors it; the second copy of each joint is
 * the arm on the right of the screen, the one nearest the bulb.
 */
function nearestArm(robot: Robot, name: string): SceneObject | undefined {
  const copies = robot.getAllObjects().filter((o) => o.name === name);
  return copies[copies.length - 1];
}

function lookAt({ x, y }: Point) {
  // The scene follows the pointer, so a pointer over there turns its head.
  window.dispatchEvent(new PointerEvent("pointermove", { clientX: x, clientY: y, bubbles: true }));
}

/**
 * The robot's answer to the lights coming on: it turns away, brings the near
 * hand up across its visor while the scene's light flares, holds until the
 * glare fades, then lowers the hand and looks back. Runs on animation frames
 * outside React. Returns a function that stops it early.
 */
export function shieldEyes(robot: Robot, { away, back, onDone }: Options): () => void {
  const arm = nearestArm(robot, "arm");
  const elbow = nearestArm(robot, "elbow");
  const lights = robot.getAllObjects().filter((o) => o.intensity !== undefined);
  const joints = [arm, elbow].filter((o): o is SceneObject => o !== undefined);
  // Read the fields one by one: the runtime hands out proxies, and spreading one copies nothing.
  const rest = new Map(
    joints.map((o) => [o, { x: o.rotation.x, y: o.rotation.y, z: o.rotation.z }]),
  );

  lookAt(away);
  const start = performance.now();
  let frame = 0;

  const settle = () => {
    rest.forEach((r, o) => {
      o.rotation.x = r.x;
      o.rotation.y = r.y;
      o.rotation.z = r.z;
    });
    for (const light of lights) light.intensity = LIGHT.rest;
  };

  const step = (now: number) => {
    const { raise, glare } = pose(now - start);
    if (arm) {
      const r = rest.get(arm)!;
      arm.rotation.x = r.x + SHIELD.arm.x * raise;
      arm.rotation.z = r.z + SHIELD.arm.z * raise;
    }
    if (elbow) {
      const r = rest.get(elbow)!;
      elbow.rotation.x = r.x + SHIELD.elbow.x * raise;
    }
    for (const light of lights) light.intensity = LIGHT.rest + (LIGHT.dazzled - LIGHT.rest) * glare;

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
