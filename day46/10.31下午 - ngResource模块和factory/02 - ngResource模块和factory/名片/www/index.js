// index.js

// 为Card模块添加ngResource模块依赖项
// ngResource模块中包含2项内容
// 第1项：$resourceProvider，通过它可以配置$resource服务
// 第2项：$resource,它提供了服务端请求的高级别封装，支持RESTful
// 使用ngResource的好处：不需要多处重复编写$http请求，只需调用简单的方法即可
// $resource服务定义在ngResource模块中，需要在你的HTML中引入这个模块对应的JS
// 同时在你的APP中添加这样一个依赖
var m = angular.module('Card', ['ngResource']);

m.controller('CardController',
    ['$scope', 'Card', function($scope, Card){
        Card.get(function(res){
            // 复制res.data对象中的属性到$scope中
            angular.extend($scope, res.data);
        });
}]);

// 在控制器中对资源进行增删改查(CURD)
m.controller('EditController', 
    ['$scope', '$window', 'Card',
    function($scope, $window, Card){
        // 获取me.txt内容
        Card.get(function(res){
            $scope.card = res.data;
        });
        // 点击"保存"
        $scope.save = function(){
            Card.update($scope.card, function(){
                $window.location.href = 'index.html';
            });
        };
}]);

// 在模块中创建一个工厂(服务)
m.factory('Card', ['$resource', function($resource){
    // 配置一个update操作来完成HTTP PUT
    return $resource('/api/card/me', null, {
        // 获取me.txt内容并更新它
        update: {method: 'PUT'}
    });
}]);