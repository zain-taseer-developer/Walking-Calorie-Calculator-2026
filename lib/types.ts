export type UnitSystem = "imperial" | "metric";

export type CalculationMode = "time-speed" | "distance-time" | "steps" | "treadmill";

export type TerrainType = "pavement" | "grass" | "trail" | "sand";

export interface TerrainOption {
  id: TerrainType;
  label: string;
  multiplier: number;
  description: string;
}

export interface SpeedPreset {
  id: string;
  label: string;
  mph: number;
  kmh: number;
  description: string;
}

export interface CalculatorInputs {
  unitSystem: UnitSystem;
  mode: CalculationMode;
  
  // Weight
  weightKg: number;
  weightLbs: number;
  
  // Height (for stride calculation)
  heightCm: number;
  heightFt: number;
  heightIn: number;
  customStrideLengthM?: number; // override if user specified
  
  // Demographics (optional)
  age?: number;
  sex?: "male" | "female" | "unspecified";
  
  // Time
  durationHours: number;
  durationMinutes: number;
  
  // Speed & Pace
  speedMph: number;
  speedKmh: number;
  
  // Distance
  distanceMiles: number;
  distanceKm: number;
  
  // Steps
  steps: number;
  
  // Incline & Treadmill
  inclinePercent: number; // e.g. 0 to 15
  
  // Terrain & Load
  terrain: TerrainType;
  backpackWeightKg: number;
  backpackWeightLbs: number;
  
  // Options
  showNetCalories: boolean;
}

export interface CalculationResult {
  // Primary output
  grossCalories: number;
  netCalories: number;
  caloriesToDisplay: number; // depending on showNetCalories
  met: number;
  
  // Rate metrics
  caloriesPerMinute: number;
  caloriesPerMile: number;
  caloriesPerKm: number;
  
  // Movement metrics
  durationTotalMinutes: number;
  durationTotalHours: number;
  speedMph: number;
  speedKmh: number;
  distanceMiles: number;
  distanceKm: number;
  steps: number;
  strideLengthM: number;
  strideLengthFt: number;
  stepsPerMile: number;
  stepsPerKm: number;
  
  // Pace
  paceMinPerMile: number; // e.g. 17.14 min/mile
  paceMinPerKm: number;   // e.g. 10.65 min/km
  paceFormattedMile: string; // e.g. "17:08 /mi"
  paceFormattedKm: string;   // e.g. "10:39 /km"
  
  // Context & Equivalents
  fatGramsBurned: number;
  fatLbsBurned: number;
  foodEquivalents: {
    bananas: number;      // ~105 kcal
    pizzaSlices: number;  // ~285 kcal
    cookies: number;      // ~150 kcal
    apples: number;       // ~95 kcal
    cansOfCola: number;   // ~140 kcal
    donuts: number;       // ~260 kcal
  };
  
  // Projections (weight loss per month if done X days/week)
  projections: {
    days3PerWeekLbs: number;
    days3PerWeekKg: number;
    days5PerWeekLbs: number;
    days5PerWeekKg: number;
    days7PerWeekLbs: number;
    days7PerWeekKg: number;
  };
  
  // Chart comparison across speeds
  speedComparisons: Array<{
    label: string;
    mph: number;
    kmh: number;
    calories: number;
  }>;

  // Method flags
  isAcsmFormula: boolean;
  isInclineEstimate: boolean;
  notes: string[];
}

