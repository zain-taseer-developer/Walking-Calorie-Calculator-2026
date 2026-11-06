"use client";

import React from "react";
import { Printer } from "lucide-react";

export function PrintButton({ label = "Print / Save as PDF Chart" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-md hover:bg-slate-800 transition-colors"
    >
      <Printer className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

