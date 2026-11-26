"use client";

import { BrandMealCalculator } from "@/components/calculator/BrandMealCalculator";
import { subwayMenu } from "@/data/brands/subway";

export function SubwayCalorieCalculator() {
  return <BrandMealCalculator menu={subwayMenu} />;
}
