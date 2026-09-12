import { heroContent } from "@/content/hero";
import { HeroCopy } from "./hero-copy";
import { ParticleHeadline } from "./particle-headline";
import { SplineScene } from "./spline-scene";

// The scene fades in after the headline has started to form. Under reduced motion it is a short plain fade.
const sceneFade =
  "opacity-0 animate-fade-in [animation-duration:1400ms] [animation-delay:500ms] motion-reduce:[animation-duration:400ms] motion-reduce:[animation-delay:0ms]";

/**
 * Full-viewport opener. Positions its parts; each part is its own component.
 * The gutter is set as padding so the particle engine can read it as a number.
 */
export function Hero() {
  return (
    <section id="top" className="relative h-screen overflow-hidden px-(--gutter)">
      <h1 className="sr-only">{heroContent.headline}</h1>
      <ParticleHeadline
        lines={heroContent.headlineLines}
        className="absolute inset-0 z-0 block h-full w-full bg-page"
      />
      <SplineScene
        src={heroContent.scene.src}
        className={`absolute inset-y-0 right-0 z-10 w-1/2 max-stack:top-auto max-stack:h-[42%] max-stack:w-full ${sceneFade}`}
      />
      <HeroCopy />
    </section>
  );
}
