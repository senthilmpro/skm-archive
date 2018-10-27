const url = require('url');

function isValidUrl(urlStr){
    try {
       url.parse(urlStr);
        return true;
    } catch(e){
        return false;
    }
}

module.exports = {
    isValidUrl : isValidUrl
}