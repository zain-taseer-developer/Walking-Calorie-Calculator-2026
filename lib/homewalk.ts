import { calculateWalkingCalories, estimateStrideLength, formatPace } from "./calc";
import { CalculatorInputs } from "./types";

export const HOMEWALK_STEP_THRESHOLD = 0.9;
export const HOMEWALK_MIN_STEP_INTERVAL_MS = 300;
const METERS_PER_MILE = 1609.344;

export function getElapsedSessionSeconds(accumulatedSeconds: number, runStartedAtMs: number, nowMs: number) {
  const elapsedInCurrentRun = Math.max(0, Math.floor((nowMs - runStartedAtMs) / 1000));
  return Math.max(0, Math.floor(accumulatedSeconds) + elapsedInCurrentRun);
}

export interface HomeWalkMetricsInput {
  weightKg: number;
  heightCm: number;
  durationSeconds: number;
  steps?: number;
  speedMph?: number;
  customStrideLengthCm?: number;
  minimumReliableDurationSeconds?: number;
}

export interface HomeWalkMetrics {
  steps: number;
  strideLengthM: number;
  distanceMeters: number;
  distanceMiles: number;
  distanceKm: number;
  speedMph: number | null;
  pacePerMile: string | null;
  pacePerKm: string | null;
  grossCalories: number | null;
}

export function isValidHomeWalkProfile(weightKg: number, heightCm: number, customStrideLengthCm?: number) {
  return Number.isFinite(weightKg) && weightKg >= 20 && weightKg <= 300
    && Number.isFinite(heightCm) && heightCm >= 100 && heightCm <= 230
    && (customStrideLengthCm === undefined || (Number.isFinite(customStrideLengthCm) && customStrideLengthCm >= 30 && customStrideLengthCm <= 150));
}

export function isValidManualHomeWalkInput(input: HomeWalkMetricsInput) {
  const durationMinutes = input.durationSeconds / 60;
  const stepsValid = input.steps === undefined
    || (Number.isInteger(input.steps) && input.steps > 0 && input.steps <= 200000);
  const speedValid = input.speedMph === undefined
    || (Number.isFinite(input.speedMph) && input.speedMph >= 0.5 && input.speedMph <= 6);
  return isValidHomeWalkProfile(input.weightKg, input.heightCm, input.customStrideLengthCm)
    && Number.isFinite(durationMinutes) && durationMinutes > 0 && durationMinutes <= 1440
    && stepsValid
    && speedValid
    && (input.steps !== undefined || input.speedMph !== undefined);
}

export function calculateHomeWalkMetrics(input: HomeWalkMetricsInput): HomeWalkMetrics {
  const heightCm = Number.isFinite(input.heightCm) && input.heightCm > 0 ? input.heightCm : 170;
  const naturalStride = estimateStrideLength(heightCm).meters;
  const customStrideM = (input.customStrideLengthCm || 0) / 100;
  const strideLengthM = customStrideM >= 0.3 && customStrideM <= 1.5 ? customStrideM : naturalStride;
  const durationSeconds = Math.max(0, Number.isFinite(input.durationSeconds) ? input.durationSeconds : 0);
  const providedSteps = input.steps !== undefined && Number.isFinite(input.steps)
    ? Math.max(0, Math.floor(input.steps))
    : undefined;
  const enteredSpeed = input.speedMph !== undefined && Number.isFinite(input.speedMph) && input.speedMph > 0
    ? input.speedMph
    : undefined;

  let distanceMeters = 0;
  let steps = providedSteps ?? 0;
  if (providedSteps !== undefined) {
    distanceMeters = providedSteps * strideLengthM;
  } else if (enteredSpeed !== undefined && durationSeconds > 0) {
    distanceMeters = enteredSpeed * (durationSeconds / 3600) * METERS_PER_MILE;
    steps = Math.round(distanceMeters / strideLengthM);
  }

  const derivedSpeed = durationSeconds > 0 && distanceMeters > 0
    ? (distanceMeters / METERS_PER_MILE) / (durationSeconds / 3600)
    : null;
  const speedMph = enteredSpeed ?? derivedSpeed;
  const minimumDuration = input.minimumReliableDurationSeconds ?? 0;
  const paceIsReliable = speedMph !== null
    && speedMph >= 0.5
    && speedMph <= 6
    && durationSeconds >= minimumDuration
    && (enteredSpeed !== undefined || steps >= 3);
  const reliableSpeed = paceIsReliable ? speedMph : null;

  let grossCalories: number | null = null;
  const weightKg = input.weightKg;
  if (reliableSpeed !== null && durationSeconds > 0 && Number.isFinite(weightKg) && weightKg > 0) {
    const durationMinutes = durationSeconds / 60;
    const calculatorInputs: CalculatorInputs = {
      unitSystem: "metric",
      mode: "time-speed",
      weightKg,
      weightLbs: weightKg / 0.45359237,
      heightCm,
      heightFt: 0,
      heightIn: 0,
      customStrideLengthM: strideLengthM,
      durationHours: 0,
      durationMinutes,
      speedMph: reliableSpeed,
      speedKmh: reliableSpeed * 1.609344,
      distanceMiles: 0,
      distanceKm: 0,
      steps,
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightKg: 0,
      backpackWeightLbs: 0,
      showNetCalories: false,
    };
    grossCalories = calculateWalkingCalories(calculatorInputs).grossCalories;
  }

  return {
    steps,
    strideLengthM,
    distanceMeters,
    distanceMiles: distanceMeters / METERS_PER_MILE,
    distanceKm: distanceMeters / 1000,
    speedMph: reliableSpeed,
    pacePerMile: reliableSpeed === null ? null : `${formatPace(60 / reliableSpeed)} /mi`,
    pacePerKm: reliableSpeed === null ? null : `${formatPace(60 / (reliableSpeed * 1.609344))} /km`,
    grossCalories,
  };
}

export interface StepDetectorState {
  baselineMagnitude: number | null;
  aboveThreshold: boolean;
  lastStepAt: number;
}

export function createStepDetectorState(): StepDetectorState {
  return { baselineMagnitude: null, aboveThreshold: false, lastStepAt: Number.NEGATIVE_INFINITY };
}

export function detectStepFromMagnitude(
  state: StepDetectorState,
  magnitude: number,
  timestamp: number,
  threshold = HOMEWALK_STEP_THRESHOLD,
  minimumIntervalMs = HOMEWALK_MIN_STEP_INTERVAL_MS,
): { state: StepDetectorState; detected: boolean; filteredMagnitude: number } {
  if (!Number.isFinite(magnitude) || magnitude < 0) {
    return { state, detected: false, filteredMagnitude: 0 };
  }

  const smoothing = 0.08;
  const baselineMagnitude = state.baselineMagnitude === null
    ? magnitude
    : state.baselineMagnitude + smoothing * (magnitude - state.baselineMagnitude);
  const filteredMagnitude = magnitude - baselineMagnitude;
  const isAboveThreshold = filteredMagnitude >= threshold;
  const released = filteredMagnitude < threshold * 0.4;
  const crossedThreshold = isAboveThreshold && !state.aboveThreshold;
  const outsideDebounce = timestamp - state.lastStepAt >= minimumIntervalMs;
  const detected = crossedThreshold && outsideDebounce;

  return {
    state: {
      baselineMagnitude,
      aboveThreshold: released ? false : isAboveThreshold || state.aboveThreshold,
      lastStepAt: detected ? timestamp : state.lastStepAt,
    },
    detected,
    filteredMagnitude,
  };
}
