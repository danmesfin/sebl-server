const { db } = require("../config/firebase-config");

// Create a new comment
async function createComment(req, res) {
  try {
    const { content, postId } = req.body;
    const newComment = await db.collection("comments").add({
      content,
      author: db.collection("users").doc(req.user.uid),
      post: db.collection("posts").doc(postId),
      created_at: new Date(),
      likes_count: 0,
    });
    res.json({ id: newComment.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Get all comments for a post
async function getCommentsForPost(req, res) {
  try {
    const commentsRef = db
      .collection("comments")
      .where("post", "==", db.collection("posts").doc(req.params.postId));
    const snapshot = await commentsRef.get();
    const comments = [];
    snapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Get a comment by ID
async function getComment(req, res) {
  try {
    const commentRef = db.collection("comments").doc(req.params.commentId);
    const comment = await commentRef.get();
    if (!comment.exists) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ id: comment.id, ...comment.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Update a comment by ID
async function updateComment(req, res) {
  try {
    const { content } = req.body;
    const commentRef = db.collection("comments").doc(req.params.commentId);
    const comment = await commentRef.get();
    if (!comment.exists) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.data().author.id !== req.user.uid) {
      // check if the user who created the comment is the same as the one making the update
      return res.status(403).json({ error: "Forbidden" });
    }
    await commentRef.update({
      content,
    });
    res.json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Delete a comment by ID
async function deleteComment(req, res) {
  try {
    const commentRef = db.collection("comments").doc(req.params.commentId);
    const comment = await commentRef.get();
    if (!comment.exists) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.data().author.id !== req.user.uid) {
      // check if the user who created the comment is the same as the one making the delete request
      return res.status(403).json({ error: "Forbidden" });
    }
    await commentRef.delete();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getCommentsForPost,
};
