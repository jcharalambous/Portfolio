// Resolution order: explicit NEXT_PUBLIC_SITE_URL, then the production domain
// Vercel injects at build time, then localhost for local dev. An empty variable
// counts as unset, so a blank value in a hosting dashboard cannot break the build.
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

// Single source of truth for site-wide values used by the layout, metadata,
// robots and sitemap. Fill these in before deploying.
export const siteConfig = {
  name: "John Charalambous",
  tagline: "I build things for the web.",
  description: "Personal portfolio and projects of John Charalambous.",
  // Shown on the contact page. Replace with the address you want public.
  email: "hello@example.com",
  url: resolveSiteUrl(),
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  links: [{ label: "GitHub", href: "https://github.com/jcharalambous" }],
};
