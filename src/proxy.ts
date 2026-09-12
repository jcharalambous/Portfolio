import { NextResponse, type NextRequest } from "next/server";

/*
 * Runs before every page. Mints a one-time nonce, hands it to Next.js through
 * the request so it stamps its own scripts and styles, and sends the Content
 * Security Policy with the response. The other security headers are in
 * next.config.ts.
 */

/** Where the Spline viewer's "Built with Spline" badge fetches its icon from. */
const SPLINE_BADGE_HOST = "https://app.spline.design";

/**
 * The two <style> blocks the vendored Spline viewer (1.9.82) injects for its
 * badge and hints, allowed by content hash so nothing else inline gets through.
 * If the viewer is updated these change; the browser tests will say so.
 */
const SPLINE_VIEWER_STYLE_HASHES = [
  "'sha256-Z32ccy7QPW25v8ZP9N0ADkG7eUPd0OcScukf0wQvV60='",
  "'sha256-BuK84zxUyg+v+8yY7TdPzxLxgnG6GGIrv7TtJ40YnbE='",
].join(" ");

function contentSecurityPolicy(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    // Only scripts carrying this request's nonce run; what they load is trusted in turn.
    // `wasm-unsafe-eval` lets the 3D viewer run its WebAssembly. Dev needs eval for React's error tooling.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""}`,
    // Next.js's development overlay injects its own inline styles and a data: video, so dev relaxes those two.
    isDev
      ? "style-src 'self' 'unsafe-inline'"
      : `style-src 'self' 'nonce-${nonce}' ${SPLINE_VIEWER_STYLE_HASHES}`,
    // Style attributes cannot run code. next/image and the 3D viewer set them.
    "style-src-attr 'unsafe-inline'",
    `img-src 'self' blob: data: ${SPLINE_BADGE_HOST}`,
    "font-src 'self'",
    // Dev hot reload uses a websocket.
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    // The 3D viewer spins up workers from blobs.
    "worker-src 'self' blob:",
    isDev ? "media-src 'self' data:" : "media-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = contentSecurityPolicy(nonce, process.env.NODE_ENV === "development");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Pages only. Static files, images, the self-hosted viewer and prefetches carry no scripts to guard.
      source:
        "/((?!_next/static|_next/image|spline/|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
