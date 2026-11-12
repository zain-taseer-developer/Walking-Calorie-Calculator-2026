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
  return records.flatMap((rec) => {
    let time = new Date(rec.timestamp).getTime();
    if (isNaN(time)) {
      const idNum = Number(rec.id);
      if (!isNaN(idNum) && idNum > 1000000000000) {
        time = idNum;
      } else {
        return [];
      }
    }
    if (nowMs - time > maxAgeMs) return [];
    if (new Date(rec.timestamp).getTime() === time) return [rec];
    return [{ ...rec, timestamp: new Date(time).toISOString() }];
  });
}

function isCalculatorInputs(value: unknown): value is CalculatorInputs {
  if (!value || typeof value !== "object") return false;
  const inputs = value as Record<string, unknown>;
  const numericFields = [
    "weightKg", "weightLbs", "heightCm", "heightFt", "heightIn",
    "durationHours", "durationMinutes", "speedMph", "speedKmh",
    "distanceMiles", "distanceKm", "steps", "inclinePercent",
    "backpackWeightKg", "backpackWeightLbs",
  ];

  return (
    (inputs.unitSystem === "imperial" || inputs.unitSystem === "metric") &&
    (inputs.mode === "time-speed" ||
      inputs.mode === "distance-time" ||
      inputs.mode === "steps" ||
      inputs.mode === "treadmill") &&
    (inputs.terrain === "pavement" ||
      inputs.terrain === "grass" ||
      inputs.terrain === "trail" ||
      inputs.terrain === "sand") &&
    inputs.showNetCalories !== undefined &&
    typeof inputs.showNetCalories === "boolean" &&
    numericFields.every((field) => typeof inputs[field] === "number" && Number.isFinite(inputs[field])) &&
    (inputs.customStrideLengthM === undefined ||
      (typeof inputs.customStrideLengthM === "number" && Number.isFinite(inputs.customStrideLengthM))) &&
    (inputs.age === undefined || (typeof inputs.age === "number" && Number.isFinite(inputs.age))) &&
    (inputs.sex === undefined ||
      inputs.sex === "male" ||
      inputs.sex === "female" ||
      inputs.sex === "unspecified")
  );
}

function normalizeSavedCalculation(value: unknown): SavedCalculation | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const id = typeof record.id === "string" || typeof record.id === "number"
    ? String(record.id)
    : "";
  let timestamp = typeof record.timestamp === "string" ? record.timestamp : "";

  if (Number.isNaN(new Date(timestamp).getTime())) {
    const idTimestamp = Number(id);
    if (!Number.isFinite(idTimestamp) || idTimestamp <= 1_000_000_000_000) return null;
    timestamp = new Date(idTimestamp).toISOString();
  }

  const numericFields = [
    "calories", "durationMinutes", "speedMph", "weightLbs",
    "weightKg", "distanceMiles", "distanceKm",
  ];
  if (
    !id ||
    (record.unitSystem !== "imperial" && record.unitSystem !== "metric") ||
    !numericFields.every((field) => typeof record[field] === "number" && Number.isFinite(record[field]))
  ) {
    return null;
  }

  return {
    id,
    timestamp,
    calories: record.calories as number,
    durationMinutes: record.durationMinutes as number,
    speedMph: record.speedMph as number,
    weightLbs: record.weightLbs as number,
    weightKg: record.weightKg as number,
    distanceMiles: record.distanceMiles as number,
    distanceKm: record.distanceKm as number,
    unitSystem: record.unitSystem,
    ...(typeof record.updatedAt === "string" && !Number.isNaN(new Date(record.updatedAt).getTime())
      ? { updatedAt: record.updatedAt }
      : {}),
    ...(isCalculatorInputs(record.inputs) ? { inputs: record.inputs } : {}),
  };
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
  const cleanHistory = removeExpiredRecords(history);
  const index = cleanHistory.findIndex((r) => r.id === updatedRecord.id);
  if (index === -1) {
    return {
      success: false,
      history: cleanHistory,
      error: "Record to update was not found in history.",
    };
  }

  const newHistory = [...cleanHistory];
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
  return removeExpiredRecords(history).filter((r) => r.id !== id);
}

/**
 * Safely loads records from localStorage, automatically removing expired ones.
 */
export function loadHistoryFromStorage(): { records: SavedCalculation[]; error?: string } {
  if (typeof window === "undefined") return { records: [] };
  let raw: string | null;
  try {
    raw = localStorage.getItem(HISTORY_STORAGE_KEY);
  } catch {
    return {
      records: [],
      error: "Unable to read history from browser storage. Browser storage may be disabled.",
    };
  }

  if (!raw) return { records: [] };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      return {
        records: [],
        error: "Saved history is corrupted and could not be cleared from browser storage.",
      };
    }
    return { records: [], error: "Corrupted saved history was cleared from browser storage." };
  }

  if (!Array.isArray(parsed)) {
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      return {
        records: [],
        error: "Saved history is invalid and could not be cleared from browser storage.",
      };
    }
    return { records: [], error: "Invalid saved history was cleared from browser storage." };
  }

  const normalized = parsed
    .map(normalizeSavedCalculation)
    .filter((record): record is SavedCalculation => record !== null);
  const sorted = sortOldestToNewest(removeExpiredRecords(normalized));
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sorted));
    return { records: sorted };
  } catch {
    return {
      records: sorted,
      error: "Saved history loaded, but browser storage could not be updated.",
    };
  }
}

/**
 * Safely saves records to localStorage.
 */
export function saveHistoryToStorage(records: SavedCalculation[]): { success: boolean; error?: string } {
  if (typeof window === "undefined") return { success: false, error: "Window undefined" };
  try {
    const sorted = sortOldestToNewest(removeExpiredRecords(records));
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sorted));
    return { success: true };
  } catch {
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
