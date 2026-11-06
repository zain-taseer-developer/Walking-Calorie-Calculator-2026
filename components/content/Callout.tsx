import React from "react";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

interface CalloutProps {
  type?: "info" | "tip" | "warning";
  title?: string;
  titleLevel?: 3 | 5;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, titleLevel = 5, children }: CalloutProps) {
  const configs = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-900 dark:text-blue-200",
      textColor: "text-blue-800 dark:text-blue-300",
      Icon: Info,
      defaultTitle: "Note",
    },
    tip: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      titleColor: "text-emerald-900 dark:text-emerald-200",
      textColor: "text-emerald-800 dark:text-emerald-300",
      Icon: Lightbulb,
      defaultTitle: "Pro Tip",
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
      iconColor: "text-amber-600 dark:text-amber-400",
      titleColor: "text-amber-900 dark:text-amber-200",
      textColor: "text-amber-800 dark:text-amber-300",
      Icon: AlertTriangle,
      defaultTitle: "Caution",
    },
  }[type];

  const { bg, iconColor, titleColor, textColor, Icon, defaultTitle } = configs;
  const TitleHeading = titleLevel === 3 ? "h3" : "h5";

  return (
    <div className={`not-prose my-6 p-4 sm:p-5 rounded-2xl border ${bg} flex items-start gap-3.5`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
      <div className="space-y-1 text-sm leading-relaxed">
        <TitleHeading className={`font-bold ${titleColor}`}>{title || defaultTitle}</TitleHeading>
        <div className={textColor}>{children}</div>
      </div>
    </div>
  );
}

