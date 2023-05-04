const express = require("express");
const app = express();

const admin = require("firebase-admin");
const auth = require("./routes/auth");
const serviceAccount = require("./config/serviceAccountKey.json");

const userRoutes = require("./routes/users.routes");
const cropsRoutes = require("./routes/crops.routes");
//const diseaseRoutes = require("./routes/diseaseRoutes");
//const cultivationTipsRoutes = require("./routes/cultivationTipsRoutes");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://your-project-id.firebaseio.com",
});

app.use("/hello", auth);

app.use("/users", userRoutes);
app.use("/crops", cropsRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
