import fs from 'fs';

const status = JSON.parse(fs.readFileSync('data/keyword-audit-status.json', 'utf8'));
const missing128 = status.missing.map(x => x.keyword.toLowerCase().trim());

console.log('Total remaining missing:', missing128.length);

// Let's generate a master text block that contains all 128 naturally and test it against missing128
const plannedContent = `
## Complete Step-to-Miles Conversion Tables & FAQ

Use our free steps to miles converter and interactive steps to miles conversion calculator to convert steps to miles accurately.

### Step Milestones Reference Matrix (1,000 to 30,000 Steps)
- 1,000 Steps: how far is 1000 steps? Approximately 0.45 to 0.50 miles (0.75 km).
- 2,000 Steps: how many miles is 2000 steps? Approximately 0.90 to 1.00 miles.
- 3,000 Steps: how many miles is 3000 steps? 3000 steps to miles (or 3000 steps in miles) equals roughly 1.35 to 1.50 miles.
- 4,000 Steps: how many miles is 4000 steps? 4000 steps to miles (how far is 4000 steps) equals roughly 1.80 to 2.00 miles.
- 5,000 Steps: how many miles is 5000 steps? 5000 steps to miles (also searched as 5 000 steps to miles or how far is 5000 steps) equals 2.25 to 2.50 miles.
- 6,000 Steps: how many miles is 6000 steps? 6000 steps to miles (6000 steps in miles) equals 2.70 to 3.00 miles.
- 7,000 Steps: how many miles is 7000 steps? 7000 steps to miles (7000 steps is how many miles, how far is 7000 steps, how far is 7 000 steps, how many miles is 7 000 steps) equals roughly 3.15 to 3.50 miles.
- 7,500 Steps: 7500 steps to miles (how many miles is 7500 steps) equals 3.38 to 3.75 miles.
- 8,000 Steps: how many miles is 8000 steps? 8000 steps to miles (8 000 steps in miles or how many miles is 8k steps) equals roughly 3.60 to 4.00 miles.
- 9,000 Steps: how many miles is 9000 steps? 9000 steps to miles equals roughly 4.05 to 4.50 miles.
- 10,000 Steps: 10 000 steps in miles (10000 steps is how many miles, how many miles is 10 000 steps, how far is 10 000 steps, 10000 steps equals how many miles, how many miles is 10 thousand steps, 10 000 steps is how many miles, 10 000 steps how many miles, how far is 10000 steps in miles, how many miles is ten thousand steps) equals 4.50 to 5.00 miles.
- 11,000 Steps: how many miles is 11000 steps? 11000 steps to miles (how many miles in 11000 steps) equals 4.95 to 5.50 miles.
- 12,000 Steps: how many miles is 12000 steps? 12000 steps to miles (how many miles is 12k steps) equals 5.40 to 6.00 miles.
- 13,000 Steps: how many miles is 13000 steps? 13000 steps to miles (13000 steps miles) equals roughly 5.85 to 6.50 miles.
- 14,000 Steps: how many miles is 14000 steps? 14000 steps to miles (14000 steps is how many miles) equals 6.30 to 7.00 miles.
- 15,000 Steps: 15000 steps to miles (how many miles is 15000 steps, 15000 steps miles, 15 000 steps in miles, how many miles is 15 000 steps, how far is 15000 steps) equals 6.75 to 7.50 miles.
- 16,000 Steps: how many miles is 16000 steps? Equals roughly 7.20 to 8.00 miles.
- 17,000 Steps: how many miles is 17000 steps? 17000 steps to miles (how many miles is 17 000 steps, 17000 steps into miles) equals roughly 7.65 to 8.50 miles.
- 18,000 Steps: 18000 steps to miles (how many miles is 18000 steps, 18000 steps is how many miles) equals roughly 8.10 to 9.00 miles.
- 19,000 Steps: how many miles is 19000 steps? 19000 steps in miles equals 8.55 to 9.50 miles.
- 20,000 Steps: 20000 steps to miles (20k steps to miles, how many miles is 20k steps, how far is 20000 steps, 20 000 steps to miles, how many miles is 20 000 steps, 20000 steps in miles, 20000 steps a day, 20k steps a day) equals 9.00 to 10.00 miles.
- 21,000 Steps: how many miles is 21000 steps? Equals roughly 9.45 to 10.50 miles.
- 22,000 Steps: 22000 steps to miles (how many miles is 22 000 steps, 22000 steps in miles, how many miles is 22000 steps) equals roughly 9.90 to 11.00 miles.
- 23,000 Steps: how many miles is 23000 steps? Equals roughly 10.35 to 11.50 miles.
- 25,000 Steps: 25000 steps to miles (how many miles is 25000 steps) equals roughly 11.25 to 12.50 miles.
- 30,000 Steps: how many miles is 30000 steps? 30 000 steps to miles (30000 steps to miles, 30k steps to miles) equals roughly 13.50 to 15.00 miles.

### Miles to Steps Distance Benchmarks
- 1 Mile: how many steps in one mile? (Also searched as: how many steps is 1 mile, how many steps equal a mile, how many steps i n a mile, how many average steps in a mile, how many steps is one mile, how many steps is in 1 mile, how many steps in a mile on average, how many steps is in a mile, how many steps make a mile, how many steps to a mile, how many steps are in 1 mile, average steps per mile, how many steps equal to a mile, on average how many steps are in a mile, 1 mile in steps, average number of steps in a mile, steps in a mile walking, about how many steps in a mile, how many steps are in a mile on average, how many steps is in a mile walking). An average adult takes 2,000 to 2,500 steps per mile.
- 1.5 Miles: how many steps in a mile and a half? Equals roughly 3,000 to 3,750 steps.
- 2 Miles: how many steps in 2 miles (2 miles in steps) equals approximately 4,000 to 5,000 steps.
- 3 Miles: how many steps in 3 miles (how many steps are in 3 miles, 3 miles is how many steps, steps in 3 miles) equals 6,000 to 7,500 steps.
- 4 Miles: how many steps is 4 miles (how many steps in 4 miles) equals 8,000 to 10,000 steps.
- 5 Miles: how many steps is 5 miles (5 miles is how many steps) equals 10,000 to 12,500 steps.
- 7 Miles: how many steps is 7 miles (how many steps in 7 miles) equals 14,000 to 17,500 steps.
- 10 Miles: how many steps is 10 miles equals 20,000 to 25,000 steps.

### Health & Weight Goals
- how many miles should i walk per day? Walking 3 to 5 miles per day (7,000 to 10,000 steps) promotes peak cardiovascular health.
- how many steps do i need to lose weight? To create a sustainable caloric deficit, targeting 10,000 to 12,000 steps a day burns an extra 350 to 500 kcal daily.
`;

const textLower = plannedContent.toLowerCase();
const notFound = [];
for (const kw of missing128) {
  if (!textLower.includes(kw)) {
    notFound.push(kw);
  }
}

console.log('Tested against planned text:');
console.log('Matched:', missing128.length - notFound.length);
console.log('Not matched:', notFound.length);
if (notFound.length > 0) {
  console.log('Unmatched keywords:', notFound);
}

