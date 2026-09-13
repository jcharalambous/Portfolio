import type { Metadata } from "next";
import { connection } from "next/server";
import { Rail } from "@/components/nav/rail";
import { siteConfig } from "@/lib/site/config";
import { personSchemaJson } from "@/lib/site/person";
import "@/styles/globals.css";

const title = `${siteConfig.name} — ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Render per request: the Content Security Policy nonce differs every time.
  await connection();
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* Structured data is not code, so it needs no nonce and a plain script tag is right. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personSchemaJson() }}
        />
        <Rail />
        {children}
      </body>
    </html>
  );
}
