import { describe, expect, it } from "vitest";
import {
  calculateHomeWalkMetrics,
  createStepDetectorState,
  detectStepFromMagnitude,
  getElapsedSessionSeconds,
  isValidHomeWalkProfile,
  isValidManualHomeWalkInput,
} from "./homewalk";

describe("HomeWalk estimates", () => {
  it("estimates distance from steps and height-derived stride length", () => {
    const result = calculateHomeWalkMetrics({
      weightKg: 70,
      heightCm: 170,
      durationSeconds: 600,
      steps: 1000,
    });

    expect(result.steps).toBe(1000);
    expect(result.distanceMeters).toBeCloseTo(170 * 0.414 * 10, 1);
  });

  it("uses the existing walking calorie engine for gross calories", () => {
    const result = calculateHomeWalkMetrics({
      weightKg: 70,
      heightCm: 170,
      durationSeconds: 1800,
      speedMph: 3.5,
    });

    expect(result.grossCalories).toBe(151);
    expect(result.pacePerMile).toBe("17:09 /mi");
  });

  it("does not report a live pace before the minimum reliable duration and steps", () => {
    const result = calculateHomeWalkMetrics({
      weightKg: 70,
      heightCm: 170,
      durationSeconds: 20,
      steps: 10,
      minimumReliableDurationSeconds: 30,
    });

    expect(result.pacePerMile).toBeNull();
    expect(result.grossCalories).toBeNull();
  });

  it("converts stride-based distance to miles and kilometers consistently", () => {
    const result = calculateHomeWalkMetrics({
      weightKg: 70,
      heightCm: 170,
      customStrideLengthCm: 90,
      durationSeconds: 1200,
      steps: 1000,
    });

    expect(result.distanceMeters).toBe(900);
    expect(result.distanceKm).toBeCloseTo(0.9, 6);
    expect(result.distanceMiles).toBeCloseTo(900 / 1609.344, 6);
  });
});

describe("HomeWalk session timer math", () => {
  it("keeps pause and resume time cumulative without counting the pause", () => {
    const firstRun = getElapsedSessionSeconds(0, 10_000, 70_500);
    const afterResume = getElapsedSessionSeconds(firstRun, 100_000, 145_200);

    expect(firstRun).toBe(60);
    expect(afterResume).toBe(105);
  });
});

describe("HomeWalk input validation", () => {
  it("accepts a valid profile and rejects invalid or empty values", () => {
    expect(isValidHomeWalkProfile(70, 170)).toBe(true);
    expect(isValidHomeWalkProfile(0, 170)).toBe(false);
    expect(isValidHomeWalkProfile(70, 0)).toBe(false);
    expect(isValidHomeWalkProfile(70, 170, 200)).toBe(false);
  });

  it("requires a valid duration and either positive steps or a walking speed", () => {
    const profile = { weightKg: 70, heightCm: 170 };
    expect(isValidManualHomeWalkInput({ ...profile, durationSeconds: 1800 })).toBe(false);
    expect(isValidManualHomeWalkInput({ ...profile, durationSeconds: 0, speedMph: 3 })).toBe(false);
    expect(isValidManualHomeWalkInput({ ...profile, durationSeconds: 1800, steps: 0 })).toBe(false);
    expect(isValidManualHomeWalkInput({ ...profile, durationSeconds: 1800, steps: 5000 })).toBe(true);
    expect(isValidManualHomeWalkInput({ ...profile, durationSeconds: 1800, speedMph: 3 })).toBe(true);
  });
});

describe("HomeWalk motion step detection", () => {
  it("does not count a stationary baseline as steps", () => {
    let state = createStepDetectorState();
    for (const time of [0, 100, 200, 300, 400]) {
      const result = detectStepFromMagnitude(state, 9.81, time);
      state = result.state;
      expect(result.detected).toBe(false);
    }
  });

  it("detects threshold peaks and debounces peaks inside the minimum interval", () => {
    let state = createStepDetectorState();
    let count = 0;
    const samples = [
      [0, 0], [100, 2], [150, 0], [250, 2], [300, 0], [450, 2], [500, 0],
    ];
    for (const [time, magnitude] of samples) {
      const result = detectStepFromMagnitude(state, magnitude, time);
      state = result.state;
      if (result.detected) count += 1;
    }

    expect(count).toBe(2);
  });
});
