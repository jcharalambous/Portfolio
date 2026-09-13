import { siteConfig } from "./config";

/**
 * Structured data describing me as a person, for search engines. Rendered
 * into the page as JSON-LD. Escaping "<" keeps the JSON safe inside a script tag.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    sameAs: siteConfig.links.map((link) => link.href),
    address: {
      "@type": "PostalAddress",
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
  };
}

export function personSchemaJson(): string {
  return JSON.stringify(personSchema()).replace(/</g, "\\u003c");
}
