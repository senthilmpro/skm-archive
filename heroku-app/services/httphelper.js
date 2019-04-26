const axios = require('axios');
const _ = require('lodash');
var Buffer = require('buffer').Buffer;

module.exports = {
    getHttpUrl: function (username = "tempoguyx+61ed731d8d8d@gmail.com") {
        //var email = "tempoguyx+61ed731d8d8d@gmail.com";
        var url = `https://archive.org/advancedsearch.php?q=uploader%3A%22${username}%22&fl[]=avg_rating&fl[]=backup_location&fl[]=btih&fl[]=call_number&fl[]=collection&fl[]=contributor&fl[]=coverage&fl[]=creator&fl[]=date&fl[]=description&fl[]=downloads&fl[]=external-identifier&fl[]=foldoutcount&fl[]=format&fl[]=genre&fl[]=headerImage&fl[]=identifier&fl[]=imagecount&fl[]=indexflag&fl[]=item_size&fl[]=language&fl[]=licenseurl&fl[]=mediatype&fl[]=members&fl[]=month&fl[]=name&fl[]=noindex&fl[]=num_reviews&fl[]=oai_updatedate&fl[]=publicdate&fl[]=publisher&fl[]=related-external-id&fl[]=reviewdate&fl[]=rights&fl[]=scanningcentre&fl[]=source&fl[]=stripped_tags&fl[]=subject&fl[]=title&fl[]=type&fl[]=volume&fl[]=week&fl[]=year&sort[]=&sort[]=&sort[]=&rows=50&page=1&output=json&save=yes#raw`;
        return axios.get(url).then(res => res.data);
    },
    getArchiveUrlArray: function (data) {
        var p = new Promise((resolve, reject) => {
            if (data && data.response && data.response.docs && data.response.docs.length > 0) {
                try {
                    var urlArray = [];
                    data.response.docs.forEach((v, i) => {
                        let identifier = v.identifier;
                        let archiveUrl = "https://archive.org/metadata/" + identifier;
                        urlArray = urlArray.concat(archiveUrl);
                    });
                    resolve(urlArray);
                } catch (ex) {
                    resolve([]);
                }
            } else {
                resolve([]);
            }
        });
        return p;
    },
    getArchiveUrlArr : function(data){
        if (data && data.response && data.response.docs && data.response.docs.length > 0) {
            try {
                var urlArray = [];
                data.response.docs.forEach((v, i) => {
                    let identifier = v.identifier;
                    let archiveUrl = "https://archive.org/metadata/" + identifier;
                    urlArray = urlArray.concat(archiveUrl);
                });
                return urlArray;
            } catch (ex) {
                return [];
            }
        } else {
            return [];
        }
    },
    getArchiveUrlResponses: function (urlArray) {
        var p = new Promise((resolve, reject) => {
            if (urlArray && urlArray.length > 0) {
                var allPromises = _.map(urlArray, (v) => axios.get(v));
                axios.all(allPromises).then(axios.spread((...response) => {
                    if (response && response.length > 0) {
                        var workingArr = this.processResponseArray(response);

                        var resultArr = [];
                        // construct the final arr;
                        workingArr.forEach((val, index) => {
                            var requestUrl = urlArray[val.index];
                            var data = val.data;
                            resultArr = resultArr.concat({
                                url: requestUrl,
                                data: data,
                                urlList: val.validFileUrlList,
                                index: val.index
                            });
                        });
                        resolve(resultArr);
                    }
                }));
            } else {
                resolve([]);
            }
        });
        return p;
    },
    processResponseArray: function (responseArr) {
        var _this = this;
        if (responseArr) {
            var workingArr = [];
            responseArr.forEach(function (value, index) {
                var data = value.data;
                if (!data.is_dark) {
                    var files = data.files;
                    var validFiles = _this.getValidFiles(data);

                    workingArr = workingArr.concat({
                        index: index,
                        data: data,
                        validFileUrlList: validFiles
                    });
                }
            });
            return workingArr;
        }
    },
    getValidFiles: function (data) {

        var supportedFormats = [
            ""
        ];
        var ignoredFormats = [
            "Metadata",
            "Archive BitTorrent",
            "BitTorrent",
            "Thumbnail",
            "BitTorrentContents",
            "Text"
        ];

        // chekc if is_dark is activated
        var isDark = data.is_dark;
        if (isDark && isDark == true) {
            return [];
        } else {
            var primaryHost = data.d1;
            var dir = data.dir;
            var protocol = "https";

            var files = data.files;

            var finalFileList = [];
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (ignoredFormats.indexOf(file.format) == -1) {
                        // finalFileList.push(file);
                        finalFileList.push(file.name);
                    };
                };
            }


            var hostUrl = `${protocol}://${primaryHost}/${dir}/`;
            var completeUrlList = [];

            finalFileList.forEach(function (value, index) {
                completeUrlList = completeUrlList.concat(`${hostUrl}${value}`);
            });

            return completeUrlList;

        }
    },
    getAllUsers : function(){
        var requestUrl = "https://public-api.wordpress.com/rest/v1.1/sites/dumppro2.home.blog/posts?number=10&fields=title";
        return axios.get(requestUrl).then(res => res.data).then(function(data){
            var posts = data.posts;
            var emailList = [];
            if(posts && posts.length > 0){
                posts.forEach(function(val, ind){
                    var title = val.title;
                    var parsedTitle = Buffer.from(title, 'base64').toString('binary');
                    console.log(parsedTitle);
                    try {
                        parsedTitle = JSON.parse(parsedTitle);
                    } catch(ex){

                    }
                    var email = parsedTitle.email;
                    emailList = emailList.concat(email);
                });
            }
            return emailList;
        });
    },
    getAllUsersMetadata : function(d){

        var p = new Promise((resolve, reject) => {
            if(d){
                var emailList = d.data;
                var self = this;
                var apiCallList = [];
                var parsedUrlList = [];
                
                if(emailList){
                    console.log("getAllUsersMetadata ", emailList);
                    // get metadata for all users.
                    emailList.forEach(function(v,i){
                        apiCallList.push(self.getHttpUrl(v.trim()));
                    });
                }
    
                axios.all(apiCallList).then(data => {
                    // return all posts in array.
                    data.forEach(function(d){
                        parsedUrlList = parsedUrlList.concat(self.getArchiveUrlArr(d));
                    });
                    
                    resolve(parsedUrlList);
                });
            } else {
                reject();
            }
            
        });
        return p;
    },
    getChannelInfo : function(id){
        var reqUrl = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDqP_-XuOlebIYgSmUmBJMxiLRme-yyZlk&channelId="+ id +"&part=snippet,id&order=date&maxResults=50";
        returnaxios.get(reqUrl).then(res => res.data);
    }

}