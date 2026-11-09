"use client";

import React, { useState } from "react";
import { Share2, Link as LinkIcon, Check, Twitter, Facebook } from "lucide-react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : `https://walkingcaloriecalc.com/blog/${slug}`;

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const shareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="not-prose flex items-center gap-2 py-3 border-y border-slate-200 dark:border-slate-800 text-xs">
      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
        title="Copy article link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-brand-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>

      <button
        type="button"
        onClick={shareTwitter}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
        title="Share on X"
      >
        <Twitter className="w-3.5 h-3.5" />
        <span>X / Twitter</span>
      </button>

      <button
        type="button"
        onClick={shareFacebook}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="w-3.5 h-3.5" />
        <span>Facebook</span>
      </button>
    </div>
  );
}

