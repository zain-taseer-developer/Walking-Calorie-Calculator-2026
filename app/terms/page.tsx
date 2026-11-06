import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FileText, Scale } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service | User Agreement",
  description:
    "Terms of service governing the use of WalkingCalorieCalculator.net, interactive calculators, and fitness content.",
  canonicalPath: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "November 4, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <div className="my-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last Updated: <strong>{lastUpdated}</strong>
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-6">
        <p>
          Welcome to <strong>{siteConfig.SITE_NAME}</strong>. By accessing or using our website, interactive calculators, reference tables, and fitness guides, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from using the site.
        </p>

        <h2>1. Permitted Use &amp; Free Access</h2>
        <p>
          {siteConfig.SITE_NAME} provides free online calculation tools for personal, educational, and fitness planning purposes. You may use our calculators, print reference tables for personal use, and share calculation links. You agree not to scrape, reverse-engineer, or attempt to disrupt the operation or delivery of our web services.
        </p>

        <h2>2. Medical &amp; Fitness Advice Disclaimer</h2>
        <p>
          The materials, outputs, and calculations provided on {siteConfig.SITE_NAME} are provided strictly for informational and educational purposes. <strong>They do not constitute medical advice, diagnosis, or treatment.</strong> Before commencing any new exercise program, walking regimen, or caloric deficit plan, consult a licensed physician or healthcare specialist. Read our full{" "}
          <Link href="/medical-disclaimer" className="text-brand-600 underline font-medium">
            Medical Disclaimer
          </Link>.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          The text, custom graphics, calculation algorithms, code, and overall design of {siteConfig.SITE_NAME} are protected by copyright and intellectual property laws. You may not reproduce, republish, or syndicate our written guides or proprietary software code without prior written authorization.
        </p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>
          The site and its contents are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive for extreme mathematical precision based on peer-reviewed physical activity compendiums, we make no representations or warranties regarding the absolute accuracy, completeness, or reliability of any calculation.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, {siteConfig.SITE_NAME}, its operators, authors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or inability to use our tools and information.
        </p>

        <h2>6. Modifications to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms of Service at any time. Continued use of the website following the posting of any updates constitutes acceptance of the revised terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have questions regarding these terms, please contact us at:{" "}
          <code className="text-brand-600">{siteConfig.CONTACT_EMAIL}</code>.
        </p>
      </div>
    </div>
  );
}

