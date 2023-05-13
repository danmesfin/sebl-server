const express = require("express");
const router = express.Router();

const {
  getAllDiseaseControlMethods,
  getDiseaseControlMethodsByDiseaseName,
  createDiseaseControlMethod,
  updateDiseaseControlMethodByName,
  deleteDiseaseControlMethodByName,
} = require("../controllers/diseases.controllers");

// Get all disease control methods
router.get("/disease-control", getAllDiseaseControlMethods);

// Get disease control methods by disease name
router.get(
  "/disease-control/:diseaseName",
  getDiseaseControlMethodsByDiseaseName
);

// Create new disease control method
router.post("/disease-control", createDiseaseControlMethod);

// Update disease control method by name
router.patch("/disease-control/:diseaseName", updateDiseaseControlMethodByName);

// Delete disease control method by name
router.delete(
  "/disease-control/:diseaseName",
  deleteDiseaseControlMethodByName
);

module.exports = router;
