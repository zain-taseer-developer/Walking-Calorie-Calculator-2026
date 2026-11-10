import { CalculatorInputs, CalculationResult, UnitSystem } from "./types";

export const HISTORY_STORAGE_KEY = "walking_calc_history";
export const MAX_HISTORY_RECORDS = 28;
export const RETENTION_DAYS = 28;
export const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

export interface SavedCalculation {
  id: string;
  timestamp: string; // ISO string when created
  updatedAt?: string; // ISO string when last updated
  calories: number;
  durationMinutes: number;
  speedMph: number;
  weightLbs: number;
  weightKg: number;
  distanceMiles: number;
  distanceKm: number;
  unitSystem: UnitSystem;
  inputs?: CalculatorInputs; // Full calculator input snapshot
}

/**
 * Automatically removes records older than 28 days.
 * Resilient to legacy timestamp formats.
 */
export function removeExpiredRecords(
  records: SavedCalculation[],
  nowMs: number = Date.now(),
  maxAgeMs: number = RETENTION_MS
): SavedCalculation[] {
  return records.filter((rec) => {
    let time = new Date(rec.timestamp).getTime();
    if (isNaN(time)) {
      const idNum = Number(rec.id);
      if (!isNaN(idNum) && idNum > 1000000000000) {
        time = idNum;
      } else {
        return true;
      }
    }
    return nowMs - time <= maxAgeMs;
  });
}

/**
 * Sorts records in oldest-to-newest order (chronological).
 * Resilient to legacy timestamp formats.
 */
export function sortOldestToNewest(records: SavedCalculation[]): SavedCalculation[] {
  return [...records].sort((a, b) => {
    let timeA = new Date(a.timestamp).getTime();
    if (isNaN(timeA)) {
      const idA = Number(a.id);
      timeA = !isNaN(idA) && idA > 1000000000000 ? idA : 0;
    }
    let timeB = new Date(b.timestamp).getTime();
    if (isNaN(timeB)) {
      const idB = Number(b.id);
      timeB = !isNaN(idB) && idB > 1000000000000 ? idB : 0;
    }
    return timeA - timeB;
  });
}

/**
 * Adds a new record to history.
 * Enforces the 28-record limit.
 * Does NOT save if history already contains 28 records.
 */
export function addRecord(
  history: SavedCalculation[],
  newRecord: SavedCalculation,
  maxLimit: number = MAX_HISTORY_RECORDS,
  nowMs: number = Date.now()
): { success: boolean; history: SavedCalculation[]; error?: string } {
  const clean = removeExpiredRecords(history, nowMs);
  if (clean.length >= maxLimit) {
    return {
      success: false,
      history: clean,
      error: `History limit reached (${maxLimit}/${maxLimit} records). Please remove a saved record before adding a new one.`,
    };
  }
  const updated = sortOldestToNewest([...clean, newRecord]);
  return { success: true, history: updated };
}

/**
 * Updates an existing record in place (saving changes to the exact same record).
 */
export function updateRecord(
  history: SavedCalculation[],
  updatedRecord: SavedCalculation
): { success: boolean; history: SavedCalculation[]; error?: string } {
  const index = history.findIndex((r) => r.id === updatedRecord.id);
  if (index === -1) {
    return {
      success: false,
      history,
      error: "Record to update was not found in history.",
    };
  }

  const newHistory = [...history];
  newHistory[index] = {
    ...newHistory[index],
    ...updatedRecord,
    updatedAt: new Date().toISOString(),
  };

  return { success: true, history: sortOldestToNewest(newHistory) };
}

/**
 * Removes an individual record by id.
 */
export function deleteRecord(history: SavedCalculation[], id: string): SavedCalculation[] {
  return history.filter((r) => r.id !== id);
}

/**
 * Safely loads records from localStorage, automatically removing expired ones.
 */
export function loadHistoryFromStorage(): { records: SavedCalculation[]; error?: string } {
  if (typeof window === "undefined") return { records: [] };
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return { records: [] };
    const parsed: SavedCalculation[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { records: [] };
    const valid = removeExpiredRecords(parsed);
    const sorted = sortOldestToNewest(valid);
    if (valid.length !== parsed.length) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sorted));
    }
    return { records: sorted };
  } catch (err: any) {
    return {
      records: [],
      error: "Unable to read history from browser storage. Browser storage may be disabled.",
    };
  }
}

/**
 * Safely saves records to localStorage.
 */
export function saveHistoryToStorage(records: SavedCalculation[]): { success: boolean; error?: string } {
  if (typeof window === "undefined") return { success: false, error: "Window undefined" };
  try {
    const sorted = sortOldestToNewest(records);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sorted));
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: "Unable to save record to browser storage. Your browser storage quota may be exceeded or disabled.",
    };
  }
}

/**
 * Requests protection from automatic browser storage eviction.
 * Returns null when the browser does not support the Storage API.
 */
export async function requestPersistentHistoryStorage(): Promise<boolean | null> {
  if (typeof navigator === "undefined" || !navigator.storage?.persist) return null;
  if (await navigator.storage.persisted()) return true;
  return navigator.storage.persist();
}
