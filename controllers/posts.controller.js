const { db } = require("../config/firebase-config");

const profanityCheck = require("../services/profanity_check");

// Get all posts
async function getAllPosts(req, res) {
  try {
    const postsRef = db.collection("posts");
    const snapshot = await postsRef.get();
    const posts = [];

    for (const doc of snapshot.docs) {
      const postData = doc.data();

      const authorRef = postData.author;
      const authorSnapshot = await authorRef.get();
      const authorData = authorSnapshot.data();

      const post = {
        id: doc.id,
        author: {
          name: authorData.name,
          uid: authorData.uid,
        },
        likes_count: postData.likes_count,
        post_image_url: postData.post_image_url,
        created_at: postData.created_at,
        title: postData.title,
        content: postData.content,
      };

      posts.push(post);
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Get a post by ID
async function getPost(req, res) {
  try {
    const postRef = db.collection("posts").doc(req.params.postId);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = post.data();
    const authorRef = postData.author;
    const authorSnapshot = await authorRef.get();
    const authorData = authorSnapshot.data();

    res.json({
      id: postData.id,
      author: {
        name: authorData.name,
        uid: authorData.uid,
      },
      likes_count: postData.likes_count,
      post_image_url: postData.post_image_url,
      created_at: postData.created_at,
      title: postData.title,
      content: postData.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function createPost(req, res) {
  try {
    const { title, content, post_image_url } = req.body;

    // check for profanity in post content/title
    if (profanityCheck(content) || profanityCheck(title)) {
      return res.status(500).json({error:"There is profanity in the post"})
    }

    const newPost = await db.collection("posts").add({
      title,
      content,
      post_image_url,
      author: db.collection("users").doc(req.user.uid),
      created_at: new Date(),
      likes_count: 0,
    });
    res.json({ id: newPost.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updatePost(req, res) {
  try {
    const { title, content, post_image_url } = req.body;

    // check for profanity in post content/title
    if (profanityCheck(content) || profanityCheck(title)) {
      return res.status(500).json({error:"There is profanity in the post"})
    }
    
    const postRef = db.collection("posts").doc(req.params.postId);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.data().author !== req.user.uid) {
      // check if the user who created the post is the same as the one making the update
      return res.status(403).json({ error: "Forbidden" });
    }
    await postRef.update({
      title,
      content,
      post_image_url,
    });
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deletePost(req, res) {
  try {
    const postRef = db.collection("posts").doc(req.params.postId);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.data().author !== req.user.uid) {
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

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };
