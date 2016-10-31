// edit.js

var m = angular.module('Edit', [])

m.controller('EditController', ['$scope', '$http', function ($scope, $http) {
    $scope.phoneRegex = '^1[3-8][0-9]{9}$'

    $http.get('/api/card/me').then(function (res) {
        if (res.status == 200) {
            angular.extend($scope, res.data.data)
        }
    })

    $scope.save = function(){
        console.log($scope)
    }
}])