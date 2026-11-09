import {
  CalculatorInputs,
  CalculationResult,
  SpeedPreset,
  TerrainOption,
  TerrainType,
} from "./types";

/**
 * Standard Walking MET values from the 2011 Compendium of Physical Activities
 * (Ainsworth et al., Medicine & Science in Sports & Exercise).
 * Speed in mph -> MET value on firm, level ground.
 */
export const MET_TABLE: Array<{ mph: number; kmh: number; met: number; code: string; label: string }> = [
  { mph: 2.0, kmh: 3.22, met: 2.8, code: "17151", label: "Slow stroll (2.0 mph)" },
  { mph: 2.5, kmh: 4.02, met: 3.0, code: "17152", label: "Casual pace (2.5 mph)" },
  { mph: 3.0, kmh: 4.83, met: 3.5, code: "17170", label: "Moderate pace (3.0 mph)" },
  { mph: 3.5, kmh: 5.63, met: 4.3, code: "17190", label: "Brisk walking (3.5 mph)" },
  { mph: 4.0, kmh: 6.44, met: 5.0, code: "17200", label: "Very brisk (4.0 mph)" },
  { mph: 4.5, kmh: 7.24, met: 7.0, code: "17220", label: "Power walk (4.5 mph)" },
  { mph: 5.0, kmh: 8.05, met: 8.3, code: "17230", label: "Race walk (5.0 mph)" },
];

/**
 * Preset speed shortcuts for quick selection
 */
export const SPEED_PRESETS: SpeedPreset[] = [
  { id: "stroll", label: "Stroll", mph: 2.0, kmh: 3.2, description: "Window shopping, relaxed" },
  { id: "casual", label: "Casual", mph: 2.5, kmh: 4.0, description: "Walking the dog, easy pace" },
  { id: "moderate", label: "Moderate", mph: 3.0, kmh: 4.8, description: "Purposeful walking, everyday" },
  { id: "brisk", label: "Brisk", mph: 3.5, kmh: 5.6, description: "Aerobic pace, slight breathiness" },
  { id: "power", label: "Power Walk", mph: 4.0, kmh: 6.4, description: "Vigorous stride, arm drive" },
  { id: "race", label: "Fast / Race", mph: 4.5, kmh: 7.2, description: "High intensity, athletic" },
];

/**
 * Terrain multipliers for energy expenditure
 */
export const TERRAIN_OPTIONS: TerrainOption[] = [
  { id: "pavement", label: "Pavement / Track / Treadmill", multiplier: 1.0, description: "Hard, smooth level surface" },
  { id: "grass", label: "Grass / Park Turf", multiplier: 1.1, description: "Even lawn, field, or park trail" },
  { id: "trail", label: "Dirt / Gravel / Nature Trail", multiplier: 1.2, description: "Uneven ground, packed dirt" },
  { id: "sand", label: "Loose Sand / Soft Beach", multiplier: 1.8, description: "High foot-slip, soft shore" },
];

/**
 * Linear interpolation to determine MET for any arbitrary speed.
 */
export function getWalkingMet(speedMph: number): number {
  if (speedMph <= 0) return 1.0; // Resting MET

  // If below the first point (2.0 mph, 2.8 MET), interpolate down to 0 mph (1.0 MET)
  if (speedMph <= MET_TABLE[0].mph) {
    const fraction = speedMph / MET_TABLE[0].mph;
    return 1.0 + fraction * (MET_TABLE[0].met - 1.0);
  }

  // If above the last point (5.0 mph, 8.3 MET), extrapolate with the slope of the last segment
  const lastIndex = MET_TABLE.length - 1;
  if (speedMph >= MET_TABLE[lastIndex].mph) {
    const prev = MET_TABLE[lastIndex - 1];
    const curr = MET_TABLE[lastIndex];
    const slope = (curr.met - prev.met) / (curr.mph - prev.mph);
    return curr.met + (speedMph - curr.mph) * slope;
  }

  // Between known points in the table
  for (let i = 0; i < MET_TABLE.length - 1; i++) {
    const low = MET_TABLE[i];
    const high = MET_TABLE[i + 1];
    if (speedMph >= low.mph && speedMph <= high.mph) {
      const fraction = (speedMph - low.mph) / (high.mph - low.mph);
      return low.met + fraction * (high.met - low.met);
    }
  }

  return 3.5;
}

/**
 * Format minutes into "MM:SS" pace string
 */
export function formatPace(minutesPerUnit: number): string {
  if (!isFinite(minutesPerUnit) || minutesPerUnit <= 0 || minutesPerUnit > 300) {
    return "--:--";
  }
  const mins = Math.floor(minutesPerUnit);
  const secs = Math.round((minutesPerUnit - mins) * 60);
  if (secs === 60) {
    return `${mins + 1}:00`;
  }
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/**
 * Estimate stride length based on height in meters.
 * Standard anthropometric multiplier: height * 0.414 (for walking).
 */
export function estimateStrideLength(heightCm: number): { meters: number; feet: number } {
  const safeHeightCm = heightCm > 0 ? heightCm : 170; // 170cm default
  const meters = (safeHeightCm * 0.414) / 100;
  const feet = meters * 3.28084;
  return { meters, feet };
}

/**
 * Primary calculation function.
 * Pure, deterministic, handles all 4 calculation modes and edge cases.
 */
export function calculateWalkingCalories(inputs: CalculatorInputs): CalculationResult {
  const notes: string[] = [];

  // 1. Resolve weight
  let totalWeightKg = inputs.unitSystem === "metric" ? inputs.weightKg : inputs.weightLbs * 0.45359237;
  if (totalWeightKg <= 0 || !isFinite(totalWeightKg)) {
    totalWeightKg = 70; // Sensible default fallback
  }

  // Backpack / carried load
  const loadKg = inputs.unitSystem === "metric"
    ? Math.max(0, inputs.backpackWeightKg || 0)
    : Math.max(0, (inputs.backpackWeightLbs || 0) * 0.45359237);
  const effectiveWeightKg = totalWeightKg + loadKg;

  // 2. Resolve height & stride
  let heightCm = inputs.unitSystem === "metric" 
    ? inputs.heightCm 
    : (inputs.heightFt * 12 + inputs.heightIn) * 2.54;
  if (heightCm <= 0 || !isFinite(heightCm)) {
    heightCm = 175; // ~5'9"
  }

  const naturalStride = estimateStrideLength(heightCm);
  const strideLengthM = inputs.customStrideLengthM && inputs.customStrideLengthM > 0
    ? inputs.customStrideLengthM
    : naturalStride.meters;
  const strideLengthFt = strideLengthM * 3.28084;

  const stepsPerMile = Math.round(5280 / strideLengthFt);
  const stepsPerKm = Math.round(1000 / strideLengthM);

  // 3. Resolve duration, speed, and distance based on input mode
  let durationMinutes = 0;
  let speedMph = 0;
  let distanceMiles = 0;
  let steps = 0;

  switch (inputs.mode) {
    case "time-speed": {
      durationMinutes = Math.max(0, (inputs.durationHours || 0) * 60 + (inputs.durationMinutes || 0));
      speedMph = inputs.unitSystem === "metric" ? (inputs.speedKmh || 0) / 1.609344 : (inputs.speedMph || 0);
      distanceMiles = (speedMph * durationMinutes) / 60;
      steps = Math.round(distanceMiles * stepsPerMile);
      break;
    }

    case "distance-time": {
      durationMinutes = Math.max(0, (inputs.durationHours || 0) * 60 + (inputs.durationMinutes || 0));
      distanceMiles = inputs.unitSystem === "metric" ? (inputs.distanceKm || 0) / 1.609344 : (inputs.distanceMiles || 0);
      speedMph = durationMinutes > 0 ? (distanceMiles / (durationMinutes / 60)) : 0;
      steps = Math.round(distanceMiles * stepsPerMile);
      break;
    }

    case "steps": {
      steps = Math.max(0, Math.round(inputs.steps || 0));
      const distanceMeters = steps * strideLengthM;
      distanceMiles = distanceMeters / 1609.344;
      
      // If duration is provided, calculate speed; otherwise assume brisk pace (3.5 mph / 5.6 km/h)
      const inputDuration = (inputs.durationHours || 0) * 60 + (inputs.durationMinutes || 0);
      if (inputDuration > 0) {
        durationMinutes = inputDuration;
        speedMph = distanceMiles / (durationMinutes / 60);
      } else {
        speedMph = 3.5; // Standard brisk walking baseline
        durationMinutes = speedMph > 0 ? (distanceMiles / speedMph) * 60 : 0;
      }
      break;
    }

    case "treadmill": {
      durationMinutes = Math.max(0, (inputs.durationHours || 0) * 60 + (inputs.durationMinutes || 0));
      speedMph = inputs.unitSystem === "metric" ? (inputs.speedKmh || 0) / 1.609344 : (inputs.speedMph || 0);
      distanceMiles = (speedMph * durationMinutes) / 60;
      steps = Math.round(distanceMiles * stepsPerMile);
      break;
    }
  }

  // Safety clamps
  speedMph = Math.max(0, Math.min(speedMph, 12));
  durationMinutes = Math.max(0, Math.min(durationMinutes, 1440)); // Max 24h
  const durationHours = durationMinutes / 60;
  const speedKmh = speedMph * 1.609344;
  const distanceKm = distanceMiles * 1.609344;

  // Pace calculations
  const paceMinPerMile = speedMph > 0 ? 60 / speedMph : 0;
  const paceMinPerKm = speedKmh > 0 ? 60 / speedKmh : 0;

  // 4. Energy Expenditure Computation
  let grossCalories = 0;
  let netCalories = 0;
  let effectiveMet = getWalkingMet(speedMph);
  let isAcsmFormula = false;
  let isInclineEstimate = false;

  const incline = Math.max(0, inputs.inclinePercent || 0);
  const terrainConfig = TERRAIN_OPTIONS.find((t) => t.id === inputs.terrain) || TERRAIN_OPTIONS[0];

  if (incline > 0) {
    // ACSM Incline Walking Equation
    // VO2 (ml/kg/min) = 0.1 * speed_m_min + 1.8 * speed_m_min * grade + 3.5
    const speedMMin = speedMph * 26.8224;
    const grade = incline / 100;

    if (speedMph >= 1.9 && speedMph <= 3.7) {
      isAcsmFormula = true;
      const vo2 = 0.1 * speedMMin + 1.8 * speedMMin * grade + 3.5;
      const kcalPerMin = (vo2 * effectiveWeightKg * 5) / 1000;
      grossCalories = kcalPerMin * durationMinutes;
      // Derive equivalent MET (1 MET = 3.5 ml/kg/min VO2)
      effectiveMet = vo2 / 3.5;
      netCalories = Math.max(0, ((vo2 - 3.5) * effectiveWeightKg * 5) / 1000 * durationMinutes);
    } else {
      // Outside 1.9-3.7 mph, extrapolate with Compendium MET + incline elevation factor
      isInclineEstimate = true;
      notes.push("Speed is outside the strict ACSM treadmill range (1.9–3.7 mph); an elevation factor was added.");
      const baseMet = getWalkingMet(speedMph);
      // Incline adds roughly ~0.45 MET per 1% grade at typical walking velocities
      effectiveMet = baseMet + incline * 0.45;
      grossCalories = effectiveMet * effectiveWeightKg * durationHours;
      netCalories = Math.max(0, (effectiveMet - 1.0) * effectiveWeightKg * durationHours);
    }
  } else {
    // Level ground: standard MET formula
    effectiveMet = getWalkingMet(speedMph);
    grossCalories = effectiveMet * effectiveWeightKg * durationHours;
    netCalories = Math.max(0, (effectiveMet - 1.0) * effectiveWeightKg * durationHours);
  }

  // Apply terrain multiplier (only for non-treadmill outdoor terrains)
  if (inputs.mode !== "treadmill" && terrainConfig.multiplier !== 1.0) {
    grossCalories *= terrainConfig.multiplier;
    netCalories *= terrainConfig.multiplier;
    effectiveMet *= terrainConfig.multiplier;
  }

  // Round values
  grossCalories = Math.round(grossCalories);
  netCalories = Math.round(netCalories);
  const caloriesToDisplay = inputs.showNetCalories ? netCalories : grossCalories;

  const caloriesPerMinute = durationMinutes > 0 ? parseFloat((caloriesToDisplay / durationMinutes).toFixed(2)) : 0;
  const caloriesPerMile = distanceMiles > 0 ? Math.round(caloriesToDisplay / distanceMiles) : 0;
  const caloriesPerKm = distanceKm > 0 ? Math.round(caloriesToDisplay / distanceKm) : 0;

  // 5. Fat & Food Equivalents
  // ~7,700 kcal per kg of fat (~3,500 kcal per lb)
  const fatGramsBurned = parseFloat(((caloriesToDisplay / 7700) * 1000).toFixed(1));
  const fatLbsBurned = parseFloat((caloriesToDisplay / 3500).toFixed(2));

  const foodEquivalents = {
    bananas: parseFloat((caloriesToDisplay / 105).toFixed(1)),
    pizzaSlices: parseFloat((caloriesToDisplay / 285).toFixed(1)),
    cookies: parseFloat((caloriesToDisplay / 150).toFixed(1)),
    apples: parseFloat((caloriesToDisplay / 95).toFixed(1)),
    cansOfCola: parseFloat((caloriesToDisplay / 140).toFixed(1)),
    donuts: parseFloat((caloriesToDisplay / 260).toFixed(1)),
  };

  // 6. Projections (monthly fat loss if walked X days/week: 4.33 weeks per month)
  const monthlyMultiplier = 4.33;
  const weeklyKcal3 = netCalories * 3;
  const weeklyKcal5 = netCalories * 5;
  const weeklyKcal7 = netCalories * 7;

  const projections = {
    days3PerWeekLbs: parseFloat(((weeklyKcal3 * monthlyMultiplier) / 3500).toFixed(1)),
    days3PerWeekKg: parseFloat(((weeklyKcal3 * monthlyMultiplier) / 7700).toFixed(1)),
    days5PerWeekLbs: parseFloat(((weeklyKcal5 * monthlyMultiplier) / 3500).toFixed(1)),
    days5PerWeekKg: parseFloat(((weeklyKcal5 * monthlyMultiplier) / 7700).toFixed(1)),
    days7PerWeekLbs: parseFloat(((weeklyKcal7 * monthlyMultiplier) / 3500).toFixed(1)),
    days7PerWeekKg: parseFloat(((weeklyKcal7 * monthlyMultiplier) / 7700).toFixed(1)),
  };

  // 7. Speed comparison chart data (same duration and weight across standard paces)
  const speedComparisons = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0].map((testMph) => {
    const testMet = getWalkingMet(testMph);
    const testKcal = Math.round(testMet * effectiveWeightKg * durationHours * (inputs.mode !== "treadmill" ? terrainConfig.multiplier : 1.0));
    return {
      label: `${testMph.toFixed(1)} mph`,
      mph: testMph,
      kmh: parseFloat((testMph * 1.609344).toFixed(1)),
      calories: testKcal,
    };
  });

  return {
    grossCalories,
    netCalories,
    caloriesToDisplay,
    met: parseFloat(effectiveMet.toFixed(2)),
    caloriesPerMinute,
    caloriesPerMile,
    caloriesPerKm,
    durationTotalMinutes: Math.round(durationMinutes),
    durationTotalHours: parseFloat(durationHours.toFixed(2)),
    speedMph: parseFloat(speedMph.toFixed(2)),
    speedKmh: parseFloat(speedKmh.toFixed(2)),
    distanceMiles: parseFloat(distanceMiles.toFixed(2)),
    distanceKm: parseFloat(distanceKm.toFixed(2)),
    steps,
    strideLengthM: parseFloat(strideLengthM.toFixed(2)),
    strideLengthFt: parseFloat(strideLengthFt.toFixed(2)),
    stepsPerMile,
    stepsPerKm,
    paceMinPerMile: parseFloat(paceMinPerMile.toFixed(2)),
    paceMinPerKm: parseFloat(paceMinPerKm.toFixed(2)),
    paceFormattedMile: formatPace(paceMinPerMile) + " /mi",
    paceFormattedKm: formatPace(paceMinPerKm) + " /km",
    fatGramsBurned,
    fatLbsBurned,
    foodEquivalents,
    projections,
    speedComparisons,
    isAcsmFormula,
    isInclineEstimate,
    notes,
  };
}
