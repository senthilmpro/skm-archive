const express = require('express');
const app = new express();

const router = require('./routing');

app.use(router);
app.use(express.static("public"));

app.listen(8080);
console.log("running in 8080");