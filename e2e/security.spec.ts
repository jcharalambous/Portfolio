import { expect, test } from "@playwright/test";

test("every page is served with the security headers", async ({ page }) => {
  const response = await page.goto("/");
  const headers = response!.headers();
  expect(headers["content-security-policy"]).toMatch(
    /script-src 'self' 'nonce-[^']+' 'strict-dynamic'/,
  );
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
  expect(headers["cross-origin-embedder-policy"]).toBe("credentialless");
  expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("each visit gets its own nonce, and the page's scripts carry it", async ({ page }) => {
  const first = (await page.goto("/"))!.headers()["content-security-policy"];
  const second = (await page.goto("/"))!.headers()["content-security-policy"];
  const nonce = (csp: string) => csp.match(/'nonce-([^']+)'/)![1];
  expect(nonce(first)).not.toBe(nonce(second));
  const stamped = await page.evaluate(
    (n) =>
      [...document.scripts].every((s) => !s.src || s.nonce === n || s.getAttribute("nonce") === n),
    nonce(second),
  );
  expect(stamped).toBe(true);
});

test("the policy blocks nothing the site needs", async ({ page, isMobile }) => {
  const violations: string[] = [];
  // Blocked evals surface as page errors, not console messages. A missing WebGL context
  // is the test browser's limitation, not the policy's doing.
  page.on("pageerror", (error) => {
    if (!/WebGL/.test(error.message)) violations.push(error.message);
  });
  page.on("console", (message) => {
    if (/Content Security Policy|Refused to|ERR_BLOCKED|Cross-Origin/.test(message.text()))
      violations.push(message.text());
  });
  await page.goto("/");
  const current = page.locator('nav[aria-label="Sections"] a[aria-current="location"]');
  await expect(current).toHaveAttribute("href", "#top");
  if (!isMobile) {
    // The self-hosted 3D viewer loaded, read the scene (which evals code) and drew it.
    // If the policy blocked any of that, the error lands in `violations` below.
    const drawn = await page
      .waitForFunction(
        () => {
          const canvas = document
            .querySelector("spline-viewer")
            ?.shadowRoot?.querySelector("canvas");
          return !!canvas && canvas.width > 300;
        },
        null,
        { timeout: 25_000 },
      )
      .then(() => true)
      .catch(() => false);
    expect(violations, violations.join("\n")).toEqual([]);
    expect(drawn, "the 3D scene never drew").toBe(true);
  }
  // JavaScript ran: the rail follows a scroll.
  await page.evaluate(() =>
    window.scrollTo({ top: document.getElementById("work")!.offsetTop + 10, behavior: "instant" }),
  );
  await expect(current).toHaveAttribute("href", "#work");
  await page.waitForTimeout(1500);
  expect(violations, violations.join("\n")).toEqual([]);
});
