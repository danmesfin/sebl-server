const express = require("express");
const router = express.Router();
const DiseaseController = require("../controllers/diseases.controllers");
//const { verifyToken } = require("../middleware/auth.middleware");

router.get("/control-methods/:disease", DiseaseController.getControlMethods);

module.exports = router;
