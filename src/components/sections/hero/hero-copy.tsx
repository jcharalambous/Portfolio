import { ButtonLink } from "@/components/ui/button";
import { heroContent } from "@/content/hero";
import { siteConfig } from "@/lib/site";

const edge = "clamp(28px,7vh,72px)";

// Each block fades in on load, in sequence. Under reduced motion it is a short plain fade.
const fadeIn = "opacity-0 animate-fade-in motion-reduce:[animation-duration:400ms] motion-reduce:[animation-delay:0ms]";
const riseIn = "opacity-0 animate-rise-in motion-reduce:animate-fade-in motion-reduce:[animation-duration:400ms] motion-reduce:[animation-delay:0ms]";

/** Kicker, the Vending Sense line with its buttons, and the social links, laid over the scene. */
export function HeroCopy() {
  const { kicker, supporting, primaryCta, secondaryCta } = heroContent;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
      <p
        className={`absolute left-(--gutter) text-lede leading-[1.19] font-semibold text-ink-muted ${fadeIn} [animation-delay:300ms]`}
        style={{ top: edge }}
      >
        {kicker}
      </p>

      <div
        className={`absolute left-(--gutter) max-w-[480px] max-stack:top-[58%] max-stack:bottom-auto max-stack:max-w-[calc(100%-44px)] ${riseIn} [animation-delay:1500ms]`}
        style={{ bottom: edge }}
      >
        <p className="mb-7 text-lede text-ink-muted max-stack:text-[17px]">
          {supporting.before}
          <strong className="font-semibold text-ink">{supporting.company}</strong>
          {supporting.after}
        </p>
        <div className="flex flex-wrap items-center gap-7">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <a
            href={secondaryCta.href}
            className="inline-flex items-center gap-1 text-[17px] leading-[1.2] tracking-[-0.02em] text-link after:-translate-y-px after:text-xl after:leading-none after:content-['›'] hover:underline"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <ul
        className={`absolute right-(--gutter) flex gap-6 text-sm tracking-[-0.01em] max-stack:hidden ${fadeIn} [animation-delay:1800ms]`}
        style={{ bottom: edge }}
      >
        {siteConfig.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            Email
          </a>
        </li>
      </ul>
    </div>
  );
}
