import { heroContent } from "@/content/hero";
import { HeroCopy } from "./hero-copy";
import { HeroStage } from "./hero-stage";
import { LightSwitch } from "./light-switch";

/**
 * Full-viewport opener. Positions its parts; each part is its own component.
 * The gutter is set as padding so the particle engine can read it as a number.
 */
export function Hero() {
  return (
    <section id="top" className="relative h-svh min-h-[640px] overflow-hidden px-(--gutter)">
      <h1 className="sr-only">{heroContent.headline}</h1>
      <HeroStage
        lines={heroContent.headlineLines}
        scene={heroContent.scene.src}
        poster={heroContent.scene.poster}
      />
      <HeroCopy />
      <LightSwitch />
    </section>
  );
}
