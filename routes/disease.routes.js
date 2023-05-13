const express = require("express");
const router = express.Router();

const diseaseController = require("../controllers/diseases.controllers");

// Create new disease control method
router.post("/new", diseaseController.createDiseaseControlMethod);

// Get all disease control methods
router.get("/", diseaseController.getAllDiseaseControlMethods);

// Get disease control methods by disease name
router.get(
  "/disease-control/:diseaseName",
  diseaseController.getDiseaseControlMethodsByDiseaseName
);

// Update disease control method by name
router.patch(
  "/disease-control/:diseaseName",
  diseaseController.updateDiseaseControlMethodByName
);

// Delete disease control method by name
router.delete(
  "/disease-control/:diseaseName",
  diseaseController.deleteDiseaseControlMethodByName
);

module.exports = router;
