const { db } = require("../config/firebase-config");

async function getAllPosts(req, res) {
  try {
    const postsRef = db.collection("posts");
    const snapshot = await postsRef.get();
    const posts = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getPost(req, res) {
  try {
    const postRef = db.collection("posts").doc(req.params.id);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ id: post.id, ...post.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const newPost = await db.collection("posts").add({
      title,
      content,
      userId: req.user.uid, // using the decoded token from the middleware
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json({ id: newPost.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updatePost(req, res) {
  try {
    const { title, content } = req.body;
    const postRef = db.collection("posts").doc(req.params.id);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.data().userId !== req.user.uid) {
      // check if the user who created the post is the same as the one making the update
      return res.status(403).json({ error: "Forbidden" });
    }
    await postRef.update({
      title,
      content,
      updatedAt: new Date(),
    });
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deletePost(req, res) {
  try {
    const postRef = db.collection("posts").doc(req.params.id);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.data().userId !== req.user.uid) {
      // check if the user who created the post is the same as the one making the delete request
      return res.status(403).json({ error: "Forbidden" });
    }
    await postRef.delete();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
