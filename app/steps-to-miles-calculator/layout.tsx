import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Steps to Miles Calculator – Convert Steps to Miles & KM",
  },
  description:
    "Convert steps to miles & km instantly. Free calculator adjusts for your height and stride. Includes charts for 1,000 to 30,000 steps.",
};

export default function StepsToMilesLayout({ children }: { children: ReactNode }) {
  return children;
}
