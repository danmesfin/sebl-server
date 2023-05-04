const express = require("express");
const router = express.Router();
const CultivationTipsController = require("../controllers/cultivation-tips.controllers");
//const { verifyToken } = require("../middleware/auth.middleware");

router.get("/:crop", CultivationTipsController.getCultivationTips);

module.exports = router;
