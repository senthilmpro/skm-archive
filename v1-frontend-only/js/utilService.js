app.service('utilService', function(){

    var getWpUri = function(site = 'dumppro.wordpress.com', number=10){
        return `https://public-api.wordpress.com/rest/v1.1/sites/${site}/posts?number=${number}&fields=title`;
    };

    var isValidUri = function(myUri){
        try {
            new URL(myUri);
            return true;
        } catch(ex){
            return false;
        }
    };

    var replaceDetails = function(str = ""){
        str = str.replace('/details/', '/metadata/').replace('/download/','/metadata/');
        return str;
    }
    
    var getLinks = function(posts){
        if(posts){
            var urlArr = [];
            posts.forEach(function(val, index){
                var title = val.title;
                if(isValidUri(title)){
                    title = replaceDetails(title);
                    urlArr.push(title);
                }
            });
            return urlArr;
        }
    }
    
    return {
        getWpUri : getWpUri,
        isValidUri : isValidUri,
        replaceDetails : replaceDetails,
        getLinks : getLinks
    }
});

