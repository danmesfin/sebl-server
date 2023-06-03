const { db } = require("../config/firebase-config");

// Create a new user
async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    const { uid } = req.user; // Access the decoded user ID from the middleware

    // Add the user to the Firestore collection
    const newUserRef = await db.collection("users").add({
      name,
      email,
      uid, // Store the decoded user ID in the Firestore document
    });

    res.status(201).json({ id: newUserRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  try {
    const userRef = db.collection("users").doc(req.params.id);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ id: user.id, ...user.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { createUser, getAllUsers, getUserById };
