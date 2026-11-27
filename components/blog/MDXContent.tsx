import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MiniCalculator } from "@/components/calculator/MiniCalculator";
import { Callout } from "@/components/content/Callout";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { DataTable } from "@/components/content/DataTable";
import { AdSlot } from "@/components/ads/AdSlot";
import { RelatedTools } from "@/components/content/RelatedTools";
import { HomeWalkTracker } from "@/components/calculator/HomeWalkTracker";
import { SubwayCalorieCalculator } from "@/components/calculator/SubwayCalorieCalculator";
import { BrandMenuTable } from "@/components/content/BrandMenuTable";

export function MDXContent({ content }: { content: string }) {
  // Normalize line endings and split content by double newlines to process paragraphs and interactive components
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const blocks = normalizedContent.split(/\n\n+/);

  return (
    <div className="max-w-none text-slate-700 dark:text-slate-300">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        // 1. MiniCalculator component
        if (trimmed.startsWith("<MiniCalculator") || trimmed === "<MiniCalculator />") {
          return <MiniCalculator key={index} />;
        }

        // 2. AdSlot component
        if (trimmed.startsWith("<AdSlot") || trimmed === "<AdSlot />") {
          return <AdSlot key={index} format="in-article" />;
        }

        // 3. RelatedTools component
        if (trimmed.startsWith("<RelatedTools") || trimmed === "<RelatedTools />") {
          return <RelatedTools key={index} />;
        }

        if (trimmed === "<HomeWalkTracker />") {
          return <HomeWalkTracker key={index} />;
        }

        if (trimmed === "<SubwayCalorieCalculator />") {
          return <SubwayCalorieCalculator key={index} />;
        }

        if (trimmed === "<BrandMenuTable />") {
          return <BrandMenuTable key={index} />;
        }

        if (trimmed.startsWith("<HomeWalkImagePlaceholder")) {
          return (
            <figure key={index} className="my-8">
              <Image
                src="/homewalk-indoor-walking-guide.jpg"
                alt="HomeWalk indoor walking setup in a bright and comfortable living room."
                title="HomeWalk – Walking at Home"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full rounded-2xl"
              />
              <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                HomeWalk: A simple way to stay active indoors.
              </figcaption>
            </figure>
          );
        }

        // 4. Headings - only take first line for heading text to avoid capturing following content
        if (trimmed.startsWith("### ")) {
          const firstLine = trimmed.split("\n")[0];
          const text = firstLine.replace(/^###\s+/, "");
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const remainingContent = trimmed.slice(firstLine.length).trim();
          return (
            <React.Fragment key={index}>
              <h3 id={id} className="mt-8 mb-3 scroll-mt-24 text-lg font-semibold leading-snug tracking-normal sm:text-xl">
                {text}
              </h3>
              {remainingContent && (
                <p className="leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(remainingContent) }} />
              )}
            </React.Fragment>
          );
        }

// 4. Headings - only take first line for heading text to avoid capturing following content
        if (trimmed.startsWith("## ")) {
          const firstLine = trimmed.split("\n")[0];
          const text = firstLine.replace(/^##\s+/, "");
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const remainingContent = trimmed.slice(firstLine.length).trim();
          return (
            <React.Fragment key={index}>
              <h2 id={id} className="mt-10 mb-4 scroll-mt-24 text-2xl font-bold leading-tight tracking-normal sm:text-3xl">
                {text}
              </h2>
              {remainingContent && (
                <p key={`${index}-rest`} className="leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(remainingContent) }} />
              )}
            </React.Fragment>
          );
        }

        // 5. Blockquote / Callout
        if (trimmed.startsWith("> ")) {
          const quoteText = trimmed.replace(/^>\s*/gm, "");
          return (
            <blockquote key={index} className="my-6 border-l-4 border-brand-500 pl-4 italic text-slate-600 dark:text-slate-300">
              {quoteText}
            </blockquote>
          );
        }

        // 6. Unordered List
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed
            .split(/\n[-*]\s+/)
            .map((i) => i.replace(/^[-*]\s+/, ""))
            .filter(Boolean);
          return (
            <ul key={index} className="my-5 list-outside list-disc space-y-2 pl-6 marker:text-brand-500">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
              ))}
            </ul>
          );
        }

        // 7. Ordered List
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed
            .split(/\n\d+\.\s+/)
            .map((i) => i.replace(/^\d+\.\s+/, ""))
            .filter(Boolean);
          return (
            <ol key={index} className="my-5 list-outside list-decimal space-y-2 pl-6 marker:font-semibold marker:text-brand-600 dark:marker:text-brand-400">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
              ))}
            </ol>
          );
        }

        // 8. Markdown Table
        if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
          const lines = trimmed.split("\n").filter((l) => l.trim().startsWith("|"));
          if (lines.length >= 3) {
            const parseRow = (line: string) =>
              line
                .split("|")
                .map((cell) => cell.trim())
                .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

            const headers = parseRow(lines[0]);
            const rows = lines.slice(2).map(parseRow);
            return <DataTable key={index} headers={headers} rows={rows} />;
          }
        }

        // Default Paragraph
        return (
          <p
            key={index}
            className="my-4 leading-relaxed text-base"
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
          />
        );
      })}
    </div>
  );
}

/**
 * Format bold, italics, code, and links in markdown lines
 */
function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-mono text-xs">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-600 dark:text-brand-400 font-medium underline hover:no-underline">$1</a>');
}

