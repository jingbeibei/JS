// index.js

var express = require('express');
var bodyParser = require('body-parser');

// 
var app = express();

app.use(express.static('wwwroot'));

app.use(bodyParser.urlencoded({extended:true}));

app.post('/user/login', (req, res)=>{
    var phone = req.body.phone;
    var pwd = req.body.password;
    console.log('电话号码：' + phone + ',密码：' + pwd);
    // 
    var result = pwd == '123456' ? '登录成功' : '密码错误，请重新输入!';
    res.status(200).send(result);
});

// 添加监听端口
app.listen(3000, ()=>{console.log('服务器正在运行...')});