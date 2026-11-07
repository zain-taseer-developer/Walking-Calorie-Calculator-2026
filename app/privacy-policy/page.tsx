import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | GDPR, CCPA & Google AdSense Disclosures",
  description:
    "Comprehensive privacy policy for WalkingCalorieCalc. Details our privacy practices, Google AdSense cookies, analytics, and your data rights.",
  canonicalPath: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 4, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="my-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last Updated &amp; Effective Date: <strong>{lastUpdated}</strong>
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-6">
        <p>
          At <strong>{siteConfig.SITE_NAME}</strong> (accessible at <Link href="/">{siteConfig.CANONICAL_URL}</Link>), the privacy and security of our visitors are among our highest priorities. This Privacy Policy document outlines the types of information that are collected, logged, and utilized by {siteConfig.SITE_NAME}, as well as how you can exercise your statutory data privacy rights.
        </p>

        <h2>1. Information We Do NOT Collect</h2>
        <p>
          Our walking calorie calculators, pace tools, and converters run <strong>entirely client-side in your web browser</strong>. When you input your body weight, height, walking duration, incline, or step count, this data is processed locally via client-side JavaScript. <strong>We do not transmit, collect, or store your personal biometric or exercise metrics on any external web server or database.</strong>
        </p>

        <h2>2. Cookies, Local Storage &amp; Web Beacons</h2>
        <p>
          Like most modern web applications, {siteConfig.SITE_NAME} uses standard browser storage mechanisms:
        </p>
        <ul>
          <li><strong>Essential Local Storage:</strong> Used to remember your preferred unit system (Imperial vs. Metric), dark/light theme preference, and your optional recent calculation history. This data resides solely on your physical device and can be cleared at any time via your browser settings.</li>
          <li><strong>Analytical Cookies:</strong> Used to understand how visitors navigate our tools, which pages are most helpful, and how to improve site speed and accessibility.</li>
        </ul>

        <h2>3. Google AdSense &amp; Third-Party Advertising Disclosures</h2>
        <p>
          We partner with third-party advertising networks, primarily <strong>Google AdSense</strong>, to serve advertisements when you visit our website. These companies may use cookies, JavaScript, or web beacons to collect non-personally identifiable information regarding your visits to this and other websites in order to provide personalized advertisements about goods and services of interest to you.
        </p>

        <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 not-prose my-6">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-2">
            Mandatory Google DoubleClick DART Cookie Notice:
          </h4>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Google, as a third-party vendor, uses cookies to serve ads on {siteConfig.SITE_NAME}. Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites across the Internet. Users may opt out of the use of the DART cookie by visiting the{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold"
            >
              Google Ad and Content Network Privacy Policy
            </a>.
          </p>
        </div>

        <h3>How You Can Opt Out of Personalized Advertising</h3>
        <p>
          You have the statutory right to decline or opt out of interest-based, personalized advertising from Google and other participating ad vendors at any time through the following consumer choice portals:
        </p>
        <ul>
          <li>
            <strong>Google Ad Settings:</strong>{" "}
            <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
              https://adssettings.google.com/
            </a>
          </li>
          <li>
            <strong>Network Advertising Initiative (NAI) Opt-Out:</strong>{" "}
            <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
              https://optout.networkadvertising.org/
            </a>
          </li>
          <li>
            <strong>Digital Advertising Alliance (DAA) WebChoices:</strong>{" "}
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
              https://optout.aboutads.info/
            </a>
          </li>
          <li>
            <strong>European Interactive Digital Advertising Alliance (EDAA):</strong>{" "}
            <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">
              https://www.youronlinechoices.com/
            </a>
          </li>
        </ul>

        <h2>4. Google Analytics 4 (GA4)</h2>
        <p>
          We utilize <strong>Google Analytics 4</strong> to measure aggregate visitor metrics, including session duration, approximate geographic region (country/city level), browser type, and page referral sources. GA4 operates with IP anonymization enabled by default, ensuring your complete IP address is never logged or stored. We do not correlate analytical telemetry with any personally identifiable information.
        </p>

        <h2>5. Your Privacy Rights: GDPR (EEA/UK) &amp; CCPA/CPRA (California)</h2>
        <p>
          Depending on your geographic residence, you hold specific statutory legal rights regarding your data:
        </p>
        <ul>
          <li><strong>Right of Access &amp; Portability:</strong> You may request confirmation of what data, if any, is held about you.</li>
          <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request the deletion of any personal information held in our contact archives.</li>
          <li><strong>Right to Opt-Out of Sale / Sharing:</strong> We do not sell or monetize personal information. We do not participate in cross-context behavioral ad sales of personal identity.</li>
          <li><strong>Right to Non-Discrimination:</strong> Exercising your privacy rights will never result in degraded access, fees, or reduced functionality across our calculators.</li>
        </ul>

        <h2>6. Children&apos;s Privacy (COPPA Compliance)</h2>
        <p>
          {siteConfig.SITE_NAME} does not knowingly collect or solicit any personal identifiable information from children under the age of 13. If you believe your child has submitted personal details through our contact form, please contact us immediately, and we will promptly remove such records from our systems.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have questions, feedback, or requests regarding this Privacy Policy or our compliance procedures, please contact our Data Privacy Officer via email at:
        </p>
        <p className="font-mono text-sm font-semibold text-brand-600 dark:text-brand-400">
          {siteConfig.CONTACT_EMAIL}
        </p>
      </div>
    </div>
  );
}
