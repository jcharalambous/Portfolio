"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ParticleHeadline } from "./particle-headline";
import { SplineScene } from "./spline-scene";

type Props = {
  lines: string[];
  scene: string;
  poster: string;
};

/** If the headline never settles (a pointer sitting on it), start the scene anyway after this long. */
const SCENE_FALLBACK_MS = 2500;

/** The live scene runs from the `stack` breakpoint up; smaller screens get the still. */
function liveSceneQuery() {
  const stack = getComputedStyle(document.documentElement)
    .getPropertyValue("--breakpoint-stack")
    .trim();
  return `(min-width: ${stack || "51.25rem"})`;
}

// Fades that melt the scene into the page: a left edge beside the headline on
// desktop; top and bottom edges behind the copy on phones.
const fades =
  "after:pointer-events-none after:absolute after:content-[''] stack:after:inset-y-0 stack:after:left-0 stack:after:w-[22%] stack:after:bg-linear-to-r stack:after:from-page stack:after:to-transparent max-stack:after:inset-x-0 max-stack:after:top-0 max-stack:after:h-[30%] max-stack:after:bg-linear-to-b max-stack:after:from-page max-stack:after:to-transparent max-stack:before:pointer-events-none max-stack:before:absolute max-stack:before:inset-x-0 max-stack:before:bottom-0 max-stack:before:z-10 max-stack:before:h-[40%] max-stack:before:bg-linear-to-t max-stack:before:from-page/90 max-stack:before:to-transparent max-stack:before:content-['']";

const fadeIn =
  "opacity-0 animate-fade-in motion-reduce:[animation-duration:400ms] motion-reduce:[animation-delay:0ms]";

/**
 * The hero's two visual layers and the order they appear in. The headline
 * forms first. Then, on screens wide enough for it, the live 3D scene starts;
 * phones show a still of the robot instead, so nothing competes for the CPU.
 */
export function HeroStage({ lines, scene, poster }: Props) {
  const [headlineSettled, setHeadlineSettled] = useState(false);
  const [wantsLiveScene, setWantsLiveScene] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(liveSceneQuery());
    const update = () => setWantsLiveScene(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeadlineSettled(true), SCENE_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <ParticleHeadline
        lines={lines}
        onSettled={() => setHeadlineSettled(true)}
        className="absolute inset-0 z-10 block h-full w-full"
      />
      <div
        aria-hidden="true"
        className={`absolute max-stack:inset-x-0 max-stack:top-[46%] max-stack:bottom-14 max-stack:z-0 stack:inset-y-0 stack:right-0 stack:z-20 stack:w-1/2 ${fades}`}
      >
        <Image
          src={poster}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover object-top stack:hidden ${fadeIn} [animation-delay:500ms]`}
        />
        {wantsLiveScene && headlineSettled && (
          <SplineScene src={scene} className={`${fadeIn} [animation-duration:1400ms]`} />
        )}
      </div>
    </>
  );
}
