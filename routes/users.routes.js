const express = require("express");
const router = express.Router();
const postsController = require("../controllers/users.controller");

// Register a new user
router.post("/register", registerUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

module.exports = router;
