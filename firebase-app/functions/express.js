const express = require('express');
const app = new express();

const router = require('./routing');
app.use(router);

module.exports = app;