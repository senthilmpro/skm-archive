const express = require('express');

let app = new express();

app.use(express.static(__dirname + "/app"));

const PORT = process.env.port || 4444;
app.listen(PORT)
console.log("application running successfully in port : "+ PORT);