import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description:
    "Contact the WalkingCalorieCalc.com team with questions, feedback, corrections, partnership inquiries, or feature requests.",
  canonicalPath: "/contact",
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
