import { describe, expect, it } from "vitest";
import {
  ACTIVITY_HISTORY_RETENTION_MS,
  isSavedActivityCalculation,
  removeExpiredActivityCalculations,
  SavedActivityCalculation,
} from "./activity-history";

describe("Activity calculation history", () => {
  const now = 1_800_000_000_000;
  const record = (id: string, ageDays: number): SavedActivityCalculation => ({
    id,
    timestamp: new Date(now - ageDays * 24 * 60 * 60 * 1000).toISOString(),
    activityId: "walking_brisk",
    weightKg: 70,
    durationMinutes: 30,
    calories: 151,
    unit: "metric",
  });

  it("keeps records through day 28 and removes older records", () => {
    const retained = removeExpiredActivityCalculations(
      [record("recent", 1), record("day-28", 28), record("expired", 29)],
      now,
    );

    expect(retained.map(({ id }) => id)).toEqual(["recent", "day-28"]);
    expect(ACTIVITY_HISTORY_RETENTION_MS).toBe(28 * 24 * 60 * 60 * 1000);
  });

  it("rejects malformed saved records", () => {
    expect(isSavedActivityCalculation(record("valid", 0))).toBe(true);
    expect(isSavedActivityCalculation({ ...record("invalid", 0), calories: "151" })).toBe(false);
  });
});
