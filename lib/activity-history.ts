export const ACTIVITY_HISTORY_STORAGE_KEY = "activity_calorie_history";
export const ACTIVITY_HISTORY_RETENTION_MS = 28 * 24 * 60 * 60 * 1000;

export interface SavedActivityCalculation {
  id: string;
  timestamp: string;
  activityId: string;
  weightKg: number;
  durationMinutes: number;
  calories: number;
  unit: "imperial" | "metric";
}

export function isSavedActivityCalculation(value: unknown): value is SavedActivityCalculation {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    typeof record.timestamp === "string" &&
    !Number.isNaN(Date.parse(record.timestamp)) &&
    typeof record.activityId === "string" &&
    typeof record.weightKg === "number" &&
    Number.isFinite(record.weightKg) &&
    typeof record.durationMinutes === "number" &&
    Number.isFinite(record.durationMinutes) &&
    typeof record.calories === "number" &&
    Number.isFinite(record.calories) &&
    (record.unit === "imperial" || record.unit === "metric")
  );
}

export function removeExpiredActivityCalculations(
  records: SavedActivityCalculation[],
  nowMs: number = Date.now(),
): SavedActivityCalculation[] {
  return records.filter(
    (record) => nowMs - new Date(record.timestamp).getTime() <= ACTIVITY_HISTORY_RETENTION_MS,
  );
}
