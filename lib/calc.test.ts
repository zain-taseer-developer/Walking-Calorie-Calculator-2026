import { describe, it, expect } from "vitest";
import {
  calculateWalkingCalories,
  getWalkingMet,
  formatPace,
  estimateStrideLength,
  MET_TABLE,
} from "./calc";
import { CalculatorInputs } from "./types";

describe("Walking Calorie Calculator Core Logic", () => {
  it("sanity check: 70 kg, 3.5 mph, 1 hour gives exactly ~301 kcal", () => {
    const inputs: CalculatorInputs = {
      unitSystem: "metric",
      mode: "time-speed",
      weightKg: 70,
      weightLbs: 154.3,
      heightCm: 175,
      heightFt: 5,
      heightIn: 9,
      durationHours: 1,
      durationMinutes: 0,
      speedMph: 3.5,
      speedKmh: 5.63,
      distanceMiles: 3.5,
      distanceKm: 5.63,
      steps: 7000,
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightKg: 0,
      backpackWeightLbs: 0,
      showNetCalories: false,
    };

    const result = calculateWalkingCalories(inputs);
    // 4.3 MET * 70 kg * 1 hr = 301.0 kcal
    expect(result.grossCalories).toBe(301);
    expect(result.met).toBe(4.3);
  });

  it("calculates net calories correctly (MET - 1) * weight * hours", () => {
    const inputs: CalculatorInputs = {
      unitSystem: "metric",
      mode: "time-speed",
      weightKg: 70,
      weightLbs: 154.3,
      heightCm: 175,
      heightFt: 5,
      heightIn: 9,
      durationHours: 1,
      durationMinutes: 0,
      speedMph: 3.5,
      speedKmh: 5.63,
      distanceMiles: 3.5,
      distanceKm: 5.63,
      steps: 7000,
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightKg: 0,
      backpackWeightLbs: 0,
      showNetCalories: true,
    };

    const result = calculateWalkingCalories(inputs);
    // (4.3 - 1.0) * 70 * 1 = 231 kcal
    expect(result.netCalories).toBe(231);
    expect(result.caloriesToDisplay).toBe(231);
  });

  it("interpolates MET values linearly between table points", () => {
    // 3.0 mph is 3.5 MET, 3.5 mph is 4.3 MET
    // Midpoint: 3.25 mph should be 3.5 + 0.5 * (4.3 - 3.5) = 3.9 MET
    const midMet = getWalkingMet(3.25);
    expect(midMet).toBeCloseTo(3.9, 2);

    // 2.0 mph is 2.8, 2.5 mph is 3.0
    // Midpoint: 2.25 mph should be 2.8 + 0.5 * (3.0 - 2.8) = 2.9 MET
    const lowMidMet = getWalkingMet(2.25);
    expect(lowMidMidMet => lowMidMet).toBeTruthy();
    expect(lowMidMet).toBeCloseTo(2.9, 2);
  });

  it("handles edge cases safely (zero duration, zero speed)", () => {
    const inputs: CalculatorInputs = {
      unitSystem: "metric",
      mode: "time-speed",
      weightKg: 70,
      weightLbs: 154.3,
      heightCm: 175,
      heightFt: 5,
      heightIn: 9,
      durationHours: 0,
      durationMinutes: 0,
      speedMph: 0,
      speedKmh: 0,
      distanceMiles: 0,
      distanceKm: 0,
      steps: 0,
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightKg: 0,
      backpackWeightLbs: 0,
      showNetCalories: false,
    };

    const result = calculateWalkingCalories(inputs);
    expect(result.grossCalories).toBe(0);
    expect(result.netCalories).toBe(0);
    expect(result.caloriesPerMinute).toBe(0);
  });

  it("calculates treadmill incline using ACSM walking formula", () => {
    const inputs: CalculatorInputs = {
      unitSystem: "metric",
      mode: "treadmill",
      weightKg: 70,
      weightLbs: 154.3,
      heightCm: 175,
      heightFt: 5,
      heightIn: 9,
      durationHours: 0,
      durationMinutes: 30, // 30 min
      speedMph: 3.0,
      speedKmh: 4.8,
      distanceMiles: 1.5,
      distanceKm: 2.4,
      steps: 3000,
      inclinePercent: 5, // 5% grade
      terrain: "pavement",
      backpackWeightKg: 0,
      backpackWeightLbs: 0,
      showNetCalories: false,
    };

    const result = calculateWalkingCalories(inputs);
    expect(result.isAcsmFormula).toBe(true);
    // Incline walking at 5% grade must burn significantly more than level ground
    // Level ground at 3.0 mph for 30 min: 3.5 MET * 70 kg * 0.5 hr = 122.5 kcal
    // With 5% incline: ACSM yields ~196 kcal
    expect(result.grossCalories).toBeGreaterThan(160);
    expect(result.grossCalories).toBeLessThan(250);
  });

  it("computes distance from steps using anthropometric stride", () => {
    const heightCm = 175;
    const stride = estimateStrideLength(heightCm);
    // 175 * 0.414 = 72.45 cm = 0.7245 m
    expect(stride.meters).toBeCloseTo(0.7245, 3);

    const inputs: CalculatorInputs = {
      unitSystem: "metric",
      mode: "steps",
      weightKg: 70,
      weightLbs: 154.3,
      heightCm: 175,
      heightFt: 5,
      heightIn: 9,
      durationHours: 0,
      durationMinutes: 0, // auto duration
      speedMph: 0,
      speedKmh: 0,
      distanceMiles: 0,
      distanceKm: 0,
      steps: 10000, // 10k steps
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightKg: 0,
      backpackWeightLbs: 0,
      showNetCalories: false,
    };

    const result = calculateWalkingCalories(inputs);
    // 10,000 steps * 0.7245 m = 7,245 m = 7.25 km (~4.5 miles)
    expect(result.distanceKm).toBeCloseTo(7.25, 1);
    expect(result.distanceMiles).toBeCloseTo(4.5, 1);
    expect(result.grossCalories).toBeGreaterThan(300);
  });

  it("handles imperial and metric round-trips consistently", () => {
    const metricInputs: CalculatorInputs = {
      unitSystem: "metric",
      mode: "time-speed",
      weightKg: 80,
      weightLbs: 176.37,
      heightCm: 180,
      heightFt: 5,
      heightIn: 11,
      durationHours: 1,
      durationMinutes: 0,
      speedMph: 3.5,
      speedKmh: 5.63,
      distanceMiles: 3.5,
      distanceKm: 5.63,
      steps: 7000,
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightKg: 0,
      backpackWeightLbs: 0,
      showNetCalories: false,
    };

    const imperialInputs: CalculatorInputs = {
      ...metricInputs,
      unitSystem: "imperial",
      weightLbs: 176.3698,
      speedMph: 3.5,
    };

    const metricRes = calculateWalkingCalories(metricInputs);
    const imperialRes = calculateWalkingCalories(imperialInputs);

    expect(Math.abs(metricRes.grossCalories - imperialRes.grossCalories)).toBeLessThanOrEqual(1);
  });

  it("formats pace accurately", () => {
    expect(formatPace(15.5)).toBe("15:30");
    expect(formatPace(20.0)).toBe("20:00");
    expect(formatPace(17.25)).toBe("17:15");
    expect(formatPace(0)).toBe("--:--");
  });
});

