const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controllers");
//const verifyToken= require("../middleware/);

// Create a new comment
router.post("/", commentsController.createComment);

// Get all comments for a post
router.get("/post/:postId", commentsController.getCommentsForPost);

// Get a comment by ID
router.get("/:commentId", commentsController.getComment);

// Update a comment by ID
router.put("/:commentId", commentsController.updateComment);

// Delete a comment by ID
router.delete("/:commentId", commentsController.deleteComment);

// like a comment
router.post("/like/:commentId", commentsController.addLikeToComment);

// dislike a comment
router.post("/disLike/:commentId", commentsController.removeLikeFromComment);

module.exports = router;
