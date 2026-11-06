import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ShieldCheck, Heart, Users, BookOpen, Flame, Award } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "About Us | Editorial Mission & Scientific Standards",
  description:
    "Learn about our editorial mission, fitness research methodology, and commitment to transparent, science-backed exercise energy metrics.",
  canonicalPath: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <div className="my-6 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency &amp; Scientific Accuracy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About {siteConfig.SITE_NAME}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          We believe that exercise energy metrics should be transparent, accessible, and grounded in peer-reviewed exercise physiology—never exaggerated or obscured behind paywalls.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-6">
        <h2>Our Founding Mission</h2>
        <p>
          In a fitness landscape saturated with fitness gadgets that wildly overestimate active caloric burn and generic online calculators that rely on outdated rules of thumb, we created <strong>{siteConfig.SITE_NAME}</strong> to give walkers an objective, scientifically accurate source of truth.
        </p>

        <p>
          Whether your goal is managing cardiovascular health, recovering from injury, preparing for a charity walk, or achieving sustainable fat loss through a modest caloric deficit, walking is humanity&apos;s most natural, accessible, and sustainable movement pattern. Our mission is to provide you with the most reliable digital tools and guides to support your walking journey.
        </p>

        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="p-2 w-fit rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Peer-Reviewed Math</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Every formula is derived from published medical literature, primarily the 2011 Compendium of Physical Activities and ACSM guidelines.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="p-2 w-fit rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">No Miracle Claims</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              We never promise rapid &quot;magic&quot; fat loss. We respect human physiology, metabolic adaptation, and healthy lifestyle sustainability.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="p-2 w-fit rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Zero Dark Patterns</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              No mandatory signups, no intrusive popups, and zero personal data stored on our servers. Your calculations belong to you.
            </p>
          </div>
        </div>

        <h2>Editorial Leadership &amp; Authorship</h2>
        <p>
          Our guides and algorithms are developed and maintained by the <strong>{siteConfig.AUTHOR_NAME}</strong>. We synthesize publications from the American College of Sports Medicine (ACSM), the Centers for Disease Control and Prevention (CDC), the National Institutes of Health (NIH), and leading biomechanics laboratories worldwide.
        </p>

        <p>
          We do not employ artificial persona &quot;doctors&quot; or fake testimonials. All calculations are completely open-source in their mathematical formulation, and our full methodologies are publicly disclosed in our{" "}
          <Link href="/editorial-policy-and-methodology" className="text-brand-600 underline font-medium">
            Editorial Policy &amp; Methodology
          </Link>.
        </p>

        <h2>Contacting Our Team</h2>
        <p>
          Have questions, identified an edge case in our calculator, or want to suggest a new feature? We welcome feedback from exercise physiologists, personal trainers, and everyday walkers alike. Please reach out via our{" "}
          <Link href="/contact" className="text-brand-600 underline font-medium">
            Contact Page
          </Link>{" "}
          or directly via email at <code className="text-brand-600">{siteConfig.CONTACT_EMAIL}</code>.
        </p>
      </div>
    </div>
  );
}

