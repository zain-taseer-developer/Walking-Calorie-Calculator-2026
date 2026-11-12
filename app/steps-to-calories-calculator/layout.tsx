import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Steps to Calories Calculator: Calories Burned by Steps",
  description:
    "Estimate calories burned from your steps using your weight, height, and walking pace with this free steps-to-calories calculator.",
  canonicalPath: "/steps-to-calories-calculator",
  absoluteTitle: true,
});

export default function StepsToCaloriesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
