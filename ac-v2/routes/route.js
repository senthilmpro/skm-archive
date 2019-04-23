const HttpHelper = require('./../services/httphelper');

const routes = [
    {
        'method' : 'GET',
        'url' : '/api/user/:name',
        'handler' : async (req, reply) => {
            const name = req.params.name;
            const data = await HttpHelper.getHttpUrl(name);
            const urlArray = await HttpHelper.getArchiveUrlArray(data);
            const urlResponse = await HttpHelper.getArchiveUrlResponses(urlArray);
            return urlResponse;
        }
    },
    {
        'method' : 'GET',
        'url' : '/api/users',
        'handler' : async (req, reply) => {
            const data = await HttpHelper.getAllUsers();
            return data;
        }
    }
]



module.exports = routes;
