// index.js

// var obj = {};

// // 将Backbone.Events对象混入obj对象（效果上类似于继承）
// // 可使 obj 获得Backbone.Events的功能
// obj = _.extend(obj, Backbone.Events);

// // 监听事件，事件类型名称可以随意取
// obj.on('evev', function(){
//     alert('事件被触发了！');
// });

// setTimeout(function() {
//     // 激发事件，事件类型名称可以随意取
//     obj.trigger('evev');
// }, 3000);

/************************************** */

// // 定义一个叫做MyView的视图类
// // MyView是从Backbone.View继承而来的
// var MyView = Backbone.View.extend({
//     // 与MyView视图关联的标签元素
//     // 一个视图可以不关联标签元素，也可以只关联一个标签元素
//     // 所有视图都有一个el属性
//     el: $('main')[0],

//     // 监听的事件列表
//     events: {
//         'click': 'clickHandler'
//     },

//     clickHandler: function(){
//         this.$el.text('视图被点击了！');
//     }
// });

// // 实例化一个视图
// var view = new MyView();


// // 实现上面功能，只需一行jquery代码就可以了
// // 但是与上面的代码相比不在一个技术层次上
// $('main').click(function(){
//     $(this).text('Main被点击了！');
// });

/*************************************************** */
// 创建自定义视图类
var MyView = Backbone.View.extend({
    // 视图的el属性，这里表示页面上的main标签
    el: $('main')[0],
    events: {
        'click': 'clickHandler'
    },

    // 定义一个initialize初始化函数，创建视图时它会立即被调用
    initialize: function(options){
        // alert('initialize被调用了')
        // this.model = options.model
        // listenTo()用于监听一个事件
        // 参数1：要监听的那个对象
        // 参数2：事件
        // 参数3：事件发生时的回调函数
        this.listenTo(this.model, 'change', this.change);
    },
    // change事件：作用是改变main标签的内容
    change: function(){
        // 调用模型中的total()函数计算工资总额并显示到main标签中
        this.$el.text(this.model.total());
    },

    clickHandler: function(){
        // $el是被jquery对象包裹的el
        // jquery存在的情况下
        this.$el.text('视图被点击了！');
    }
}); 

// 定义一个工资模型类
var GongZi = Backbone.Model.extend({
    // 设置数据默认值
    defaults: {
        jiben: 3500,
        jixiao: 0,
        jiangjin: 0
    },
    // 工资总计
    total: function(){
        return  this.get('jiben') + 
                this.get('jixiao') + 
                this.get('jiangjin')
    }
});

// 实例化一个工资模型，并批量设置模型数据
var gongzi = new GongZi({
    jixiao: 4000,
    jiangjin: 200
});

// 实例化一个视图
var view = new MyView({model: gongzi});

// 使用get方法获取模型数据
alert(gongzi.get('jiben'));
alert(gongzi.get('jixiao'));
// 调用模型中的自定义方法
alert(gongzi.total());

gongzi.on('change:jixiao', function(){
    var oldValue = this.previous('jixiao'); // oldValue:4000
    var current = this.get('jixiao'); // current:6000
    console.log(oldValue);
    console.log(current);
    if(current > oldValue){
        alert('恭喜涨工资了');
    }
    else{
        alert('可以考虑跳槽了');
    }
})

// 不设置{silent:true}参数的话会触发"change"事件
// 可以把{silent:true}观察下结果
gongzi.set('jixiao', 6000);