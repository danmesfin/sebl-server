const { db } = require("../config/firebase-config");

// Create a new tip for a crop
async function createTip(req, res) {
  try {
    const { cropType, category, title, content } = req.body;
    const newTip = await db
      .collection("tips")
      .doc(cropType)
      .collection(category)
      .add({
        title,
        content,
        created_at: new Date(),
      });
    res.json({ id: newTip.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Get all tips for a crop and category
async function getAllTips(req, res) {
  try {
    const { cropType, category } = req.params;
    const tips = [];
    const tipDocs = await db
      .collection("tips")
      .doc(cropType)
      .collection(category)
      .get();
    tipDocs.forEach((doc) => {
      tips.push({ id: doc.id, ...doc.data() });
    });
    res.json(tips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Get a single tip by id
async function getTipById(req, res) {
  try {
    const { cropType, category, id } = req.params;
    const tip = await db
      .collection("tips")
      .doc(cropType)
      .collection(category)
      .doc(id)
      .get();
    if (!tip.exists) {
      return res.status(404).json({ error: "Tip not found" });
    }
    res.json({ id: tip.id, ...tip.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Update a tip by id
async function updateTipById(req, res) {
  try {
    const { cropType, category, id } = req.params;
    const { title, content } = req.body;
    const tipRef = db
      .collection("tips")
      .doc(cropType)
      .collection(category)
      .doc(id);
    const tip = await tipRef.get();
    if (!tip.exists) {
      return res.status(404).json({ error: "Tip not found" });
    }
    await tipRef.update({ title, content });
    res.json({ message: "Tip updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Delete a tip by id
async function deleteTipById(req, res) {
  try {
    const { cropType, category, id } = req.params;
    const tipRef = db
      .collection("tips")
      .doc(cropType)
      .collection(category)
      .doc(id);
    const tip = await tipRef.get();
    if (!tip.exists) {
      return res.status(404).json({ error: "Tip not found" });
    }
    await tipRef.delete();
    res.json({ message: "Tip deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  createTip,
  getAllTips,
  getTipById,
  updateTipById,
  deleteTipById,
};
