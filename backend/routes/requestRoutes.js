// routes/requestRoutes.js
const express = require("express");
const {
  submitRequest,
  getRequests,
  approveRequest,
  declineRequest,
} = require("../controllers/requestController");

const router = express.Router();

// Create a new access request
router.post("/", submitRequest);

// List all pending requests
router.get("/", getRequests);

// Approve a request
router.patch("/:id/approve", approveRequest);

// Decline a request
router.patch("/:id/decline", declineRequest);

module.exports = router;
// This code defines the routes for handling access requests in the application.
// It includes endpoints for submitting a request, listing all pending requests,  