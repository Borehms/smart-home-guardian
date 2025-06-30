// db/db.js
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../db.json');

// Ensure db.json exists with default structure
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(
    FILE,
    JSON.stringify({ users: [], requests: [] }, null, 2)
  );
}

// Read and parse JSON from file
function readDB() {
  const raw = fs.readFileSync(FILE, 'utf-8');
  return JSON.parse(raw);
}

// Stringify and write JSON to file
function writeDB(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
// This module provides functions to read and write a JSON database file.
// It ensures the file exists with a default structure and provides methods to read and write data.