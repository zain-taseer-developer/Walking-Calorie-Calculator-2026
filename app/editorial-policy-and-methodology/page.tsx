import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookOpen, CheckCircle, ShieldCheck, Database, Award, ExternalLink } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Editorial Policy & Scientific Methodology",
  description:
    "Explore how our walking calorie algorithms work: 2011 Compendium MET interpolation, ACSM incline equations, review standards, and update policy.",
  canonicalPath: "/editorial-policy-and-methodology",
});

export default function EditorialMethodologyPage() {
  const lastUpdated = "November 4, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Editorial Policy & Methodology" }]} />

      <div className="my-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Scientific Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Editorial Policy &amp; Scientific Methodology
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last Updated: <strong>{lastUpdated}</strong> &bull; Written by {siteConfig.AUTHOR_NAME}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-6">
        <p>
          At <strong>{siteConfig.SITE_NAME}</strong>, we are committed to providing the most scientifically accurate, evidence-based, and mathematically transparent fitness calculators and guides on the internet. This document outlines our mathematical foundations, literature sources, and editorial review standards.
        </p>

        <h2>1. The Primary Metabolic Model: 2011 Compendium of Physical Activities</h2>
        <p>
          Our baseline energy expenditure equations for level ground walking are rooted in the landmark work of Dr. Barbara E. Ainsworth and colleagues, published in <em>Medicine &amp; Science in Sports &amp; Exercise</em>. The Compendium provides standardized Metabolic Equivalent of Task (MET) codes determined by laboratory indirect calorimetry:
        </p>

        <div className="overflow-x-auto not-prose my-6">
          <table className="w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-900 font-semibold text-slate-800 dark:text-slate-200">
              <tr>
                <th className="p-3 text-left">Activity Code</th>
                <th className="p-3 text-left">Walking Speed</th>
                <th className="p-3 text-left">MET Value</th>
                <th className="p-3 text-left">Clinical Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-mono">17151</td>
                <td className="p-3">2.0 mph (3.2 km/h)</td>
                <td className="p-3 font-bold text-brand-600">2.8 MET</td>
                <td className="p-3">Slow walk, level, firm surface</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">17152</td>
                <td className="p-3">2.5 mph (4.0 km/h)</td>
                <td className="p-3 font-bold text-brand-600">3.0 MET</td>
                <td className="p-3">Casual stroll, level ground</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">17170</td>
                <td className="p-3">3.0 mph (4.8 km/h)</td>
                <td className="p-3 font-bold text-brand-600">3.5 MET</td>
                <td className="p-3">Moderate everyday walking pace</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">17190</td>
                <td className="p-3">3.5 mph (5.6 km/h)</td>
                <td className="p-3 font-bold text-brand-600">4.3 MET</td>
                <td className="p-3">Brisk, purposeful aerobic pace</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">17200</td>
                <td className="p-3">4.0 mph (6.4 km/h)</td>
                <td className="p-3 font-bold text-brand-600">5.0 MET</td>
                <td className="p-3">Very brisk, active arm drive</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">17220</td>
                <td className="p-3">4.5 mph (7.2 km/h)</td>
                <td className="p-3 font-bold text-brand-600">7.0 MET</td>
                <td className="p-3">Power walking, intense stride</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">17230</td>
                <td className="p-3">5.0 mph (8.0 km/h)</td>
                <td className="p-3 font-bold text-brand-600">8.3 MET</td>
                <td className="p-3">Competitive race walking</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Piecewise Linear MET Interpolation</h3>
        <p>
          Unlike competitors that snap your calculation to the nearest integer speed or rely on coarse approximations, our engine implements <strong>continuous piecewise linear interpolation</strong>. If you enter 3.25 mph, our algorithm interpolates precisely between 3.0 mph (3.5 MET) and 3.5 mph (4.3 MET), yielding an exact calculated MET of 3.90.
        </p>

        <h2>2. Incline &amp; Treadmill Equation: ACSM Metabolic Formula</h2>
        <p>
          When you walk on an incline or treadmill grade, energy expenditure increases dramatically due to vertical work against gravity. For speeds between 1.9 mph and 3.7 mph, we implement the official metabolic formula established by the <strong>American College of Sports Medicine (ACSM)</strong>:
        </p>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300">
          VO2 (ml/kg/min) = 0.1 × S + 1.8 × S × G + 3.5<br />
          kcal/min = (VO2 × Weight_kg ÷ 1000) × 5
        </div>

        <p>
          Where <em>S</em> represents speed in meters per minute (speed_mph × 26.8224) and <em>G</em> represents vertical grade in decimal form (e.g., 5% grade = 0.05). If your speed exceeds 3.7 mph on an incline, our engine provides a calibrated elevation adjustment note.
        </p>

        <h2>3. Stride Length &amp; Step Modeling</h2>
        <p>
          To convert steps into distance and calories, we employ standard anthropometric proportionality. For walking, step length averages approximately <strong>41.4% of standing height</strong> (Height_cm × 0.414). Our tools also provide a manual stride override so users who know their personal stride can calibrate to the millimeter.
        </p>

        <h2>4. Fact-Checking, Citations &amp; Regular Review Policy</h2>
        <ul>
          <li><strong>Real Medical Sources Only:</strong> We cite peer-reviewed clinical literature (PubMed IDs), guidelines from the Centers for Disease Control and Prevention (CDC), and position stands from the American College of Sports Medicine (ACSM).</li>
          <li><strong>No Manufactured Statistics or Testimonials:</strong> We do not publish fake doctor personas, artificial testimonials, or fabricated user reviews.</li>
          <li><strong>Regular Algorithm Audits:</strong> Our unit test suite runs continuous automated regression checks on every deployment to ensure zero algorithmic drift.</li>
        </ul>

        <h2>5. Errata &amp; Correction Submissions</h2>
        <p>
          If you are an exercise physiologist, biomechanist, or researcher and identify any discrepancy in our formulas, please email us directly at <code className="text-brand-600">{siteConfig.CONTACT_EMAIL}</code>. We review and verify all technical feedback within 5 business days.
        </p>
      </div>
    </div>
  );
}

