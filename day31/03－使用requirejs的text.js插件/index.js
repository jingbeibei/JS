// index.js

// 

// text.js的插件，它可以读取指定文件的内容，读取到的内容就是文本
// 本例中用text.js插件读取t1.html
// RequireJS使用!作为插件的分隔符
// 参考：
// http://www.tuicool.com/articles/7NRfAn
// http://www.cnblogs.com/xing901022/p/5392438.html
// require(1, 2)用来加载模块
// 参数1：模块名称
// 参数2：回调函数
require(['template', 'text!T/t1.html'], function(template, t1){
    // compile()是art-template的一个方法，用于预编译模版
    // 在这里用它将模版[字符串]编译成模版解析[函数]
    // 解析模版时，将数据作为参数调用这个函数即可
    t1 = template.compile(t1);

    var html = t1({
        books:[
            {name: 'html5权威指南'},
            {name: 'CSS3权威指南'},
            {name: 'JavaScript权威指南'}
        ]
    })
    document.body.innerHTML = html;
})