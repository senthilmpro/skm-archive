const url = require('url');

function isValidUrl(urlStr){
    try {
        new URL(urlStr);
        return true;
    } catch(e){
        return false;
    }
}

module.exports = {
    isValidUrl : isValidUrl
}