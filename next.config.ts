import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't announce the framework in every response.
  poweredByHeader: false,

  // Dev only: let phones on the same network load the dev server's scripts.
  // Update the address if the Mac's network address changes.
  allowedDevOrigins: ["172.16.30.253"],

  // Security headers on every response. The Content Security Policy needs a
  // fresh nonce per request, so that one lives in src/proxy.ts.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Two years of HTTPS only, subdomains included.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          // Superseded by the policy's frame-ancestors, kept for older browsers.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
          // Isolate the page from other origins' windows and resources.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
