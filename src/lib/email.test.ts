import { expect, test } from "vitest";
import { emailAddress, mailto } from "./email";

test("the pieces join into the real address", () => {
  expect(emailAddress()).toBe("business@charalambous.network");
  expect(mailto()).toBe("mailto:business@charalambous.network");
});
