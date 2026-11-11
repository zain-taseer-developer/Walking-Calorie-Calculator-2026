import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.CANONICAL_URL),
  title: {
    default: "Walking Calorie Calculator: Calories Burned Walking by Weight, Speed & Steps",
    template: `%s | ${siteConfig.SITE_NAME}`,
  },
  description:
    "Calculate exact calories burned walking based on body weight, walking speed, duration, incline, and pedometer steps using the 2011 Compendium of Physical Activities.",
  keywords: [
    "walking calorie calculator",
    "calories burned walking",
    "steps to calories",
    "how many calories does walking burn",
    "step calorie calculator",
    "how many calories does 20000 steps burn",
    "how many calories can i burn walking for an hour",
    "how many calories does walking 10000 steps burn",
  ],
  authors: [{ name: siteConfig.AUTHOR_NAME }],
  creator: siteConfig.SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.CANONICAL_URL,
    title: "Walking Calorie Calculator: Calories Burned Walking by Weight & Steps",
    description:
      "Accurate science-backed walking calorie calculator with linear MET interpolation, treadmill incline equations, and stride models.",
    siteName: siteConfig.SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Walking Calorie Calculator: Calories Burned Walking",
    description:
      "Calculate your walking calorie burn instantly by weight, speed, distance, or steps.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Dark Mode script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />

        {/* Global Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.SITE_NAME,
              url: siteConfig.CANONICAL_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteConfig.CANONICAL_URL}/blog?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Google Analytics 4 (only activated when GA4_ID is populated) */}
        {siteConfig.GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.GA4_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}

        {/* Google AdSense Script (only injected when real Client ID is populated) */}
        {siteConfig.ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-brand-500 selection:text-white flex flex-col justify-between">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
