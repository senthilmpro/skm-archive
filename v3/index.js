const express = require('express');

let app = new express();

app.use(express.static(__dirname + "/app"));

const router = require('./routes/routes');
const API_V1 = "/api/v1";

app.use(API_V1, router);

const PORT = process.env.port || 4444;
app.listen(PORT)
console.log("application running successfully in port : "+ PORT);