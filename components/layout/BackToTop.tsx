"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-900/20 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
