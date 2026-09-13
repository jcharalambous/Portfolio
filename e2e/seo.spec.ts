import { expect, test } from "@playwright/test";

test("the page carries what search engines and link previews need", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("John Charalambous — Software Engineer");
  // The canonical address is absolute and points at the root; locally it is the config's fallback.
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https?:\/\/[^/]+\/?$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  const person = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "",
  );
  expect(person["@type"]).toBe("Person");
  expect(person.name).toBe("John Charalambous");
  expect(person.sameAs).toContain("https://github.com/jcharalambous");
});

test("the icons and manifest are linked and served", async ({ page, request }) => {
  await page.goto("/");
  const links = [
    page.locator('link[rel="icon"][type="image/svg+xml"]'),
    page.locator('link[rel="apple-touch-icon"]'),
    page.locator('link[rel="manifest"]'),
  ];
  for (const link of links) {
    const href = await link.getAttribute("href");
    expect(href, "link present").toBeTruthy();
    expect((await request.get(href!)).status(), href!).toBe(200);
  }
});
