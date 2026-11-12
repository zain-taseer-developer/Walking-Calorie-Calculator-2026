import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Calories vs kcal: What's the Difference?",
  description:
    "Learn how food Calories, kilocalories, small calories, and kilojoules compare, with a quick energy unit converter.",
  canonicalPath: "/calories-vs-kcal",
  absoluteTitle: true,
});

export default function CaloriesVsKcalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
