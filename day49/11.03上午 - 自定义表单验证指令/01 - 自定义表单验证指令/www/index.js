var m = angular.module('Valid', [])


// 自定义指令的标准写法是返回一个CDO
// Component Definition Object
// 组件定义对象

// CDO中的link方法起到一个连接/粘接的作用，即
// 将自定义的指令和它所在的作用域、标签元素、
// 标签元素的属性、控制器等粘接在一起，从而达到
// 扩展HTML（Angular）的目的，如在连接时可以向标签元素
// 添加验证规则（validator）来实现自定义验证的功能
// 还可以在作用域中添加监视器，来监视作用域中数据的变化
// 还可以在标签元素上添加事件监听，来监视DOM/BOM事件

// 当文本框中的值变化时，会先调用 $parsers 数组中的
// 函数，对值进行转换；转换通过后会接着调用 $formatters
// 数组中的函数，对值进行格式化；格式化通过后会调用 $validators
// 和 asyncValidators 数组中的函数，对值进行验证；
// 验证通过后 值会被 $render 显示到文本框中，同时传递到
// 作用域中...

m.directive('zyEqualTo', function () {
    return {
        // 自定义表单验证指令需要和ngModel指令一起使用
        require: 'ngModel',
        // scope：当前指令所在的作用域
        // ele：当前指令所在的标签元素
        // attrs：当前标签元素上的属性及其值
        // ctrl：与当前标签元素关联的ngModelController
        link: function (scope, ele, attrs, ctrl) {
            var target = attrs['zyEqualTo']
            if (target) {
                // 监视作用域中数据的变化
                scope.$watch(target, function () {
                    ctrl.$validate()
                })

                // $$parentForm获取当前表单的控制FormController
                var targetCtrl = ctrl.$$parentForm[target]

                // 为当前表单元素添加自定义验证
                // 也是重写Angular内置的验证
                ctrl.$validators.zyEqualTo = function (modelValue, viewValue) {
                    var targetValue = targetCtrl.$viewValue
                    return targetValue == viewValue
                }
            }
        }
    }
})

// $q是Angular中的Promise/Deferred的实现方案
// 它整合了 ES6 Promise 的API和部分jQuery Deferred 的API
m.directive('zyUserNotExists', ['$http', '$q', function($http, $q){
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl){
            // 如果自定义验证是一个异步验证，则应该添加到
            // $asyncValidators中！！！并且返回值应该是一个
            // Promise而不是boolean值
            ctrl.$asyncValidators.zyUserNotExists = function(modelValue, viewValue){
                return $q(function(resolve, reject){
                    $http.get('/api/user/' + viewValue).then(function(res){
                        if(res.data.code == 'success'){
                            resolve()
                        }
                        else{
                            reject()
                        }
                    }, function(){
                        reject()
                    })
                })
            }
        }
    }
}])