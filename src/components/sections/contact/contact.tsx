import { Reveal } from "@/components/ui/reveal";
import { contactContent } from "@/content/contact";
import { SectionShell } from "../section-shell";
import { CopyEmailButton } from "./copy-email-button";
import { EmailButton } from "./email-button";
import { Glow } from "./glow";
import { LinkButton } from "./link-button";
import { SiteFooter } from "./site-footer";

/*
 * The second line is an outline until the pointer reaches the email button, which
 * fills it in. A stroked copy sits under a copy filled in the page colour: the fill
 * hides the stroke's inner half and the seams where the font's contours overlap,
 * which a plain text-stroke would show. Filling in is that top copy changing colour.
 */
const stroked = "text-transparent [-webkit-text-stroke:3px_rgba(255,255,255,0.55)]";
const filled =
  "text-page transition-colors duration-[320ms] ease-strong [section:has([data-arm]:hover)_&]:text-ink";

/** The finale: a display headline, the address as a button, the links, and where I stand. */
export function Contact() {
  const { headline, intro, openingLabel, copyLabel, copiedLabel, links } = contactContent;

  return (
    <SectionShell
      id="contact"
      align="start"
      size="display"
      intro={intro}
      heading={
        <>
          <Reveal as="span" className="block">
            {headline.lead}
          </Reveal>
          <Reveal as="span" delay={60} className="block">
            <span className="grid [&>span]:[grid-area:1/1]">
              <span aria-hidden="true" className={stroked}>
                {headline.outline}
              </span>
              <span className={filled}>{headline.outline}</span>
            </span>
          </Reveal>
        </>
      }
    >
      <Glow />
      <div className="flex flex-wrap items-center gap-3.5">
        <Reveal delay={120}>
          <EmailButton openingLabel={openingLabel} />
        </Reveal>
        <Reveal delay={180}>
          <CopyEmailButton label={copyLabel} copiedLabel={copiedLabel} />
        </Reveal>
        {links.map((link, index) => (
          <Reveal key={link.href} delay={index === 0 ? 240 : 300}>
            <LinkButton link={link} />
          </Reveal>
        ))}
      </div>
      <SiteFooter />
    </SectionShell>
  );
}
