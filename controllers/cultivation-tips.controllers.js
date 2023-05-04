const getCultivationTips = (req, res) => {
  const cropName = req.params.crop;
  // TODO: Retrieve cultivation tips from the database for the given cropName
  const cultivationTips = [
    "Plant in well-draining soil",
    "Water regularly",
    "Fertilize every two weeks",
  ];
  res.send(cultivationTips);
};
module.exports = { getCultivationTips };
