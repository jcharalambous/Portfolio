import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to get in touch.",
};

export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        title="Contact"
        description="The best way to reach me is by email."
      />
      <div className="space-y-6 pb-24">
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-2xl font-semibold tracking-tight text-black underline underline-offset-4 dark:text-zinc-50"
        >
          {siteConfig.email}
        </a>
        <ul className="flex flex-wrap gap-4 text-zinc-600 dark:text-zinc-400">
          {siteConfig.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-black dark:hover:text-zinc-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
