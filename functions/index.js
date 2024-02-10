require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const api = require("./axio.js");
const app = express();
const cors = require("cors");
// CORS
app.use(cors());
app.use(express.json());

app.get("/patient", async (request, response) => {
  const result = await api.getPatient(request.query.name);
  if (result.data.document === null) {
    result.data.document = {success: false};
  } else {
    result.data.document["success"] = true;
  }
  response.send(result.data.document);
});
const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started at port:${PORT}`);
});
exports.app = functions.https.onRequest(app);
