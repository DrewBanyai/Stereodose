//const https = require("https");
const http = require("http");
const fs= require("fs");
const app = require("./app");
const mongoose = require("mongoose");

const options = {
	key: fs.readFileSync('./ssl/key.pem'),
	cert: fs.readFileSync('./ssl/csr.pem')
};

const port = process.env.PORT || 3000;

//const server = https.createServer(options, app);
const server = http.createServer(app);

server.listen(port);

let connectToDatabase = async () => {
    let connectFunc = async () => { await mongoose.connect("mongodb+srv://stereodoseredux:4b6f735f938e6fc4571e994999623f61@stereodoseredux-ffq7m.mongodb.net/StereodoseRedux?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }); };
    try { await connectFunc(); }
    catch (error) { console.log("Error while attempting to connect to MongoDB Server:", error.name, error.message); return; }
    console.log("Successfully connected to StereodoseRedux database")
};

connectToDatabase();

//  NOTE: This project is based upon Academind's REST API with Node.js series on Youtube.