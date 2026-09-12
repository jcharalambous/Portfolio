import { contactContent } from "@/content/contact";
import { siteConfig } from "@/lib/site";

/** The copyright line and the credit for the hero's robot model. */
export function SiteFooter() {
  const { credit } = contactContent;

  return (
    <footer className="mt-auto flex flex-wrap justify-between gap-2 border-t border-white/[0.08] pt-5 text-xs text-ink-muted">
      <span>© {new Date().getFullYear()} {siteConfig.name}</span>
      <span>
        Robot by{" "}
        <a
          href={credit.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-[3px] transition-colors hover:text-ink"
        >
          {credit.author}
        </a>{" "}
        on Spline, {credit.licence}
      </span>
    </footer>
  );
}
