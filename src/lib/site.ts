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

// Who the site is about. Section copy lives in src/content/.
export const siteConfig = {
  name: "John Charalambous",
  role: "Software Engineer",
  description:
    "Software engineer. I build things for the web, and the infrastructure that keeps them running.",
  email: "business@charalambous.network",
  url: resolveSiteUrl(),
  links: [
    { label: "GitHub", href: "https://github.com/jcharalambous" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/john-charalambous-16a7ab2b3",
    },
  ],
};
