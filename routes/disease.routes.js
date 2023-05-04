const express = require("express");
const router = express.Router();
const DiseaseController = require("../controllers/disease.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get(
  "/control-methods/:disease",
  verifyToken,
  DiseaseController.getControlMethods
);

module.exports = router;
