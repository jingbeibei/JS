// app.js
// 此文件是服务器入口文件，它可以处理客户端发送过来的请求

// require函数用来加载模块
// 模块默认的保存位置是node_modules
var express = require('express');

// 调用上一步加载的express模块创建一个应用(app)
var app = express();

// 调用express函数的static方法，使wwwroot文件夹变成可以通过浏览器访问的静态资源
// 静态资源：浏览器直接下载即可使用的资源，比如：图片、html文件、js、css文件
app.use(express.static('wwwroot'));

// 让服务器能够处理一个get请求
app.get('/user', (req, res)=>{
    // get请求通过query来获取数据(name=nickname name=pwd)
    var name = req.query.nickname;
    var password = req.query.pwd;
    console.log('你提交的数据是：' + name + '，密码是：' + password)
    // 服务器响应
    res.status(200).send('<strong>你提交的数据是：</strong><br>' + name + '<br>' + password);
});

// 添加监听：让服务器处于监听状态，指定监听的端口号，端口号不能超过65535
app.listen(3000, ()=>{console.log('server is OK')});
