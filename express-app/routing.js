var express = require('express');
var router = express.Router();
const HttpHelper = require('./services/httphelper');

router.get('/api/users', function (req, res) {
    //const data = await HttpHelper.getAllUsers();
    getAllUsers().then((data)=> {
        res.send(data).status(200);
    });
    
});

router.post('/api/users', function (req, res) {
    
    var body = req.body;
    getAllUsersUrl(body).then((data)=> {
        res.send(data).status(200);
    });
});

module.exports = router;


function getAllUsers(){
    var p = new Promise((resolve, reject)=> {
        HttpHelper.getAllUsers().then(data => {
            resolve(data);
        })
    });
    return p;
}

function getAllUsersUrl(body){
    var p = new Promise((resolve, reject)=> {
        HttpHelper.getAllUsersMetadata(body).then(data => {
            HttpHelper.getArchiveUrlResponses(data).then(res => {
                resolve(res);
            });
        });
    });
    return p;
}