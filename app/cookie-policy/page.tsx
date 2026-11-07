import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Cookie, Shield, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Cookie Policy | How We Use Cookies & Local Storage",
  description:
    "Learn about how WalkingCalorieCalculator.net uses browser cookies, essential local storage, and advertising beacons, and how to manage your preferences.",
  canonicalPath: "/cookie-policy",
});

export default function CookiePolicyPage() {
  const lastUpdated = "November 4, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

      <div className="my-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Cookie className="w-3.5 h-3.5" />
          <span>Storage &amp; Cookies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last Updated: <strong>{lastUpdated}</strong>
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-6">
        <p>
          This Cookie Policy explains what cookies and local storage tokens are, how <strong>{siteConfig.SITE_NAME}</strong> uses them, and how you can control your preferences when browsing our website and using our fitness calculators.
        </p>

        <h2>1. What Are Cookies and Local Storage?</h2>
        <p>
          Cookies are small text files stored on your computer or mobile device when you load a webpage. <strong>Local Storage</strong> is a similar modern web technology that stores data directly within your web browser with no expiration date until manually cleared or overwritten.
        </p>

        <h2>2. Categories of Cookies We Use</h2>
        <div className="space-y-4 not-prose my-6">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              1. Strictly Necessary (Essential) Storage
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              These items are required for the website to function properly. They remember your preferred unit system (Imperial vs. Metric), dark/light theme, and cookie consent banner dismissal. Without these, your preferences would reset on every page refresh.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              2. Performance &amp; Analytics Cookies
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              We use Google Analytics 4 cookies with IP anonymization to gather anonymous metrics about which calculators are most popular, bounce rates, and load performance. This data is strictly aggregated and cannot identify you personally.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              3. Advertising &amp; Targeting Cookies (Google AdSense)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Third-party vendors, including Google AdSense, use cookies (such as the DoubleClick DART cookie) to serve ads based on your prior visits to our site or other websites. These cookies allow ad partners to serve relevant advertisements and measure ad performance.
            </p>
          </div>
        </div>

        <h2>3. Managing &amp; Disabling Cookies</h2>
        <p>
          You have full control over cookie storage. You can configure your browser to block or alert you about cookies, or clear existing cookies through your browser settings:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Third-party cookies</li>
          <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies</li>
          <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
          <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions</li>
        </ul>

        <p>
          To opt out of personalized ad targeting specifically, visit{" "}
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
            Google Ad Settings
          </a>{" "}
          or the{" "}
          <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
            Digital Advertising Alliance consumer choice portal
          </a>.
        </p>

        <p>
          For more details on how we protect your personal privacy, please read our full{" "}
          <Link href="/privacy-policy" className="text-brand-600 underline font-medium">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
}
