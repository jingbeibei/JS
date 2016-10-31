// angular.module(name, [deps])传2个参数时表示创建一个模块。
// 在angular中模块是一个容器，使用模块这个容器可以
// 将我们创建的内容分隔开，模块与模块之间不会相互干扰冲突。
// 第1个参数：模块的名称，模块中的内容也必须指定一个名称
//           当我们使用模块时及模块中的内容时，
//           都是靠名称来找到这个模块或内容的
//           （AngularJs中不是通过变量来引用需要使用的内容
//           而是通过名称来获取需要使用的内容）
//           var model = new Model()   
//           定义一个变量来保存模型对象
//           var view = new View({model: model})
//           创建视图时，通过model变量引用了刚刚创建的模型对象
// 第2个参数：模块的依赖项列表（依赖项的名称列表）
//          即使没有依赖项，也不能省略这个参数！

var app = angular.module('GZCalc', []);

// 在app这个模块中创建一个控制器【类】
// 第1个参数：控制器【类】的名称，控制器【类】必须指定一个名称才能放入模块中
//           这样使用控制器【类】时只需提供名称就可以得到控制器【类】了
//           在Angular中，所有的内容都需要提供一个名称并放入到模块
//           中，这个过程叫做“注册”
// 第2个参数：实现控制器【类】的函数（也就是构造函数），控制器【类】函数
// //        可以通过提供名称来使用当前模块中的内容。
//           在Angular中，如果想使用模块中的内容，只需要提供它的
//           名称即可，不需自己查找、创建、初始化等等，就可以直接
// //        得到并使用。这种通过提供名称获得对象/函数/值等内容的
// //        过程叫做“注入”
//           因为JS代码压缩（Grunt/Uglify）的时候，参数的名字会
//           被压缩成一个字母，导致参数的名发生变化，从而使“注入”
//           失败。所以Angular推荐使用下面的方式使用模块中的内容
// //        即将名称写在函数之前，并将名称和函数都放在一个数组中
//           使用 ng-strict-di 这个指令可以强制使用这种标准的注入
//           写法，如果不这样写，就是直接报错
app.controller('GZController', 
    ['$scope', '$rootScope', '$filter', 
    function($scope, $rootScope, $filter){
    // 如果想使用angular的作用域，只需像上面一样写上'$scope'就可以
    // 通过参数获得angular作用域了
    /************************************* */
    // 注意$scope的属性和它的原型！

    // 在$scope中，angular添加的属性或方法都以$或$$开头
    // 我们添加的属性或方法不能以$开头！！！以防冲突

    // $scope的原型指向的是当前作用域的父作用域，
    // 因此作用域中的属性和方法有继承性。只要父作用域中
    // 定义了某个属性或方法，那么在子孙作用域都可以直接使用它,也可以对它进行覆盖！

    // 在控制台观察属性和原型！
    console.log($scope)
    console.log($rootScope)

    $scope.calc = function(){
        var jishu = $scope.jishu || 0
        var jixiao = $scope.jixiao || 0
        var jiangjin = $scope.jiangjin || 0

        // 在angular作用域中创建一个新的属性用来存放计算结果
        $scope.total = jishu + jixiao + jiangjin
        $scope.showResult = true;

        $scope.now = new Date();

        // 在代码中使用过滤器
        var numberFilter = $filter('number');
        console.log( numberFilter($scope.total, 2) );
    }
}])

