import fs from 'fs';

const allKeywords = JSON.parse(fs.readFileSync('data/keywords.json', 'utf8'));

// We want a clear map of which file will contain which keywords.
function mapKeywordToDestination(item) {
  const k = item.keyword.toLowerCase().trim();

  // 1. Weight converter: bare conversions like "152 pounds kg", "128 lbs to kg", etc.
  if (/pounds kg|lbs to kg|kg to lbs|pound.*kg|pounds.*kilogram|\b\d+\s*(lbs|pounds|lb)\s*(to|in)?\s*(kg|kilograms)/i.test(k) ||
      /\b\d+\s*kg\s*(to|in)?\s*(lbs|pounds)/i.test(k) ||
      /^(152 lb to kg|174 lbs in kg|178 lb to kg)$/i.test(k)) {
    return 'app/weight-converter/page.tsx';
  }

  // 2. Treadmill & Incline
  if (/treadmill|incline|treadmill pace|12-3-30|speed on running machine/i.test(k)) {
    return 'app/treadmill-incline-calculator/page.tsx';
  }

  // 3. Multi-Sport & Other Exercise Calorie Burn
  if (/bike|cycling|swim|hiking|hike|jump rope|jumping rope|skipping rope|push up|push-up|sit ups|weight lifting and calories burned|skate|elliptical|running burn|burn running|running calories|calories do you burn running|calories does running burn|erg calculator|how can we burn calories/i.test(k)) {
    return 'app/calories-burned-calculator/page.tsx';
  }

  // 4. BMI, FFMI, Body Weight, Height, Obesity Chart
  if (/bmi|ffmi|body mass index|obesity chart|average weight|correct weight|appropriate weight|normal weight|weight chart|body mass intake|determining bmi|bm1|is 200 pounds overweight|5 5 weight for female|average u.s. female weight|5 7 height|height is 5 6|ideal weight for 5 7 female|180 5'6|180 5 6|150 lbs 5 6 female|5 3 150 lbs female|how heavy|how much should a 13 year old weigh|human weight scale|am i fat quiz|perfect body me/i.test(k)) {
    return 'app/bmi-calculator/page.tsx';
  }

  // 5. Marathon, Half Marathon, 5k, 10k, Race Pace, Speed Distance Time formulas
  if (/marathon|half marathon|race pace|5k|10k|mcmillan|how to calculate speed|speed distance time|fast calculator|pace chart|running pace|calculating velocity|formula of speed time and distance|formula distance time speed|time calculator from speed and distance|time average calculator|pace calendar|strava pace calculator|atlanta track club pace calculator|miles in 20k/i.test(k)) {
    return 'app/marathon-pace-chart/page.tsx';
  }

  // 6. Maintenance, TDEE, BMR, Calorie Deficit, Macros, Diet, Recomp, Bulking, Fasting, Food nutrition
  if (/maintenance|bmr|tdee|eat per day|daily calorie|calorie.*intake|how many calories.*(eat|need|burn a day)|burn.*day|deficit|macro|fat intake|protein|calories a day|calories should i have|average calories|water deficit|daily water calculator|weight loss percentage calculator|body recomp|body recomposition|bulking calculator|keto diet calculator|net carb calculator|in n out calorie|in n out nutrition|breastfeeding calorie|calories for breastfeeding|water fast weight loss|how many calories to consume to lose weight|precision nutrition|calorie friend|exercising but gaining weight|gaining weight while working out|gaining weight after working out|cancel weight watchers|fitness planner|recipe converter|recipe divider|food cost calculator|est cost|calcute|calculadora fast|mpg fuel economy gov/i.test(k)) {
    return 'app/maintenance-calorie-calculator/page.tsx';
  }

  // 7. Kcal vs Calorie definition, translations, en/of, conversions, gram conversions
  if (/kcal|kilocalorie|calorie definition|en cal|of cal|1 gm of fat is how many calories|how many calories are in a pound of fat|how much calories is a pound|how many calories to equal a pound|calorie chilocalorie|how many calories in ak cal|how many calories are in 1 gram of carbohydrates|how many calories are in one gram of carbohydrates|grams to calories|difference between carbs and calories|active vs total calories/i.test(k)) {
    return 'app/calories-vs-kcal/page.tsx';
  }

  // 8. Fitness apps, smartwatch accuracy, trackers
  if (/walkfit|calorie counter app|running apps|fitness tracker|apple watch|mapmyfitness|health tracking apps/i.test(k)) {
    return 'app/fitness-apps-and-trackers/page.tsx';
  }

  // 9. Walking stairs, normal walking speed, go for a walk
  if (/stairs in a flight|stairs is a flight|flight of stairs|flight of staircase|normal person walking speed|go for a walk|go for a walking|benefits of walking 45 minutes a day/i.test(k)) {
    return 'app/how-many-steps-a-day/page.tsx';
  }

  // 10. Steps & Miles variations
  if (/step|mile/i.test(k)) {
    return 'app/steps-to-miles-calculator/page.tsx';
  }

  // 11. Homepage & Walking Core
  if (/walking calorie calculator|calories burned walking|how many calories can i burn walking for an hour/i.test(k)) {
    return 'app/page.tsx';
  }
  if (/calories to lose weight|can you lose weight by walking/i.test(k)) {
    return 'app/walking-for-weight-loss/page.tsx';
  }
  if (/height and weight/i.test(k)) {
    return 'app/bmi-calculator/page.tsx';
  }
  if (/normal walking pace/i.test(k)) {
    return 'app/walking-pace-calculator/page.tsx';
  }
  if (/caloriecalculator\.net/i.test(k)) {
    return 'app/maintenance-calorie-calculator/page.tsx';
  }

  return 'unassigned';
}

const map = {};
const unassigned = [];

for (const item of allKeywords) {
  const dest = mapKeywordToDestination(item);
  if (!map[dest]) map[dest] = [];
  map[dest].push(item);
  if (dest === 'unassigned') {
    unassigned.push(item);
  }
}

console.log('=== TARGET DESTINATION SUMMARY FOR ALL 467 KEYWORDS ===');
for (const [dest, items] of Object.entries(map)) {
  console.log(`${dest}: ${items.length} keywords (Volume: ${items.reduce((a, b) => a + (b.volume || 0), 0).toLocaleString()})`);
}

if (unassigned.length > 0) {
  console.log('\nUNASSIGNED KEYWORDS:');
  unassigned.forEach(x => console.log(`  - "${x.keyword}"`));
} else {
  console.log('\nAll 467 keywords mapped successfully with ZERO unassigned!');
}

fs.writeFileSync('data/keyword-plan.json', JSON.stringify(map, null, 2));
