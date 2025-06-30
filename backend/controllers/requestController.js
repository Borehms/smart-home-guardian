// controllers/requestController.js
const { readDB, writeDB } = require("../db/db");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");

// Submit a new access request (unchanged)
exports.submitRequest = (req, res) => {
  const { fullName, username, deviceName, macAddress, password } = req.body;
  const db = readDB();

  db.requests.push({
    id: nanoid(),
    fullName,
    username,
    deviceName,
    macAddress,
    password,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  writeDB(db);
  res.status(201).json({ message: "Request submitted" });
};

// Get all requests (unchanged)
exports.getRequests = (req, res) => {
  const db = readDB();
  res.json(db.requests);
};

// Approve a request → **now also create a real user**
exports.approveRequest = async (req, res) => {
  const { id } = req.params;
  const db = readDB();

  // 1) Find the request
  const idx = db.requests.findIndex((r) => r.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Request not found" });
  }
  const reqItem = db.requests[idx];

  // 2) Create a user from it
  const hashed = await bcrypt.hash(reqItem.password, 10);
  db.users.push({
    id: nanoid(),
    fullName: reqItem.fullName,
    username: reqItem.username,
    password: hashed,
    role: "user",
    deviceName: reqItem.deviceName,
    macAddress: reqItem.macAddress,
  });

  // 3) Optionally remove the request (keeps pending list clean)
  db.requests.splice(idx, 1);

  writeDB(db);
  res.json({ message: "Request approved and user created" });
};

// Decline request (unchanged)
exports.declineRequest = (req, res) => {
  const { id } = req.params;
  const db = readDB();

  const idx = db.requests.findIndex((r) => r.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  db.requests[idx].status = "declined";
  writeDB(db);
  res.json({ message: "Request declined" });
};
