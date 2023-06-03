const express = require("express");
const router = express.Router();
const postsController = require("../controllers/users.controller");

// Register a new user
router.post("/register", postsController.createUser);

// Get all users
router.get("/", postsController.getAllUsers);

// Get user by ID
router.get("/:id", postsController.getUserById);

module.exports = router;
