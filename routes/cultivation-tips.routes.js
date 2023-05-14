const express = require("express");
const router = express.Router();
const {
  createTip,
  getAllTips,
  getTipById,
  updateTipById,
  deleteTipById,
} = require("../controllers/cultivation-tips.controllers");

// Create a new tip
router.post("/", createTip);

// Get all tips
router.get("/", getAllTips);

// Get a tip by ID
router.get("/:cropType/:category/:title", getTipById);

// Update a tip by ID
router.put("/:cropType/:category/:title", updateTipById);

// Delete a tip by ID
router.delete("/:cropType/:category/:title", deleteTipById);

module.exports = router;
