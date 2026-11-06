"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        // Show after a brief delay so page loads cleanly
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be disabled in private mode
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem("cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem("cookie_consent", "declined");
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl transition-all animate-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2 flex-1">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            Cookie & Privacy Preferences
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We use essential local storage to save your calculator preferences (units & calculations) and privacy-focused analytics to improve calculations. Review our{" "}
            <Link
              href="/privacy-policy"
              className="text-brand-600 dark:text-brand-400 underline hover:no-underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/cookie-policy"
              className="text-brand-600 dark:text-brand-400 underline hover:no-underline"
            >
              Cookie Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={acceptCookies}
              type="button"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors focus:ring-2 focus:ring-brand-500"
            >
              Accept All
            </button>
            <button
              onClick={declineCookies}
              type="button"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={declineCookies}
          type="button"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

