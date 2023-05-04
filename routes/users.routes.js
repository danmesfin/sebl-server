const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
// const { verifyToken } = require("../middleware/auth.middleware");

router.get("/:id", UserController.getUser);
router.get("/", UserController.getUsers);

module.exports = router;
