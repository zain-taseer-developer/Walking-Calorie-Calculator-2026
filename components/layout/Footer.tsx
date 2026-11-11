import Link from "next/link";
import { siteConfig } from "@/site.config";
import Image from "next/image";
import { ShieldCheck, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <Image
                src="/walking-calories-logo.svg"
                alt="Walking Calories — Walking & Fitness Calculator"
                width={260}
                height={65}
                className="h-auto w-[260px]"
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Science-backed exercise energy metrics powered by the 2011 Compendium of Physical Activities and ACSM metabolic equations. Free and privacy-first.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Evidence-based metabolic algorithms</span>
            </div>
          </div>

          {/* Calculators & Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm tracking-wide mb-3 uppercase">
              Calculators & Tools
            </h3>
            <ul className="space-y-2">
              {siteConfig.allTools.slice(0, 5).map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Reference */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm tracking-wide mb-3 uppercase">
              Scientific References and Research Guides
            </h3>
            <ul className="space-y-2">
              {siteConfig.allTools.slice(5).map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
                >
                  Walking & Fitness Blog &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm tracking-wide mb-3 uppercase">
              Trust & Transparency
            </h3>
            <ul className="space-y-2">
              {siteConfig.trustLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medical & Accuracy Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500 leading-relaxed space-y-3">
          <p>
            <strong className="font-semibold text-slate-700 dark:text-slate-400">Medical & Scientific Disclaimer:</strong>{" "}
            All calorie expenditures, step estimations, and metabolic calculations generated on {siteConfig.SITE_NAME} are intended solely for personal fitness guidance, educational exploration, and informational reference. They do not constitute clinical health evaluations, diagnostic recommendations, or personalized medical counsel. Individual caloric burn rates naturally deviate based on body composition, muscle efficiency, hormonal health, ambient climate, and stride mechanics. Always consult your primary physician or a qualified healthcare specialist before initiating any intensive physical training or weight loss regimen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs">
            <div>
              &copy; {currentYear} {siteConfig.SITE_NAME}. All rights reserved.
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <span>Engineered with accuracy & care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
