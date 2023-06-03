const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  getUserById,
} = require("../controllers/users.controllers");

// Register a new user
router.post("/register", registerUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

module.exports = router;
