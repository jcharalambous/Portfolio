import { expect, test, type Page } from "@playwright/test";

/** Styles applied and the sections at full height, so the track has real widths to snap to. */
const laidOut = (page: Page) =>
  page.waitForFunction(() => document.documentElement.scrollHeight > window.innerHeight * 3);

const middle = "#journey li[data-active]";

test("the arrows move the lessons through the middle, and the middle one is bigger", async ({
  page,
}) => {
  await page.goto("/#journey");
  await laidOut(page);
  await expect(page.locator(middle).getByRole("heading")).toHaveText("Nobody designs for failure");
  await expect(page.getByRole("button", { name: "Previous lesson" })).toBeDisabled();

  const side = page.locator("#journey li").nth(1);
  const before = (await side.boundingBox())!;
  await page.getByRole("button", { name: "Next lesson" }).click();
  await expect(page.locator(middle).getByRole("heading")).toHaveText("I hated its opinions");
  await expect.poll(async () => (await side.boundingBox())!.width).toBeGreaterThan(before.width);

  await page.getByRole("button", { name: "Previous lesson" }).click();
  await expect(page.locator(middle).getByRole("heading")).toHaveText("Nobody designs for failure");
});

test("the middle card opens its story in a window, and Escape closes it", async ({ page }) => {
  await page.goto("/#journey");
  await laidOut(page);
  const dialog = page.locator("#journey dialog");
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: "Read the story: Nobody designs for failure" }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { level: 3 })).toHaveText("Nobody designs for failure");
  await expect(
    dialog.getByText("Build for the people who actually exist", { exact: false }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("a side card comes to the middle first, then opens", async ({ page }) => {
  await page.goto("/#journey");
  await laidOut(page);
  const dialog = page.locator("#journey dialog");
  // Press the sliver of the second card showing at the edge, without scrolling it into view first.
  const side = page.locator("#journey li").nth(1);
  const box = (await side.boundingBox())!;
  await page.mouse.click(box.x + 10, box.y + box.height / 2);
  await expect(dialog).toBeHidden();
  await expect(page.locator(middle).getByRole("heading")).toHaveText("I hated its opinions");

  await page.getByRole("button", { name: "Read the story: I hated its opinions" }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { level: 3 })).toHaveText("I hated its opinions");
});
