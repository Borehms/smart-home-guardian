const { readDB, writeDB } = require("../db/db");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");

// Registration
exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const db = readDB();

  // Prevent creating more than one primary user
  if (role === 'primary' && db.users.some(u => u.role === 'primary')) {
    return res
      .status(400)
      .json({ error: 'Primary user already exists' });
  }

  if (db.users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "Username taken" });
  }

  const hashed = await bcrypt.hash(password, 10);
  db.users.push({ id: nanoid(), username, password: hashed, role });
  writeDB(db);

  res.status(201).json({ message: "User registered" });
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const db = readDB();

  const user = db.users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  res.json({
    success: true,
    user: { username: user.username, role: user.role },
  });
};

// Get All Users
exports.getAllUsers = (req, res) => {
  const db = readDB();
  // console.log('getAllUsers -> db.users:', db.users);
  // Return full user info (minus password)
  const users = db.users.map((u) => ({
    id:          u.id,
    fullName:    u.fullName,
    username:    u.username,
    role:        u.role,
    deviceName:  u.deviceName,
    macAddress:  u.macAddress,
  }));
  res.json(users);
};

// Remove User
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const db = readDB();

  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  db.users.splice(index, 1);
  writeDB(db);

  res.json({ message: "User removed successfully" });
};
