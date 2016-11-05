// zhongbei.js

angular.module('ZhongBei', [])
.directive('zhongbeiDate', function(){
    return {
        // 限制指令的使用方式:
        // A:仅限属性
        // E:限制标签
        // C:限制class表达式
        restrict: 'E',
        // 当指令以标签方式使用的时候,指定transclude为true可以使用标签支持嵌套内容
        // 而且在模版中还可以通过ng-transclude指令控制嵌套内容出现的位置
        transclude: true,
        // template:指令模版.也可以将模版放入其它文件,使用templateUrl导入
        // 如果以AC方式使用指令,模版将成为指令所在标签的子标签
        template: '<div>{{date | date:"yyyy年MM月dd日 HH:mm:ss"}}' +
        '<hr><span ng-transclude><span>' +
        '</div>',
        // 指定关联的控制器
        controller: ['$scope', '$interval', function($scope, $interval){
            $scope.date = new Date()
            $interval(function(){
                $scope.date = new Date();
            }, 1000)
        }],
        // 在自定义指令中如果要操作标签元素需要使用这个方法
        // 注意:此方法对于每一个标签只会调用一次
        link: function(scope, ele, attrs){
            ele.on('click', function(){
                var weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
                alert('您好,今天是' + weeks[new Date().getDay()]);
            });
        }
    }
})
.component('zhongbeiTime', {
    transclude: true,
    template: '<div ng-click="$ctrl.click()">{{date | date:"yyyy年MM月dd日 HH:mm:ss"}}' +
    '<hr><span ng-transclude><span>' +
    '</div>',
    controller: ['$scope', '$interval', function($scope, $interval){
        $scope.date = new Date();
        $interval(function(){
            $scope.date = new Date();
        },1000);
        this.weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        this.click = function(){
            alert('您好,今天是' + this.weeks[new Date().getDay()]);
        }
    }]
});
// component是组件化的指令,只支持以标签的方式使用
// 提倡通过自定义标签实现功能(包括界面)的重用
// component不支持link方法,但可以在模版中使用$ctrl访问控制器中的属性和方法