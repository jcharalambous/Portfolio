import { heroContent } from "@/content/hero";
import { HeroCopy } from "./hero-copy";
import { ParticleHeadline } from "./particle-headline";
import { SplineScene } from "./spline-scene";

// The scene fades in after the headline has started to form. Under reduced motion it is a short plain fade.
const sceneFade =
  "opacity-0 animate-fade-in [animation-duration:1400ms] [animation-delay:500ms] motion-reduce:[animation-duration:400ms] motion-reduce:[animation-delay:0ms]";

/**
 * Full-viewport opener. Positions its parts; each part is its own component.
 * Desktop: scene on the right, above the particles. Phone: scene behind everything,
 * particles and copy over it. The gutter is set as padding so the particle
 * engine can read it as a number.
 */
export function Hero() {
  return (
    <section id="top" className="relative h-svh overflow-hidden px-(--gutter)">
      <h1 className="sr-only">{heroContent.headline}</h1>
      <ParticleHeadline
        lines={heroContent.headlineLines}
        className="absolute inset-0 z-10 block h-full w-full"
      />
      <SplineScene
        src={heroContent.scene.src}
        className={`absolute stack:inset-y-0 stack:right-0 stack:z-20 stack:w-1/2 max-stack:inset-x-0 max-stack:top-[46%] max-stack:bottom-14 max-stack:z-0 ${sceneFade}`}
      />
      <HeroCopy />
    </section>
  );
}
