const { db } = require("../config/firebase-config");

// Create a new comment
async function createComment(req, res) {
  try {
    const { content, post_id } = req.body;
    const newComment = await db.collection("comments").add({
      content,
      author: db.collection("users").doc(req.user.uid),
      post: db.collection("posts").doc(post_id),
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
  console.log("post id", req.params.postId);
  try {
    const commentsRef = db
      .collection("comments")
      .where("post", "==", db.collection("posts").doc(req.params.postId));
    const snapshot = await commentsRef.get();
    const comments = [];

    // Fetch author details and construct comments array
    await Promise.all(
      snapshot.docs.map(async (doc) => {
        const commentData = doc.data();
        const authorRef = commentData.author;
        const authorSnapshot = await authorRef.get();
        const authorData = authorSnapshot.data();

        comments.push({
          id: doc.id,
          author: {
            name: authorData.name, // Replace with the actual field name for the author's name
            uid: authorData.uid, // Replace with the actual field name for the author's UID
          },
          content: commentData.content,
          created_at: commentData.created_at,
          likes_count: commentData.likes_count,
          post: commentData.post,
        });
      })
    );

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

// Add a like to a comment
async function addLikeToComment(req, res) {
  try {
    const commentRef = db.collection("comments").doc(req.params.commentId);
    const comment = await commentRef.get();

    if (!comment.exists) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const currentLikes = comment.data().likes_count || 0;

    await commentRef.update({
      likes_count: currentLikes + 1,
    });

    res.json({ message: "Like added to comment" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Remove a like from a comment
async function removeLikeFromComment(req, res) {
  try {
    const commentRef = db.collection("comments").doc(req.params.commentId);
    const comment = await commentRef.get();

    if (!comment.exists) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const currentLikes = comment.data().likes_count || 0;

    if (currentLikes === 0) {
      return res.status(400).json({ error: "Comment has no likes" });
    }

    await commentRef.update({
      likes_count: currentLikes - 1,
    });

    res.json({ message: "Like removed from comment" });
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
  addLikeToComment,
  removeLikeFromComment,
};
