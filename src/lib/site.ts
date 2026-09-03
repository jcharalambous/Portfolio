// Single source of truth for site-wide values used by the layout, metadata,
// robots and sitemap. Fill these in before deploying.
export const siteConfig = {
  name: "John Charalambous",
  tagline: "I build things for the web.",
  description: "Personal portfolio and projects of John Charalambous.",
  // Shown on the contact page. Replace with the address you want public.
  email: "hello@example.com",
  // Set NEXT_PUBLIC_SITE_URL in production (e.g. https://example.com).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  links: [{ label: "GitHub", href: "https://github.com/jcharalambous" }],
};
