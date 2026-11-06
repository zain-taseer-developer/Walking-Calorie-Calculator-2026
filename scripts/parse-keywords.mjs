import fs from 'fs';
import path from 'path';

const csvPath = path.join(process.cwd(), 'semrush-export-1793779915599.csv');
const content = fs.readFileSync(csvPath, 'utf8');

function parseVolume(val) {
  if (!val) return 0;
  val = val.trim();
  if (val.endsWith('K') || val.endsWith('k')) {
    return Math.round(parseFloat(val.slice(0, -1)) * 1000);
  }
  if (val.endsWith('M') || val.endsWith('m')) {
    return Math.round(parseFloat(val.slice(0, -1)) * 1000000);
  }
  const n = parseFloat(val.replace(/,/g, ''));
  return isNaN(n) ? 0 : Math.round(n);
}

// Basic CSV line splitter considering quotes
function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
const headers = parseCSVLine(lines[0]).map(h => h.trim());

const results = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  if (row.length < 5) continue;

  const rawKeyword = row[0] || '';
  const cleanKeyword = rawKeyword.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  const volume = parseVolume(row[4]);
  const intent = row[1] ? row[1].trim() : '';
  const relevance = parseFloat(row[2]) || 0;
  const kd = parseFloat(row[8]) || 0;
  const cpc = parseFloat(row[9]) || 0;

  if (cleanKeyword) {
    results.push({
      keyword: cleanKeyword,
      volume,
      intent,
      relevance,
      kd,
      cpc,
      rawVolume: row[4]
    });
  }
}

// Deduplicate if any
const seen = new Set();
const deduped = [];
for (const item of results) {
  if (!seen.has(item.keyword.toLowerCase())) {
    seen.add(item.keyword.toLowerCase());
    deduped.push(item);
  }
}

deduped.sort((a, b) => b.volume - a.volume);

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, 'keywords.json'),
  JSON.stringify(deduped, null, 2),
  'utf8'
);

console.log(`Successfully parsed ${deduped.length} unique keywords into data/keywords.json`);
console.log('Top 20 keywords:');
console.table(deduped.slice(0, 20).map(k => ({
  keyword: k.keyword,
  volume: k.volume,
  intent: k.intent,
  kd: k.kd,
  cpc: k.cpc
})));

