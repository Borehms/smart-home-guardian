const express = require("express");
const {
  register,
  login,
  getAllUsers,
  deleteUser,
} = require("../controllers/authController");
const router = express.Router();

// Registration & Login
router.post("/register", register);
router.post("/login", login);

// User management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;
// This file defines the routes for user authentication and management.
// It includes routes for user registration, login, fetching all users, and deleting a user.