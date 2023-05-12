const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
//const middleware = require("../middlewares/authMiddleware");

// Create a new post
router.post("/posts", postController.createPost);

// Get all posts
router.get("/posts", postController.getAllPosts);

// Get a post by ID
router.get("/posts/:postId", postController.getPostById);

// Update a post by ID
router.put("/posts/:postId", postController.updatePostById);

// Delete a post by ID
router.delete("/posts/:postId", postController.deletePostById);

module.exports = router;
