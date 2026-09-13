import { expect, test } from "@playwright/test";

test("the pendant switches the page to light, remembers it across a reload, and back", async ({
  page,
  isMobile,
}) => {
  test.skip(!!isMobile, "the switch and the live robot are desktop only");
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: "Turn the lights on" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(245, 245, 247)");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");

  await page.getByRole("button", { name: "Turn the lights off" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
});
