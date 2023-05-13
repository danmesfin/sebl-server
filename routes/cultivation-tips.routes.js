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
router.get("/:id", getTipById);

// Update a tip by ID
router.put("/:id", updateTipById);

// Delete a tip by ID
router.delete("/:id", deleteTipById);

module.exports = router;
