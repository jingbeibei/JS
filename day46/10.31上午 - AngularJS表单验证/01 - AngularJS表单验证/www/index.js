// index.js

var m = angular.module('Card', [])

m.controller('CardController', ['$scope', '$http', function($scope, $http){
    $http.get('/api/card/me').then(function(res){
        // 获取响应头
        // console.log(res.headers('Content-Type'))

        if(res.status == 200){
            // angular.merge($scope, res.data.data)
            angular.extend($scope, res.data.data)
        }
    })
}])