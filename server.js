const express = require("express");
const app = express();

//const admin = require("firebase-admin");
const auth = require("./routes/auth");
//const serviceAccount = require("./config/serviceAccountKey.json");

const userRoutes = require("./routes/users.routes");
const cropsRoutes = require("./routes/crops.routes");
const diseaseRoutes = require("./routes/disease.routes");
const cultivationTipsRoutes = require("./routes/cultivation-tips.routes");
const middleware = require("./middleware");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: "https://your-project-id.firebaseio.com",
// });

//app.use(middleware.verifyToken);

app.use("/protected", auth);

app.use("/users", userRoutes);
app.use("/crops", cropsRoutes);
app.use("/diseases", diseaseRoutes);
app.use("/cultivation-tips", cultivationTipsRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
