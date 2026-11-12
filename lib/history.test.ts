import { afterEach, describe, it, expect, vi } from "vitest";
import {
  removeExpiredRecords,
  sortOldestToNewest,
  addRecord,
  updateRecord,
  deleteRecord,
  loadHistoryFromStorage,
  saveHistoryToStorage,
  SavedCalculation,
  HISTORY_STORAGE_KEY,
  MAX_HISTORY_RECORDS,
  RETENTION_MS,
} from "./history";

describe("History Management and Retention", () => {
  const baseTime = 1762358400000; // Fixed timestamp reference

  const sampleRecord = (id: string, ageDays: number, calories = 300): SavedCalculation => {
    const timestamp = new Date(baseTime - ageDays * 24 * 60 * 60 * 1000).toISOString();
    return {
      id,
      timestamp,
      calories,
      durationMinutes: 30,
      speedMph: 3.5,
      weightLbs: 154,
      weightKg: 70,
      distanceMiles: 1.75,
      distanceKm: 2.8,
      unitSystem: "imperial",
      inputs: {
        unitSystem: "imperial",
        mode: "time-speed",
        weightLbs: 154,
        weightKg: 70,
        heightFt: 5,
        heightIn: 9,
        heightCm: 175,
        durationHours: 0,
        durationMinutes: 30,
        speedMph: 3.5,
        speedKmh: 5.6,
        distanceMiles: 1.75,
        distanceKm: 2.8,
        steps: 4000,
        inclinePercent: 0,
        terrain: "pavement",
        backpackWeightLbs: 0,
        backpackWeightKg: 0,
        showNetCalories: false,
      },
    };
  };

  const recentRecord = (id: string, ageDays = 0): SavedCalculation =>
    ({
      ...sampleRecord(id, 0, 300),
      timestamp: new Date(Date.now() - ageDays * 24 * 60 * 60 * 1000).toISOString(),
    });

  const setupStorage = (initialValue?: string) => {
    const values = new Map<string, string>();
    if (initialValue !== undefined) values.set(HISTORY_STORAGE_KEY, initialValue);
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    });
    return values;
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("automatically removes records older than 28 days", () => {
    const records: SavedCalculation[] = [
      sampleRecord("rec-recent", 1), // 1 day old (kept)
      sampleRecord("rec-limit", 28), // 28 days old (kept)
      sampleRecord("rec-expired-1", 29), // 29 days old (removed)
      sampleRecord("rec-expired-2", 45), // 45 days old (removed)
    ];

    const retained = removeExpiredRecords(records, baseTime, RETENTION_MS);
    expect(retained.length).toBe(2);
    expect(retained.map((r) => r.id)).toEqual(["rec-recent", "rec-limit"]);
  });

  it("handles legacy timestamp formats gracefully without dropping them prematurely", () => {
    const legacyRecord: SavedCalculation = {
      id: "1762300000000",
      timestamp: "02:30 PM", // Legacy non-ISO time string
      calories: 250,
      durationMinutes: 30,
      speedMph: 3.0,
      weightLbs: 150,
      weightKg: 68,
      distanceMiles: 1.5,
      distanceKm: 2.4,
      unitSystem: "imperial",
    };

    const retained = removeExpiredRecords([legacyRecord], baseTime, RETENTION_MS);
    expect(retained.length).toBe(1);
    expect(retained[0].id).toBe("1762300000000");
  });

  it("maintains oldest-to-newest chronological order", () => {
    const records: SavedCalculation[] = [
      sampleRecord("rec-new", 2),
      sampleRecord("rec-old", 20),
      sampleRecord("rec-mid", 10),
    ];

    const sorted = sortOldestToNewest(records);
    expect(sorted.map((r) => r.id)).toEqual(["rec-old", "rec-mid", "rec-new"]);
  });

  it("enforces the strict 28-record limit", () => {
    let history: SavedCalculation[] = [];

    // Add exactly 28 records
    for (let i = 1; i <= MAX_HISTORY_RECORDS; i++) {
      const rec = sampleRecord(`rec-${i}`, 28 - i);
      const res = addRecord(history, rec, MAX_HISTORY_RECORDS, baseTime);
      expect(res.success).toBe(true);
      history = res.history;
    }

    expect(history.length).toBe(28);

    // Attempting to add the 29th record must fail
    const overflowRecord = sampleRecord("rec-29", 0);
    const overflowRes = addRecord(history, overflowRecord, MAX_HISTORY_RECORDS, baseTime);
    expect(overflowRes.success).toBe(false);
    expect(overflowRes.error).toContain("History limit reached (28/28 records)");
    expect(overflowRes.history.length).toBe(28);
  });

  it("updates a loaded record in place without creating a new record", () => {
    const initialRecords: SavedCalculation[] = [
      recentRecord("rec-1", 10),
      recentRecord("rec-2", 5),
      recentRecord("rec-3", 1),
    ];

    const updatedRec2: SavedCalculation = {
      ...initialRecords[1],
      calories: 350,
      durationMinutes: 45,
      speedMph: 4.0,
    };

    const res = updateRecord(initialRecords, updatedRec2);
    expect(res.success).toBe(true);
    expect(res.history.length).toBe(3); // Total count unchanged

    const target = res.history.find((r) => r.id === "rec-2");
    expect(target).toBeDefined();
    expect(target?.calories).toBe(350);
    expect(target?.durationMinutes).toBe(45);
    expect(target?.speedMph).toBe(4.0);
    expect(target?.updatedAt).toBeDefined();
  });

  it("removes an individual record by id", () => {
    const initialRecords: SavedCalculation[] = [
      recentRecord("rec-1", 10),
      recentRecord("rec-2", 5),
      recentRecord("rec-3", 1),
    ];

    const remaining = deleteRecord(initialRecords, "rec-2");
    expect(remaining.length).toBe(2);
    expect(remaining.map((r) => r.id)).toEqual(["rec-1", "rec-3"]);
  });

  it("preserves full input snapshots and handles legacy records without snapshots", () => {
    const fullSnapshotRecord = sampleRecord("rec-full", 2);
    expect(fullSnapshotRecord.inputs).toBeDefined();
    expect(fullSnapshotRecord.inputs?.inclinePercent).toBe(0);

    const legacyRecord: SavedCalculation = {
      id: "rec-legacy",
      timestamp: new Date().toISOString(),
      calories: 220,
      durationMinutes: 30,
      speedMph: 3.5,
      weightLbs: 154,
      weightKg: 70,
      distanceMiles: 1.75,
      distanceKm: 2.8,
      unitSystem: "imperial",
      // inputs omitted
    };

    expect(legacyRecord.inputs).toBeUndefined();
    expect(legacyRecord.calories).toBe(220);
  });

  it("restores saved localStorage records after a fresh load and appends new records", () => {
    const storage = setupStorage();
    const first = recentRecord("first");
    const second = recentRecord("second");

    expect(saveHistoryToStorage([first]).success).toBe(true);
    const restored = loadHistoryFromStorage();
    expect(restored.records).toHaveLength(1);
    expect(restored.records[0].id).toBe(first.id);

    const added = addRecord(restored.records, second);
    expect(added.success).toBe(true);
    expect(saveHistoryToStorage(added.history).success).toBe(true);

    const afterReload = loadHistoryFromStorage();
    expect(afterReload.records.map(({ id }) => id)).toEqual(["first", "second"]);
    expect(JSON.parse(storage.get(HISTORY_STORAGE_KEY) || "[]")).toHaveLength(2);
  });

  it("cleans expired and malformed entries during load and write", () => {
    const expired = recentRecord("expired", 29);
    const invalid = { ...recentRecord("invalid"), calories: "not-a-number" };
    const valid = recentRecord("valid");
    setupStorage(JSON.stringify([expired, invalid, valid]));

    const loaded = loadHistoryFromStorage();
    expect(loaded.records.map(({ id }) => id)).toEqual(["valid"]);

    expect(saveHistoryToStorage([expired, valid]).success).toBe(true);
    expect(loadHistoryFromStorage().records.map(({ id }) => id)).toEqual(["valid"]);
  });

  it("clears corrupted localStorage JSON safely", () => {
    const storage = setupStorage("{not valid json");

    const loaded = loadHistoryFromStorage();

    expect(loaded.records).toEqual([]);
    expect(loaded.error).toContain("Corrupted");
    expect(storage.has(HISTORY_STORAGE_KEY)).toBe(false);
  });

  it("persists clearing all history", () => {
    setupStorage(JSON.stringify([recentRecord("saved")]));

    expect(saveHistoryToStorage([]).success).toBe(true);
    expect(loadHistoryFromStorage().records).toEqual([]);
  });
});

