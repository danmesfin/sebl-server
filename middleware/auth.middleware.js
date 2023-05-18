const { admin } = require("../config/firebase-config");

const verifyToken = (req, res, next) => {
  const idToken = req.headers.authorization.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch(() => {
      res.status(401).send("Unauthorized");
    });
};

module.exports = { verifyToken };
