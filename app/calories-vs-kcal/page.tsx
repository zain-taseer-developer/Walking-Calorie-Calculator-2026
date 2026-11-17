import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import CaloriesVsKcalClient from "./CaloriesVsKcalClient";

const title = "Kcal vs Calories: Meaning, Differences & Free Converter";
const description =
  "Kcal vs calories explained: understand the difference, learn what 1 kcal means, and convert kcal to calories or kJ with our free converter.";

export const metadata: Metadata = constructMetadata({
  title,
  description,
  canonicalPath: "/calories-vs-kcal",
});

export default function CaloriesVsKcalPage() {
  return <CaloriesVsKcalClient />;
}
