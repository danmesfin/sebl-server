const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

console.log("service account", serviceAccount),
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sebl-farm-assist.firebaseio.com",
  });

const db = admin.firestore();

module.exports = { db, admin };
