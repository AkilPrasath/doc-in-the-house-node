const express = require("express");
const database = require("./db.js");
const api = require("./axio.js");
const server = express();

// CORS
server.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
server.get("/patient", async (request, response) => {
	// database.client.connect(async (error, client) => {
	// 	if (error) {
	// 		console.log(error);
	// 		console.log("error in db init");
	// 		response.send("error");
	// 		return;
	// 	}
	// 	console.log(request.query.name);
	// 	var result = await client
	// 		.db("datastore")
	// 		.collection("patients")
	// 		.findOne({ name: request.query.name });
	// 	if (result == null) {
	// 		response.send(
	// 			JSON.stringify({
	// 				error: "Patient Name invalid",
	// 				success: false,
	// 			})
	// 		);
	// 		client.close();
	// 		return;
	// 	}
	// 	console.log(request.query.name);
	// 	client.close();
	// 	result["success"] = true;
	// 	response.send(result);
	// });
	var result = await api.getPatient(request.query.name);
	if (result.data.document === null) {
		result.data.document = { success: false };
	} else {
		result.data.document["success"] = true;
	}
	response.send(result.data.document);
});
server.use(express.json());
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Server started at port:${PORT}`);
});
