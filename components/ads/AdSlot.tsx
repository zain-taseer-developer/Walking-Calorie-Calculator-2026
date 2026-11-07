"use client";

import React from "react";
import { siteConfig } from "@/site.config";

export interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "vertical" | "in-article";
  className?: string;
  label?: string;
}

export function AdSlot({
  slotId = "default-slot",
  format = "horizontal",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const isAdsenseEnabled = Boolean(siteConfig.ADSENSE_CLIENT_ID);

  if (!isAdsenseEnabled) {
    return null;
  }

  // Reserved fixed heights to prevent any Cumulative Layout Shift (CLS)
  const heightClasses = {
    horizontal: "min-h-[100px] sm:min-h-[120px] max-h-[120px]",
    rectangle: "min-h-[280px] max-h-[300px]",
    vertical: "min-h-[600px] max-h-[620px]",
    "in-article": "min-h-[250px] max-h-[280px]",
  }[format];

  return (
    <div
      className={`my-6 w-full flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-2 text-center transition-colors ${heightClasses} ${className}`}
      aria-label={label}
    >
      <span className="mb-1 block text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
        {label}
      </span>

      <div className="w-full h-full flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={siteConfig.ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format === "rectangle" ? "rectangle" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
