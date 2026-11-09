import { Metadata } from "next";
import { siteConfig } from "@/site.config";

export interface GenerateSeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noindex?: boolean;
  absoluteTitle?: boolean;
}

export function constructMetadata({
  title,
  description,
  canonicalPath = "",
  ogType = "website",
  publishedTime,
  modifiedTime,
  keywords,
  noindex = false,
  absoluteTitle = false,
}: GenerateSeoProps): Metadata {
  const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `${siteConfig.CANONICAL_URL}${cleanPath === "/" ? "" : cleanPath}`;
  const fullTitle = absoluteTitle || title.includes(siteConfig.SITE_NAME)
    ? title
    : `${title} | ${siteConfig.SITE_NAME}`;

  return {
    title: { absolute: fullTitle },
    description: description.slice(0, 160),
    metadataBase: new URL(siteConfig.CANONICAL_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    keywords: keywords || [
      "walking calorie calculator",
      "calories burned walking",
      "steps to calories",
      "how many calories does walking burn",
      "step calorie calculator",
    ],
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.SITE_NAME,
      locale: "en_US",
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      images: [
        {
          url: `${siteConfig.CANONICAL_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${siteConfig.CANONICAL_URL}/og-image.png`],
    },
  };
}

export function generateWebApplicationSchema({
  name,
  url,
  description,
  operatingSystem = "All",
  applicationCategory = "HealthApplication",
}: {
  name: string;
  url: string;
  description: string;
  operatingSystem?: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${siteConfig.CANONICAL_URL}${url}`,
    description,
    operatingSystem,
    applicationCategory,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires JavaScript. Requires HTML5.",
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.CANONICAL_URL}${item.path}`,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  authorName = siteConfig.AUTHOR_NAME,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteConfig.CANONICAL_URL}${url}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.CANONICAL_URL}${url}`,
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${siteConfig.CANONICAL_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.SITE_NAME,
      url: siteConfig.CANONICAL_URL,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.CANONICAL_URL}/logo.png`,
      },
    },
  };
}
