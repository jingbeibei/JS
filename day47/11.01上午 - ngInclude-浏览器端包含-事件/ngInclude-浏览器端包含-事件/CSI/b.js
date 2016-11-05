// angular.module()只传1个参数时，用来获取已经
// 存在的模型，当程序被拆分成多个js文件时，或使用
// requireJs动态加载angular程序的js文件时，这个方法非常有用
angular.module('CSI').controller('B', ['$scope', function($scope){
    $scope.click = function(){
        alert('某个东西被点击了！----B');
    };
    $scope.$on('$includeContentRequested', function(){
        console.log('B loading...');
    });
    $scope.$on('$includeContentLoaded', function(){
        console.log('B loaded');
    });
}]);