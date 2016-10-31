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
//           即使没有依赖项，也不能省略这个参数！

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
    ['$scope', '$rootScope', '$filter', 'wrapFilter', 'GZ',
    function($scope, $rootScope, $filter, wrapFilter, GZ){
    // 如果想使用angular的作用域，只需像上面一样写上'$scope'就可以
    // 通过参数获得angular作用域了
    /************************************* */
    // 注意$scope的属性和它的原型！

    // 在$scope中，angular添加的属性或方法都以$或$$开头
    // 我们添加的属性或方法不能以$开头！！！以防冲突

    // $scope的原型指向的是当前作用域的父作用域，
    // 因此作用域中的属性和方法有继承性。只要父作用域中
    // 定义了某个属性或方法，那么在子孙作用域都可以直接使用它
    // 也可以对它进行覆盖！

    // 在控制台观察属性和原型！
    // console.log($scope)
    // console.log($rootScope)

    $scope.calc = function(){
        var jishu = $scope.jishu || 0;
        var jixiao = $scope.jixiao || 0;
        var jiangjin = $scope.jiangjin || 0;

        // 在angular作用域中创建一个新的属性用来存放计算结果
        // $scope.total = jishu + jixiao + jiangjin

        $scope.result = GZ.calc(jishu, jixiao, jiangjin);
        $scope.showResult = true;

        $scope.now = new Date();

        // 在代码中使用过滤器
        // var numberFilter = $filter('number')
        // console.log( numberFilter(total, 2) )

        // var wrapFilter = $filter('wrap')
        // wrapFilter可以从$filter中获得，
        // 也可以通过依赖注入获得，使用依赖注入获得过滤器时
        // 过滤器的名称后要添加 Filter 后缀，否则会报错！
        // console.log( wrapFilter(total, '“', '”') )

        // console.log($scope)
    }
}]);

// 自定义过滤器的步骤：
// 1、在模块上调用filter方法，传入第1个参数，指定过滤器的名字
//    （这个名字是过滤器的外部使用名称，在模块内部，过滤器的名
//    字还包含Filter后缀）
// 2、创建一个函数作用域，在函数作用域内部定义并返回过滤器函数
//    过滤器函数的第1个参数是要过滤的值，以后的参数可以随意定义
//    过滤器函数必须有返回值
// app.filter('name', function(){
//     return 过滤器函数
// })

app.filter('wrap', function(){
    return function(data, prefix, suffix){
        return prefix + data + suffix;
    };
});

// 过滤器的作用：
// 将原始值（通常在angular作用域中）转换为友好值（通常要显示在页面上）
// 作用域（值）   ====过滤器===>     页面（View）

// 创建一个自定义服务，这个服务中包含了计算工资的方法，
// 任何位置需要使用这个服务时，都可以通过名字获得这个服务
// 创建自定义服务的步骤：
// 1、在模块上调用service方法，传入第1个参数作为服务的名称
// 2、创建一个【函数作用域】，在函数作用域中定义具体服务内容
//    可以是this上一组方法，也可以是this上的一组数据属性
app.service('GZ', function(){
    this.calc = function(jishu, jixiao, jiangjin){
        
        // 计算总额
        var total = jishu + jixiao + jiangjin;
        // 计算计税工资
        var jishui =  total * (1 - 0.08 - 0.02 - 0.005 - 0.08) - 20;
        
        // 计税基数
        var shuiji =  jishui > 3500 ?  jishui - 3500 : 0;
        var shui = 0;
        
        // 计算个人所得税
        if (shuiji <= 0) { shui = 0; }
        if (shuiji <= 1500) { shui = shuiji * 0.03; }
        else if (shuiji <= 4500) { shui = shuiji * 0.1 - 105; }
        else if (shuiji <= 9000) { shui = shuiji * 0.2 - 555; }
        else if (shuiji <= 35000) { shui = shuiji * 0.25 - 1005; }
        
        var shifa = jishui - shui;
        
        return {
            total:total,
            shebao: {
                yanglao: jishu * 0.08,
                yiliao: jishu * 0.02,
                shiye: jishu * 0.005,
                gongshang: 0,
                shengyu: 0,
                gongjijin: jishu * 0.08,
                tongchou: 20,
            },
            jishui: jishui,
            shuiji: shuiji,
            shui: shui,
            shifa: shifa
        }
    }
})

// 服务是可以通过依赖注入使用的对象
// 服务存在意义是：
// 1、用来将一组相关的代码组织成一个整体
// 2、可以在整个应用程序中到处使用（重用）

// 举例：
// 如果把计算工资的代码写在Controller中，则只
// 能在这一个Controller中使用，代码没有任何重用性可言，
// 而放入服务之后，就可以到处使用了

// 服务仅在使用它的时候才会创建实例（服务对象）
// 而且整个应用程序中每个服务只有一个实例（对象），
// 多处多次使用服务时，使用的都同一个对象，
// 通过依赖注入获得服务时，每次得到也都是同一个对象

// 这种创建/获得对象的方式叫做【单例模式】
// 在大多数情况下，我们使用下面方式创建对象：
// var p = {}
// var p1 = new Person()
// 每一行代码都会创建一个全新对象。

// 在程序执行的过程中，有可能会创建出N多的Person对象
// 如果我们要求使用【统一的方法】来获得对象，则
// 可以形成一种效果：通过这个方法得到的对象都是
// 同一个对象，而不会创建新对象。这样程序运行时
// 仅有一个“Person”对象

// var b1 = Person.getBoss()
// var b2 = Person.getBoss()
// 一个饭馆只能有一个老板，所以不能每次使用老板这个对象时
// 都创建一个新的老板对象，只能去获取唯一的一个老板对象