// index.js

var m = angular.module('CSI', ['ngAnimate']);

m.controller('Index', ['$interval', '$scope', '$rootScope',
    function($interval, $scope, $root){

    $scope.now = new Date();

    $scope.click = function(){
        alert('某个东西被点击了！');
    }

    $interval(function(){
        $scope.now = new Date();
    }, 1000);


    $scope.$on('$includeContentRequested', function(){
        console.log('loading...');
    });
    $scope.$on('$includeContentLoaded', function(){
        console.log('loaded');
    });
    $root.$on('$includeContentRequested', function(){
        console.log('root loading...');
    });
    $root.$on('$includeContentLoaded', function(){
        console.log('root loaded');
    });
}]);


// .animation()在模块中创建动画
// 第1个参数：动画应用到的标签元素（通过样式类确定）
// 第2个参数：定义动画的函数，支持依赖注入
//           动画定义是一个对象，对象的属性是动画的名称
//           不同的ng指令支持不同动画名称（具体哪个指令包含
//           哪些动画需要查看文档）
//           动画属性的值是一个函数，该函数的第1个参数是标签元素
//           的jQueryLite（和jQuery相似，但功能比jQuery少）包裹
//           第2个参数是动画完成时的回调函数，用来通知Angular动画
//           已经完成。
m.animation('.inc', ['$timeout', function($timeout){
    return {
        enter: function(ele, done){
            // console.log('enter')
            ele.css('z-index', 10).addClass('animated zoomInLeft');
            $timeout(done, 1000);
        },
        leave: function(ele, done){
            // console.log('leave')
            ele.css('z-index', 1).addClass('animated zoomOutRight');
            $timeout(done, 1000);
        }
    };
}]);