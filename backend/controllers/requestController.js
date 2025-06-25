// controllers/requestController.js
const { readDB, writeDB } = require('../db/db');
const { nanoid } = require('nanoid');

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
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  writeDB(db);
  res.status(201).json({ message: 'Request submitted' });
};

exports.getRequests = (req, res) => {
  const db = readDB();
  res.json(db.requests);
};

exports.approveRequest = (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const reqItem = db.requests.find(r => r.id === id);
  if (!reqItem) return res.status(404).json({ error: 'Not found' });
  reqItem.status = 'approved';
  writeDB(db);
  res.json({ message: 'Request approved' });
};

exports.declineRequest = (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const reqItem = db.requests.find(r => r.id === id);
  if (!reqItem) return res.status(404).json({ error: 'Not found' });
  reqItem.status = 'declined';
  writeDB(db);
  res.json({ message: 'Request declined' });
};
