import { expect, test } from "vitest";
import { siteConfig } from "./config";
import { personSchema, personSchemaJson } from "./person";

test("describes me with name, role, address and the same profiles the page links to", () => {
  const person = personSchema();
  expect(person["@type"]).toBe("Person");
  expect(person.name).toBe(siteConfig.name);
  expect(person.jobTitle).toBe(siteConfig.role);
  expect(person.url).toBe(siteConfig.url);
  expect(person.sameAs).toEqual(siteConfig.links.map((link) => link.href));
  expect(person.address.addressRegion).toBe("Hertfordshire");
});

test("serialises without a raw < that could close the script tag", () => {
  expect(personSchemaJson()).not.toContain("<");
  expect(JSON.parse(personSchemaJson()).name).toBe(siteConfig.name);
});
