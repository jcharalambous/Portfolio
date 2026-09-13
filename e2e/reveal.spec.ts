import { expect, test, type Page } from "@playwright/test";

const scrollTo = (page: Page, id: string) =>
  page.evaluate((id) => {
    window.scrollTo({ top: document.getElementById(id)!.offsetTop + 10, behavior: "instant" });
  }, id);

test("content fades in on the way down and back out on the way up", async ({ page }) => {
  await page.goto("/");
  // The wrapper around the first skill group: heading → group → wrapper.
  const group = page.locator("#skills h3").first().locator("..").locator("..");
  await expect(group).toHaveCSS("opacity", "0");
  await scrollTo(page, "skills");
  await expect(group).toHaveCSS("opacity", "1");
  await scrollTo(page, "top");
  await expect(group).toHaveCSS("opacity", "0");
});

test("the terminal clears on the way back up and types again on return", async ({ page }) => {
  await page.goto("/");
  const lines = page.locator("#about .font-mono p");
  await expect(lines).toHaveCount(1);
  await scrollTo(page, "about");
  await expect.poll(() => lines.count()).toBeGreaterThan(1);
  await scrollTo(page, "top");
  await expect(lines).toHaveCount(1);
  await scrollTo(page, "about");
  await expect.poll(() => lines.count()).toBeGreaterThan(1);
});

test("the terminal keeps its lines while any of it is still on screen", async ({ page }) => {
  await page.goto("/");
  const lines = page.locator("#about .font-mono p");
  await expect(lines).toHaveCount(1); // Hydrated and laid out.
  await scrollTo(page, "about");
  await expect.poll(() => lines.count()).toBeGreaterThan(3);
  // Read on until only the bottom of the terminal shows, as a reader finishing it would.
  await page.evaluate(() => {
    const box = document.querySelector("#about .font-mono")!.getBoundingClientRect();
    window.scrollBy({ top: box.top + box.height * 0.8, behavior: "instant" });
  });
  await page.waitForTimeout(600);
  await expect.poll(() => lines.count()).toBeGreaterThan(3);
});
