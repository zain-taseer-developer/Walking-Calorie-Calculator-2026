import type { Metadata } from "next";
import type { ReactNode } from "react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Walking Pace Calculator – Speed, Pace & Split Times",
  description:
    "Calculate your walking pace in min/mile or min/km instantly. Enter distance and time to get your speed, pace, and splits. 100% free.",
  canonicalPath: "/walking-pace-calculator",
  absoluteTitle: true,
});

export default function WalkingPaceCalculatorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
