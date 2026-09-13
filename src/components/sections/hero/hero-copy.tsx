import { ButtonLink } from "@/components/ui/button";
import { EmailLink } from "@/components/ui/email-link";
import { heroContent } from "@/content/hero";
import { siteConfig } from "@/lib/site";

// Each block fades in on load, in sequence. Under reduced motion it is a short plain fade.
const fadeIn =
  "opacity-0 animate-fade-in motion-reduce:[animation-duration:400ms] motion-reduce:[animation-delay:0ms]";
const riseIn =
  "opacity-0 animate-rise-in motion-reduce:animate-fade-in motion-reduce:[animation-duration:400ms] motion-reduce:[animation-delay:0ms]";

/** Kicker, the Vending Sense line with its buttons, and the social links, laid over the scene. */
export function HeroCopy() {
  const { kicker, supporting, primaryCta, secondaryCta } = heroContent;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
      <div
        className={`absolute top-[clamp(28px,7vh,72px)] left-(--gutter) ${fadeIn} [animation-delay:300ms]`}
      >
        {/* On small screens the rail has no room for the name, so the hero carries it. */}
        <p className="text-sm font-semibold tracking-tight text-ink stack:hidden">
          {siteConfig.name}
        </p>
        <p className="text-lede leading-[1.19] font-semibold text-ink-muted max-stack:text-body">
          {kicker}
        </p>
      </div>

      <div
        className={`absolute right-(--gutter) left-(--gutter) max-stack:bottom-32 stack:right-auto stack:bottom-[clamp(28px,7vh,72px)] stack:max-w-[480px] ${riseIn} [animation-delay:1500ms]`}
      >
        <p className="mb-7 text-lede text-ink-muted max-stack:text-body">
          {supporting.before}
          <strong className="font-semibold text-ink">{supporting.company}</strong>
          {supporting.after}
        </p>
        <div className="flex flex-wrap items-center gap-7">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <a
            href={secondaryCta.href}
            className="inline-flex items-center gap-1 text-body leading-[1.2] tracking-[-0.02em] text-link transition-opacity duration-100 after:-translate-y-px after:text-xl after:leading-none after:content-['›'] hover:underline active:opacity-60"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <ul
        className={`absolute right-(--gutter) bottom-[clamp(28px,7vh,72px)] flex gap-6 text-sm tracking-[-0.01em] max-stack:hidden ${fadeIn} [animation-delay:1800ms]`}
      >
        {siteConfig.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted transition-[color,opacity] duration-200 hover:text-ink active:opacity-60 active:duration-100"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <EmailLink className="text-ink-muted transition-[color,opacity] duration-200 hover:text-ink active:opacity-60 active:duration-100">
            Email
          </EmailLink>
        </li>
      </ul>
    </div>
  );
}
