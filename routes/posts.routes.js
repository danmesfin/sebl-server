const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Create a new post
router.post("/new", verifyToken, postController.createPost);

// Get all posts
router.get("/", postController.getAllPosts);

// Get a post by ID
router.get("/:postId", postController.getPost);

// Update a post by ID
router.put("/:postId", postController.updatePost);

// Delete a post by ID
router.delete("/:postId", postController.deletePost);

module.exports = router;
