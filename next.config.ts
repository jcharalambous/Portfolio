import type { NextConfig } from "next";

/*
 * Security headers sent with every response, as the Next.js docs lay them out.
 * The Content Security Policy is the exception: it needs a fresh nonce per
 * request, so it lives in src/proxy.ts.
 */
const securityHeaders = [
  // Two years of HTTPS only, subdomains included.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Superseded by the policy's frame-ancestors, kept for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Dev only: let phones on the same network load the dev server's scripts.
  // Update the address if the Mac's network address changes.
  allowedDevOrigins: ["172.16.30.253"],
  headers() {
    return Promise.resolve([{ source: "/:path*", headers: securityHeaders }]);
  },
};

export default nextConfig;
