const axios = require("axios");

function getPatient(name) {
  const data = JSON.stringify({
    collection: "patients",
    database: "datastore",
    dataSource: "doc-in-the-house",
    filter: {
      name: name,
    },
  });

  const config = {
    method: "post",
    url: "https://data.mongodb-api.com/app/data-qextw/endpoint/data/beta/action/findOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.MONGO_DATA_API_KEY,
    },
    data: data,
  };
  return axios(config);
}
exports.getPatient = getPatient;
