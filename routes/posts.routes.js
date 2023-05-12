const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const middleware = require("../middlewares/authMiddleware");

// Create a new post
router.post("/posts", middleware.verifyToken, postController.createPost);

// Get all posts
router.get("/posts", middleware.verifyToken, postController.getAllPosts);

// Get a post by ID
router.get(
  "/posts/:postId",
  middleware.verifyToken,
  postController.getPostById
);

// Update a post by ID
router.put(
  "/posts/:postId",
  middleware.verifyToken,
  postController.updatePostById
);

// Delete a post by ID
router.delete(
  "/posts/:postId",
  middleware.verifyToken,
  postController.deletePostById
);

module.exports = router;
