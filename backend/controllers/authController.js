const { readDB, writeDB } = require('../db/db');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const db = readDB();

  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username taken' });
  }

  const hashed = await bcrypt.hash(password, 10);
  db.users.push({ id: nanoid(), username, password: hashed, role });
  writeDB(db);
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ success: true, user: { username: user.username, role: user.role } });
};
