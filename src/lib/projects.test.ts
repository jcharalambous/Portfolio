import { expect, test } from "vitest";
import { getAllProjects, getFeaturedProjects, getProject, projects } from "./projects";

test("every project has a unique slug", () => {
  const slugs = projects.map((p) => p.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});

test("getProject finds a project by slug", () => {
  expect(getProject(projects[0].slug)).toBe(projects[0]);
});

test("getProject returns undefined for an unknown slug", () => {
  expect(getProject("does-not-exist")).toBeUndefined();
});

test("getAllProjects sorts newest first", () => {
  const years = getAllProjects().map((p) => p.year);
  expect(years).toEqual([...years].sort((a, b) => b - a));
});

test("getFeaturedProjects respects the limit", () => {
  expect(getFeaturedProjects(1)).toHaveLength(1);
});
