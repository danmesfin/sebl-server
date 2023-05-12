const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");
const authenticate = require("../middleware/authenticate");

// Create a new comment
router.post("/", authenticate, commentsController.createComment);

// Get all comments for a post
router.get("/post/:postId", commentsController.getCommentsForPost);

// Get a comment by ID
router.get("/:commentId", commentsController.getComment);

// Update a comment by ID
router.put("/:commentId", authenticate, commentsController.updateComment);

// Delete a comment by ID
router.delete("/:commentId", authenticate, commentsController.deleteComment);

module.exports = router;
