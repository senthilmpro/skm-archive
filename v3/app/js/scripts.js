var app = angular.module('archiveApp', []);

app.service('httpService', function ($http) {

    //https://archive.org/details/E75B7D50545CD52B9B704DB0D36E732AD5870C34

    var API_V1 = "/api/v1";
    var checkFile = function (urlService) {
        return $http.get(`${API_V1}/file-check?url=${urlService}`).then(function (response) {
            if (response.status == 200) {
                return response.data;
            } else {
                return [];
            }
        });
    }

    return {
        checkFile: checkFile
    };
});

app.controller('fileServiceCtrl', function ($scope, httpService, $sce) {

    $scope.checkFile = function () {
        httpService.checkFile($scope.urlModel).then(function (data) {
            if (data && data.length > 0) {
                var str = `<div class='linkContainer alert alert-success'>`;
                data.forEach(function (val) {
                    if (val && isValidUrl(val)) {
                        str += `<span class='archLink'><a href='${val}'> ${val}</a></span><br/>`;
                    };
                });
                str += '</div>';
                $scope.linkContainer = $sce.trustAsHtml(str);
            } else {
                var str = `<div class='linkContainer alert alert-danger'>`;
                str += `<h4>No Data found for ${$scope.urlModel}</h4>`;
                str += '</div>';
                $scope.linkContainer = $sce.trustAsHtml(str);

            }
        });
    }

    function isValidUrl(reqUrl) {
        try {
            new URL(reqUrl);
            return true;
        } catch (ex) {
            return false;
        }
    }
});