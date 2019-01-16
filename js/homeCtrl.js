app.controller('homeCtrl', function ($scope, utilService, httpService) {

    var requestUri = utilService.getWpUri();
    $scope.postsData = [];

    try {
        httpService.getUri(requestUri).then(function (data) {
            if (data && data.posts) {
                var posts = data.posts;
                console.log(posts);
                var urlArr = utilService.getLinks(posts);
                console.log(urlArr);
    
                if (urlArr && urlArr.length > 0) {
                    var newArr = _.map(urlArr, function (o) {
                        return axios.get(o);
                    });
    
                    //promise all links
                    axios.all(newArr).then(function (response) {
                        if (response && response.length > 0) {
                            var workingArr = processResponseArray(response);
    
                            var resultArr = [];
                            // construct the final arr;
                            workingArr.forEach((val, index) => {
                                var requestUrl = urlArr[val.index];
                                var data = val.data;
                                resultArr = resultArr.concat({
                                    url: requestUrl,
                                    data: data,
                                    urlList: val.validFileUrlList,
                                    index: val.index,
                                    showList : false
                                });
                            });
                            console.log(resultArr);
                            $scope.postsData = resultArr;
                            $scope.$apply();
                        }
                    });
                }
            }
        });
    } catch(ex){
        console.log("ERROR >> ", ex);
    }
    

    $scope.getDownloadLink = function (link) {
        return link.replace('/metadata/', '/download/');
    };

    $scope.showList = function(obj){
        obj.showList = !obj.showList;       
    }

    function processResponseArray(responseArr) {
        if (responseArr) {
            var workingArr = [];
            responseArr.forEach(function (value, index) {
                var data = value.data;
                if (!data.is_dark) {
                    var files = data.files;
                    var validFiles = getValidFiles(data);

                    workingArr = workingArr.concat({
                        index: index,
                        data: data,
                        validFileUrlList: validFiles
                    });
                }
            });
            return workingArr;
        }
    }

    function getValidFiles(data) {

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


            var hostUrl = `${protocol}://${primaryHost}${dir}/`;
            var completeUrlList = [];

            finalFileList.forEach(function (value, index) {
                completeUrlList = completeUrlList.concat(`${hostUrl}${value}`);
            });

            return completeUrlList;

        }
    }



});