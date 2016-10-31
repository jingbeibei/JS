// index.js

var m = angular.module('Card', [])

m.controller('CardController', ['$scope', '$http', function($scope, $http){
    // $http用于读取远程服务器的数据
    // $http.get(url)从web服务器上读取静态的json数据
    $http.get('/api/card/me').then(function(res){
        // 获取响应头
        // console.log(res.headers('Content-Type'))

        if(res.status == 200){
            // angular.merge($scope, res.data.data)
            // angular.extend(dst, src)：复制src对象中的属性到dst对象中
            // 用法参考http://www.tuicool.com/articles/vM7r6v
            angular.extend($scope, res.data.data);
        }
    })
}])