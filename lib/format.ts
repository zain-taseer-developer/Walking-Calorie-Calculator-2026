import { UnitSystem } from "./types";

/**
 * Format number with comma separators
 */
export function formatNumber(num: number, decimals: number = 0): string {
  if (!isFinite(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Detect user locale from browser navigator, defaulting to Imperial for US/LR/MM, Metric elsewhere
 */
export function detectDefaultUnitSystem(): UnitSystem {
  if (typeof window === "undefined" || !navigator) return "imperial";
  try {
    const locale = navigator.language || (navigator.languages && navigator.languages[0]) || "en-US";
    // US, Liberia, Myanmar conventionally use imperial
    if (locale.includes("-US") || locale.includes("-LR") || locale.includes("-MM") || locale === "en-US") {
      return "imperial";
    }
    return "metric";
  } catch {
    return "imperial";
  }
}

/**
 * Height conversions
 */
export function cmToFtIn(cm: number): { ft: number; inch: number } {
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inch = Math.round(totalInches % 12);
  return { ft, inch: inch === 12 ? 0 : inch };
}

export function ftInToCm(ft: number, inch: number): number {
  return Math.round((ft * 12 + inch) * 2.54);
}

/**
 * Weight conversions
 */
export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462262 * 10) / 10;
}

export function lbsToKg(lbs: number): number {
  return Math.round(lbs * 0.45359237 * 10) / 10;
}

/**
 * Distance conversions
 */
export function milesToKm(miles: number): number {
  return Math.round(miles * 1.609344 * 100) / 100;
}

export function kmToMiles(km: number): number {
  return Math.round(km * 0.62137119 * 100) / 100;
}

