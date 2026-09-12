import { heroContent } from "@/content/hero";
import { HeroCopy } from "./hero-copy";

/** Full-viewport opener. Positions its parts; each part is its own component. */
export function Hero() {
  return (
    <section id="top" className="relative h-screen overflow-hidden">
      <h1 className="sr-only">{heroContent.headline}</h1>
      <HeroCopy />
    </section>
  );
}
