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

// Who the site is about. Used by metadata, robots and the sitemap.
export const siteConfig = {
  name: "John Charalambous",
  description:
    "Software engineer. I build things for the web, and the infrastructure that keeps them running.",
  url: resolveSiteUrl(),
};
