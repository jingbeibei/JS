angular.module('BSI', ['ngAnimate', 'ngRoute'])
.config(['$routeProvider', function($rp){
    $rp.when('/', {
        templateUrl: '/views/index.html'
    })
    .when('/course/:name', {
        templateUrl: '/views/course.html'
    })
    .when('/collegeInfo', {
        templateUrl: '/views/collegeInfo.html'
    })
    .when('/about', {
        templateUrl: '/views/a.html'
    })
    .when('/environment', {
        templateUrl: '/views/b.html'
    })
    .when('/404', {
        templateUrl: '/views/404.html'
    })
    .otherwise('/404')
}])