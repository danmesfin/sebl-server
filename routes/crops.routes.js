const express = require("express");
const router = express.Router();
const CropsController = require("../controllers/crops.controller");
//const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", CropsController.getCrop);
router.get("/:name", CropsController.getCropByName);

module.exports = router;
