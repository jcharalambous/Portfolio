import { heroContent } from "@/content/hero";
import { HeroCopy } from "./hero-copy";
import { ParticleHeadline } from "./particle-headline";

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
      <HeroCopy />
    </section>
  );
}
