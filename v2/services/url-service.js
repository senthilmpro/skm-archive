const axios = require('axios');
const urlUtil = require('./url-parser');

function getMetadata(urlString) {
    if (urlUtil.isValidUrl(urlString)) {
        console.log(`Requesting URL String : ${urlString}`);
        return axios.get(urlString).then((res) => {
            console.log(`request status: ${res.status}`);
            return res.data;
        }).catch(function (err) {
            console.log(`ERROR >> ${err}`);
            return null;
        })
    } else {
        return null;
    }
}

module.exports = {
    getMetadata: getMetadata
}