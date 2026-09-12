import { act, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { sections } from "@/content/sections";
import { Rail } from "./rail";

const SECTION_HEIGHT = 1000;

/** Give jsdom a layout: sections stacked, each SECTION_HEIGHT tall, scrolled by `scrollY`. */
function layOut(scrollY: number) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
  sections.forEach((section, i) => {
    const el = document.getElementById(section.id)!;
    Object.defineProperty(el, "offsetHeight", { value: SECTION_HEIGHT, configurable: true });
    el.getBoundingClientRect = () =>
      ({ top: i * SECTION_HEIGHT - scrollY, height: SECTION_HEIGHT }) as DOMRect;
  });
}

async function scrollTo(scrollY: number) {
  await act(async () => {
    layOut(scrollY);
    window.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 30));
  });
}

test("the rail follows the section under the middle of the viewport", async () => {
  render(
    <>
      <Rail />
      <main>
        {sections.map((section) => (
          <section key={section.id} id={section.id} />
        ))}
      </main>
    </>,
  );
  const current = () =>
    screen.getAllByRole("link").find((a) => a.getAttribute("aria-current") === "location")
      ?.getAttribute("href");

  await scrollTo(0);
  expect(current()).toBe("#top");

  await scrollTo(2 * SECTION_HEIGHT);
  expect(current()).toBe("#work");

  await scrollTo(6 * SECTION_HEIGHT + 500);
  expect(current()).toBe("#contact");
});
