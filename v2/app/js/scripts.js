var app = angular.module('archiveApp', []);

app.service('httpService', function($http){
    
    var checkFile = function(urlService){
        return $http.post("/file-check", {
            url : urlService
        }).then(function(response){
            return response.data;
        });
    }

    return {
        checkFile : checkFile
    };
});

app.controller('fileServiceCtrl', function($scope, httpService){
    
    $scope.checkFile = function(){
        httpService.checkFile($scope.urlModel).then(function(data){
            console.log(data);
        });
    }
});