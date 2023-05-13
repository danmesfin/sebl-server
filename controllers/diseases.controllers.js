const { db } = require("../config/firebase-config");

// Define the collection name for disease control methods
const DISEASE_CONTROL_COLLECTION = "DiseaseControlMethods";

// Function to get all disease control methods
const getAllDiseaseControlMethods = async (req, res) => {
  try {
    // Query the Firestore collection for all documents
    const snapshot = await db.collection(DISEASE_CONTROL_COLLECTION).get();

    // Extract the data from each document and add it to an array
    const data = snapshot.docs.map((doc) => doc.data());

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
      .where("diseaseName", "==", diseaseName)
      .get();

    // Extract the data from each document and add it to an array
    const data = snapshot.docs.map((doc) => doc.data());

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
    const { diseaseName, methodType, title, content } = req.body;
    const docRef = await db
      .collection("DiseaseControlMethods")
      .doc(diseaseName)
      .collection(methodType)
      .add({
        title: title,
        content: content,
      });

    console.log(`Disease control method created with ID: ${docRef.id}`);
    res.status(500).send({ id: docRef.id });
  } catch (error) {
    console.error("Error creating disease control method:", error);
  }
}

// Update a disease control method by name
async function updateDiseaseControlMethodByName(
  diseaseName,
  methodType,
  methodName,
  newData
) {
  try {
    const docRef = await db
      .collection("DiseaseControlMethods")
      .doc(diseaseName)
      .collection(methodType)
      .doc(methodName);

    await docRef.update(newData);

    console.log(
      `Disease control method with name '${methodName}' updated successfully`
    );
    return true;
  } catch (error) {
    console.error(
      `Error updating disease control method with name '${methodName}':`,
      error
    );
    return false;
  }
}

// Delete a disease control method by name
async function deleteDiseaseControlMethodByName(
  diseaseName,
  methodType,
  methodName
) {
  try {
    const docRef = await db
      .collection("DiseaseControlMethods")
      .doc(diseaseName)
      .collection(methodType)
      .doc(methodName);

    await docRef.delete();

    console.log(
      `Disease control method with name '${methodName}' deleted successfully`
    );
    return true;
  } catch (error) {
    console.error(
      `Error deleting disease control method with name '${methodName}':`,
      error
    );
    return false;
  }
}

module.exports = {
  getAllDiseaseControlMethods,
  getDiseaseControlMethodsByDiseaseName,
  createDiseaseControlMethod,
  updateDiseaseControlMethodByName,
  deleteDiseaseControlMethodByName,
};
