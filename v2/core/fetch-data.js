const fileService = require('../services/url-service');
var _ = require('lodash');

var testUrl = 'https://archive.org/metadata/Www.TamilRockers.hnRajaRanguski20184KUntouchedUHDMP44.4GBESubsTamil';

//var testUrl = 'https://archive.org/metadata/Www.TamilRockers.hnRajaRanguski20184KUntouchedUHDMP44.4GBESubsTami';


async function getData(testUrlString) {
    let data = await fileService.getMetadata(testUrlString);
    var supportedFormats = [
        ""
    ];
    var ignoredFormats = [
        "Metadata",
        "Archive BitTorrent",
        "BitTorrent",
        "Thumbnail",
        "BitTorrentContents"
    ];

    var primaryHost = data.d1;
    var dir = data.dir;
    var protocol = "https";

    var files = data.files;

    var finalFileList = [];
    for (let i = 0; i < files.length; i++) {
        var file = files[i];
        if(ignoredFormats.indexOf(file.format) == -1){
           // finalFileList.push(file);
           finalFileList.push(file);
        };
    }; 

    var hostUrl = `${protocol}://${primaryHost}/dir/`;
    var completeUrlList = [];

    finalFileList.forEach(function(value,index){
        completeUrlList = completeUrlList.concat(`${completeUrlList}${value}`);
    });

    return completeUrlList;

}


getData(testUrl);