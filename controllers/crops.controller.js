const getCrop = (req, res) => {
  // TODO: Retrieve all crops from the database
  const crops = [
    { name: "Wheat", type: "Grain" },
    { name: "Rice", type: "Grain" },
    { name: "Tomato", type: "Fruit" },
    { name: "Potato", type: "Vegetable" },
  ];
  res.send(crops);
};

const getCropByName = (req, res) => {
  const cropName = req.params.name;
  // TODO: Retrieve crop from database using the cropName
  const crop = { name: cropName, type: "Fruit" };
  res.send(crop);
};

module.exports = { getCrop, getCropByName };
