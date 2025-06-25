const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../db.json');

// Ensure db.json exists with default structure
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify({ users: [], requests: [] }, null, 2));
}

// Read and parse JSON
function readDB() {
  const raw = fs.readFileSync(FILE);
  return JSON.parse(raw);
}

// Stringify and write JSON
function writeDB(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
