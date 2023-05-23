const { db } = require("../config/firebase-config");

// Define the collection name for disease control methods
const DISEASE_CONTROL_COLLECTION = "DiseaseControlMethods";

// Function to get all disease control methods
const getAllDiseaseControlMethods = async (req, res) => {
  try {
    // Query the Firestore collection for all documents
    const snapshot = await db.collection(DISEASE_CONTROL_COLLECTION).get();

    // Extract the data from each document and add it to an array
    const data = snapshot.docs.map((doc) => ({
      diseaseName: doc.id,
      ...doc.data(),
    }));

    // Send the response with the data
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting disease control methods");
  }
};

// Function to get disease control methods for a specific disease
const getDiseaseControlMethodsByDiseaseName = async (req, res) => {
  try {
    const { diseaseName } = req.params;

    // Query the Firestore collection for documents that match the disease name
    const snapshot = await db
      .collection(DISEASE_CONTROL_COLLECTION)
      .doc(diseaseName)
      .get();

    if (!snapshot.exists) {
      return res.status(404).send("Disease control methods not found");
    }

    const data = snapshot.data();

    // Send the response with the data
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting disease control methods");
  }
};

// Create a new disease control method
async function createDiseaseControlMethod(req, res) {
  try {
    const { diseaseName, title, naturalControl, chemicalControl } = req.body;

    await db.collection(DISEASE_CONTROL_COLLECTION).doc(diseaseName).set({
      title: title,
      naturalControl: naturalControl,
      chemicalControl: chemicalControl,
    });

    console.log(`Disease control method created for ${diseaseName}`);
    res.status(200).send("Disease control method created");
  } catch (error) {
    console.error("Error creating disease control method:", error);
    res.status(500).send("Error creating disease control method");
  }
}

// Update a disease control method by disease name
async function updateDiseaseControlMethodByDiseaseName(req, res) {
  try {
    const { diseaseName } = req.params;
    const { title, naturalControl, chemicalControl } = req.body;

    await db.collection(DISEASE_CONTROL_COLLECTION).doc(diseaseName).update({
      title: title,
      naturalControl: naturalControl,
      chemicalControl: chemicalControl,
    });

    console.log(`Disease control method updated for ${diseaseName}`);
    res.status(200).send("Disease control method updated");
  } catch (error) {
    console.error("Error updating disease control method:", error);
    res.status(500).send("Error updating disease control method");
  }
}

// Delete a disease control method by disease name
async function deleteDiseaseControlMethodByDiseaseName(req, res) {
  try {
    const { diseaseName } = req.params;

    await db.collection(DISEASE_CONTROL_COLLECTION).doc(diseaseName).delete();

    console.log(`Disease control method deleted for ${diseaseName}`);
    res.status(200).send("Disease control method deleted");
  } catch (error) {
    console.error("Error deleting disease control method:", error);
    res.status(500).send("Error deleting disease control method");
  }
}

module.exports = {
  getAllDiseaseControlMethods,
  getDiseaseControlMethodsByDiseaseName,
  createDiseaseControlMethod,
  updateDiseaseControlMethodByDiseaseName,
  deleteDiseaseControlMethodByDiseaseName,
};
