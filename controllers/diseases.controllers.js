const getControlMethods = (req, res) => {
  const diseaseName = req.params.disease;
  // TODO: Retrieve control methods from the database for the given diseaseName
  const controlMethods = [
    "Use pesticides",
    "Remove infected plants",
    "Rotate crops",
  ];
  res.send(controlMethods);
};
module.exports = { getControlMethods };
