/**
 * Captures the still of the robot that small screens show instead of the live scene.
 *
 *   node scripts/capture-spline-poster.mjs http://localhost:3000
 *
 * Needs the site running with the live scene reachable at a desktop width
 * (the still is framed as a phone sees it, so this forces the phone box).
 */
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const out = "public/spline/nexbot-poster.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
// Force the live scene on at phone size, just for this capture.
await page.addInitScript(() => {
  const real = window.matchMedia.bind(window);
  window.matchMedia = (q) => (q.startsWith("(min-width") ? { ...real(q), matches: true, addEventListener() {}, removeEventListener() {} } : real(q));
});
await page.goto(base);
await page.waitForSelector("spline-viewer canvas", { timeout: 30_000 });
await page.waitForTimeout(6000);
// Hide everything that is not the scene: copy, particles, fades, the viewer's badge.
await page.addStyleTag({ content: "#top > canvas, #top > div:last-child { visibility: hidden !important } #top div::before, #top div::after { display: none !important }" });
await page.evaluate(() => {
  const logo = document.querySelector("spline-viewer")?.shadowRoot?.querySelector("#logo");
  if (logo instanceof HTMLElement) logo.style.display = "none";
});
await page.waitForTimeout(500);
await page.locator("spline-viewer canvas").first().screenshot({ path: out });
await browser.close();
console.log(`Saved ${out}`);
