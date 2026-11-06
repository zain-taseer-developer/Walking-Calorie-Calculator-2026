import fs from 'fs';
import path from 'path';

const keywordsData = JSON.parse(fs.readFileSync('data/keywords.json', 'utf8'));

// Collect all text from app, components, content
function getAllFiles(dir, exts = ['.tsx', '.ts', '.mdx', '.json']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      if (exts.includes(path.extname(file))) {
        // Exclude keyword data files from search content to avoid self-matching
        if (fullPath.includes('data' + path.sep + 'keywords') || 
            fullPath.includes('data' + path.sep + 'keyword-') ||
            fullPath.includes('scripts' + path.sep)) {
          continue;
        }
        results.push(fullPath);
      }
    }
  }
  return results;
}

const files = [
  ...getAllFiles('app'),
  ...getAllFiles('components'),
  ...getAllFiles('content'),
  ...getAllFiles('lib')
];

console.log(`Auditing against ${files.length} source files...`);

// Load all file content into a normalized index
const fileContents = files.map(f => ({
  path: f,
  text: fs.readFileSync(f, 'utf8').toLowerCase()
}));

const used = [];
const missing = [];

for (const item of keywordsData) {
  const kw = item.keyword.toLowerCase().trim();
  // We can search for the exact keyword string
  let foundIn = [];
  for (const fc of fileContents) {
    if (fc.text.includes(kw)) {
      foundIn.push(fc.path);
    }
  }

  if (foundIn.length > 0) {
    used.push({ ...item, files: foundIn });
  } else {
    missing.push(item);
  }
}

console.log(`\n=== KEYWORD AUDIT RESULTS ===`);
console.log(`Total Keywords: ${keywordsData.length}`);
console.log(`Used Keywords: ${used.length} (${((used.length / keywordsData.length) * 100).toFixed(1)}%)`);
console.log(`Missing Keywords: ${missing.length} (${((missing.length / keywordsData.length) * 100).toFixed(1)}%)`);

const usedVol = used.reduce((a, b) => a + (b.volume || 0), 0);
const missingVol = missing.reduce((a, b) => a + (b.volume || 0), 0);
console.log(`Used Volume: ${usedVol.toLocaleString()} searches/mo`);
console.log(`Missing Volume: ${missingVol.toLocaleString()} searches/mo`);

fs.writeFileSync('data/keyword-audit-status.json', JSON.stringify({
  total: keywordsData.length,
  usedCount: used.length,
  missingCount: missing.length,
  usedVolume: usedVol,
  missingVolume: missingVol,
  missing: missing
}, null, 2));

console.log(`Updated data/keyword-audit-status.json`);

