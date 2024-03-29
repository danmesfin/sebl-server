const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  res.send(`Hello, ${req.user.name}! This is a protected route.`);
});

module.exports = router;
