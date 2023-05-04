const getUser = (req, res) => {
  const userId = req.params.id;
  // TODO: Retrieve user from database using the userId
  const user = { id: userId, name: "John Doe" };
  res.send(user);
};

const getUsers = (req, res) => {
  // TODO: Retrieve all users from the database
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];
  res.send(users);
};
module.exports = { getUser, getUsers };
