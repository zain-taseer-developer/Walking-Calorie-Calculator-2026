"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/site.config";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      {/* Slim 20px Subheader above Main Header */}
      <div className="w-full h-[20px] min-h-[20px] max-h-[20px] border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/90 dark:bg-slate-900/90 text-[11px] leading-[20px] text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <span className="truncate pl-3 font-medium sm:pl-[13px]">
            Your Free Walking &amp; Fitness Calculator – 2026
          </span>
          <nav className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-[11px]" aria-label="Quick links">
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
            <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
            <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Image
              src="/walking-calories-logo.svg"
              alt="Walking Calories — Walking & Fitness Calculator"
              width={260}
              height={65}
              priority
              className="h-auto w-[220px] sm:w-[260px] dark:hidden"
            />
            <Image
              src="/walking-calories-logo-dark.svg"
              alt=""
              aria-hidden="true"
              width={260}
              height={65}
              priority
              className="hidden h-auto w-[220px] sm:w-[260px] dark:block"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-2">
            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Popular Calculators
            </div>
            <div className="grid grid-cols-1 gap-1 mt-1">
              {siteConfig.allTools.slice(1, 5).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  {tool.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
