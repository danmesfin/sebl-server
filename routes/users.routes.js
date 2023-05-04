const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/:id", verifyToken, UserController.getUser);
router.get("/", verifyToken, UserController.getUsers);

module.exports = router;
