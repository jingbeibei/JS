// 从Backbone的路由类继承一个新的路由类
// 在路由类中定义路由规则，路由规则由2部分构成：
// 第1部分：hash/fragment(url中#后面的内容，可以使用正则表达式)
// 第2部分：当路由匹配时，要执行的函数
var Router = Backbone.Router.extend({
    routes: {
        '(/)': 's1',
        's1': 's1',
        's2': 's2',
        's3': 's3',
        's4': 's4',
        's5': 's5'
    },

    s1: function(){
        $('section').css('z-index', '').removeClass();
        $('section:eq(0)').css('z-index', '10').addClass('animated zoomIn');
        console.log('s1');
    },

    s2: function(){
        $('section').css('z-index', '').removeClass();
        $('section:eq(1)').css('z-index', '10').addClass('animated zoomIn');
        console.log('s2');
    },

    s3: function(){
        $('section').css('z-index', '').removeClass();
        $('section:eq(2)').css('z-index', '10').addClass('animated zoomIn');
        console.log('s3');
    },

    s4: function(){
        $('section').css('z-index', '').removeClass();
        $('section:eq(3)').css('z-index', '10').addClass('animated zoomIn');
        console.log('s4');
    },

    s5: function(){
        $('section').css('z-index', '').removeClass();
        $('section:eq(4)').css('z-index', '10').addClass('animated zoomIn');
        console.log('s5');
    }
})

// 如要使用路由规则首先要创建一个路由对象
new Router();

// 监视浏览器地址栏中地址的变化，当地址变化时，
// 检查路由规则，如果找到匹配项，则调用路由规则中指定的函数
Backbone.history.start();