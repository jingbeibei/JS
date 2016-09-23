// app.js

var express = require('express');
// body-parser的作用是将浏览器发送的请求体转换为body对象
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('wwwroot'));

// 用bodyParser对请求头进行编码(urlencoded)
app.use(bodyParser.urlencoded({extended:true}));

// 让服务器处理一个post请求
app.post('/user', (req, res)=>{
    // 如果是get请求从query中获得数据
    // var name = req.query.nickname;
    // var password = req.query.pwd;
    
    // 如果是post请求从body(请求体)中获得数据
    var name = req.body.nickname;
    var password = req.body.pwd;
    var isMale = req.body.isMale;
    console.log('用户名是：' + name + '，密码是：' + password  + '性别：' + isMale);
    // 服务器向客户端发送一条响应信息
    res.status(200).send('<strong>你提交的数据是：</strong><br>' + '用户名：' + name + ', <br>密码：' + password);
});

app.listen(3000,()=>{console.log('OK')});