const express = require('express');
const app = express();
const path = require('path');
const router = require('./routing');

app.use(router);
app.use(express.static(__dirname + '/public'));


app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});