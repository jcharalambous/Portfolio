import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145]">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-black dark:text-zinc-50"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-black dark:hover:text-zinc-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
