var express = require('express');
var router = express.Router();
var fetchData = require('./../core/fetch-data');
const url = require('url');



router.get('/file-check', function (req, res) {
    if (req && req.query.url) {
        var arUrl = req.query.url;
        console.log(arUrl);
        //parse data from URL.

        if (arUrl && isUrlValid(arUrl)) {
            if (arUrl.indexOf('/details/') !== -1) {
                arUrl = arUrl.replace("/details/", "/metadata/");
            } else if (arUrl.indexOf('/download/') !== -1) {
                arUrl = arUrl.replace("/download/", "/metadata/");
            }
            fetchData.getData(arUrl).then(function(data){
                res.status(200).send(data);
            });

        } else {
            res.status(500).send();
        }
    } else {
        res.status(500).send();
    }
});

function isUrlValid(reqUrl) {
    try {
        var myURL = url.parse(reqUrl);
        console.log("url is valid");
        return true;
    } catch (ex) {
        console.log("ERROR >> url is INVALID : "+ reqUrl);
        return false;
    }
}

module.exports = router;