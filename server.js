const express = require("express");
const app = express();
//const router = express().router;
const admin = require("firebase-admin");
const auth = require("./routes/auth");

const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://your-project-id.firebaseio.com",
});

app.use("/hello", auth);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
