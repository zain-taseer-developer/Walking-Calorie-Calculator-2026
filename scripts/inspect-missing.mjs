import fs from 'fs';

const status = JSON.parse(fs.readFileSync('data/keyword-audit-status.json', 'utf8'));
const list = status.missing;

console.log('Total remaining missing:', list.length);
list.forEach((x, i) => {
  console.log((i + 1) + '. "' + x.keyword + '" (' + x.volume + ')');
});

