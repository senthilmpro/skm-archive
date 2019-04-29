const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const router = require('./routing');


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(5000);
console.log("running in 5000");