import { ButtonLink } from "@/components/ui/button";
import { EmailLink } from "@/components/ui/email-link";
import { contactContent } from "@/content/contact";
import { siteConfig } from "@/lib/site";
import { SectionShell } from "../section-shell";
import { CopyEmailButton } from "./copy-email-button";
import { SiteFooter } from "./site-footer";

export function Contact() {
  const { heading, intro, copyLabel, copiedLabel } = contactContent;

  return (
    <SectionShell id="contact" heading={heading} intro={intro} align="start">
      <div className="mt-2 mb-16">
        <EmailLink
          className="relative inline-block min-h-[1.2em] pb-1.5 text-[clamp(18px,1.8vw,24px)] font-semibold tracking-[-0.02em] [overflow-wrap:anywhere] text-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-link after:transition-transform after:duration-500 after:ease-strong after:content-[''] hover:after:scale-x-100 motion-reduce:after:transition-none"
        />
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CopyEmailButton label={copyLabel} copiedLabel={copiedLabel} />
          {siteConfig.links.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              variant="ghost"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} ↗
            </ButtonLink>
          ))}
        </div>
      </div>
      <SiteFooter />
    </SectionShell>
  );
}
