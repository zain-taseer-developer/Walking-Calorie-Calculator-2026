import React from "react";
import Link from "next/link";
import { MiniCalculator } from "@/components/calculator/MiniCalculator";
import { Callout } from "@/components/content/Callout";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { DataTable } from "@/components/content/DataTable";
import { AdSlot } from "@/components/ads/AdSlot";
import { RelatedTools } from "@/components/content/RelatedTools";
import { HomeWalkTracker } from "@/components/calculator/HomeWalkTracker";

export function MDXContent({ content }: { content: string }) {
  // Split content by custom tag markers or double newlines to process paragraphs and interactive components
  const blocks = content.split(/\n\n+/);

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 dark:prose-strong:text-white">
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

        if (trimmed.startsWith("<HomeWalkImagePlaceholder")) {
          const caption = trimmed.match(/caption="([^"]+)"/)?.[1] || "Add a relevant image here.";
          return (
            <figure key={index} className="my-8">
              <div className="flex min-h-40 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:min-h-52">
                Image placeholder — add your own image here
              </div>
              <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">{caption}</figcaption>
            </figure>
          );
        }

        // 4. Headings
        if (trimmed.startsWith("### ")) {
          const text = trimmed.replace(/^###\s+/, "");
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <h3 key={index} id={id} className="text-xl font-bold mt-8 mb-3 scroll-mt-24">
              {text}
            </h3>
          );
        }

        if (trimmed.startsWith("## ")) {
          const text = trimmed.replace(/^##\s+/, "");
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <h2 key={index} id={id} className="text-2xl font-extrabold mt-10 mb-4 scroll-mt-24">
              {text}
            </h2>
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
          const items = trimmed.split(/\n[-*]\s+/).filter(Boolean);
          return (
            <ul key={index} className="my-4 space-y-2 list-disc list-inside">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
              ))}
            </ul>
          );
        }

        // 7. Ordered List
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split(/\n\d+\.\s+/).filter(Boolean);
          return (
            <ol key={index} className="my-4 space-y-2 list-decimal list-inside">
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

