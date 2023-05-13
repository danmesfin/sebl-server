const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const admin = require("firebase-admin");
const auth = require("./routes/auth");
//const serviceAccount = require("./config/serviceAccountKey.json");

const userRoutes = require("./routes/users.routes");
const cropsRoutes = require("./routes/crops.routes");
const diseaseControlRoutes = require("./routes/disease.routes");
const cultivationTipsRoutes = require("./routes/cultivation-tips.routes");
const postsRoutes = require("./routes/posts.routes");
const commentsRoutes = require("./routes/comments.routes");
const middleware = require("./middleware");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: "https://your-project-id.firebaseio.com",
// });

//app.use(middleware.verifyToken);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/protected", auth);

app.use("/users", userRoutes);
app.use("/crops", cropsRoutes);
app.use("/disease-control", diseaseControlRoutes);
app.use("/tips", cultivationTipsRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
