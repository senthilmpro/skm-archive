app.service('httpService', function(){
    // axios init

    var getUri = function(requestUrl, headers){
        return axios.get(requestUrl).then(function(response){
            return response.data;
        }).catch(function(error){
            console.log("ERROR FOUND at HttpService : ", error);
            return error;
        });
    };

    return {
        getUri : getUri
    }
});