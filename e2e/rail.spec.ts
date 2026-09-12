import { expect, test } from "@playwright/test";

const current = 'nav[aria-label="Sections"] a[aria-current="location"]';

test("starts on Intro and follows the scroll", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(current)).toHaveAttribute("href", "#top");

  await page.evaluate(() => {
    const work = document.getElementById("work")!;
    window.scrollTo({ top: work.offsetTop + 10, behavior: "instant" });
  });
  await expect(page.locator(current)).toHaveAttribute("href", "#work");
});

test("a rail link takes you to its section", async ({ page }) => {
  await page.goto("/");
  // Wait for the rail to settle on Intro before clicking, as a reader would.
  await expect(page.locator(current)).toHaveAttribute("href", "#top");
  await page.getByRole("link", { name: "Projects" }).click();
  await expect(page.locator(current)).toHaveAttribute("href", "#projects");
});

test("on a phone the rail is a bar along the bottom", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone layout only");
  await page.goto("/");
  const nav = page.locator('nav[aria-label="Sections"]');
  const box = (await nav.boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(box.y + box.height).toBeCloseTo(viewport.height, 0);
  expect(box.width).toBe(viewport.width);
  await expect(page.getByText("How I got here")).toBeHidden();
});

test("the address follows the reader, and clears at the top", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(current)).toHaveAttribute("href", "#top");

  await page.evaluate(() => {
    const work = document.getElementById("work")!;
    window.scrollTo({ top: work.offsetTop + 10, behavior: "instant" });
  });
  await expect(page).toHaveURL(/#work$/);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page).not.toHaveURL(/#/);

  await page.reload();
  await expect(page.locator(current)).toHaveAttribute("href", "#top");
});

test("a link to a section still lands on it", async ({ page }) => {
  await page.goto("/#projects");
  await expect(page.locator(current)).toHaveAttribute("href", "#projects");
  await expect(page).toHaveURL(/#projects$/);
});
