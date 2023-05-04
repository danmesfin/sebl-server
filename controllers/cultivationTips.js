const getCrop = (req, res) => {
  // Retrieve all crops from the database
  const crops = [
    { name: "Wheat", type: "Grain" },
    { name: "Rice", type: "Grain" },
    { name: "Tomato", type: "Fruit" },
    { name: "Potato", type: "Vegetable" },
  ];

  // Send the crops as a response
  res.send(crops);
};
