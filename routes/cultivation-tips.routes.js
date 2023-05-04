const express = require("express");
const router = express.Router();
const CultivationTipsController = require("../controllers/cultivation-tips.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/:crop", verifyToken, CultivationTipsController.getCultivationTips);

module.exports = router;
