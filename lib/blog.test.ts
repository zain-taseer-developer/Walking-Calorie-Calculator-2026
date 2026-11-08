import { describe, expect, it } from "vitest";
import { slugifyCategory } from "./blog";

describe("blog category slugs", () => {
  it("creates URL-safe slugs for category names containing ampersands", () => {
    expect(slugifyCategory("Treadmill & Workouts")).toBe("treadmill-and-workouts");
    expect(slugifyCategory("Calories & Nutrition")).toBe("calories-and-nutrition");
  });
});
