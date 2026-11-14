import { describe, expect, it } from "vitest";
import { getAllCategories, getPostBySlug, slugifyCategory } from "./blog";

describe("blog category slugs", () => {
  it("creates URL-safe slugs for category names containing ampersands", () => {
    expect(slugifyCategory("Treadmill & Workouts")).toBe("treadmill-and-workouts");
    expect(slugifyCategory("Calories & Nutrition")).toBe("calories-and-nutrition");
  });

  it("lists the HomeWalk blog article under Walking Basics", () => {
    const homewalk = getPostBySlug("homewalk");
    const walkingBasics = getAllCategories().find((category) => category.name === "Walking Basics");

    expect(homewalk?.frontmatter.category).toBe("Walking Basics");
    expect(walkingBasics?.count).toBe(1);
  });
});
