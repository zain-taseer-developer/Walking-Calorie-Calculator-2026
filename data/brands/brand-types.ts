/**
 * Shared brand menu types. Any brand (Subway, McDonald's, Starbucks, ...)
 * creates a data file exporting a BrandMenu and a blog article embeds
 * <BrandMealCalculator menu={...} />.
 */
export interface BrandMenuItem {
  /** Display name, as printed on the official nutrition chart. */
  name: string;
  /** Human-readable serving description shown in the picker and breakdown. */
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
  fiber: number;
  /** true when the row is a placeholder awaiting official data. */
  isPlaceholder?: boolean;
}

export interface BrandMenuCategory {
  id: string;
  label: string;
  items: BrandMenuItem[];
}

export interface BrandMenu {
  brand: string;
  /** Shown on the page, e.g. "US menu". */
  market: string;
  /** "Last updated" line driven by the data file, e.g. "October 2026". */
  lastUpdated: string;
  disclaimer: string;
  categories: BrandMenuCategory[];
}
