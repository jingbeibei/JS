// index.js

// 基于express框架的服务器

// 1 npm init初始化一个网站的配置文件(package.json)
// 2 安装express模块 npm install express -save
//   --save会向package.json里写入版本信息
// 3 把网站的主目录转换为静态文件express.static('wwwroot')
// 4 服务器调用get或者post函数，让它处于能够处理请求的状态
// 5 让服务器处于监听状态listen()

var express = require('express');
// body-parser用来处理经过url编码后的表单数据
// 表单默认的编码：application/x-www-form-urlencoded
var bodyParser = require('body-parser');
// multer可以处理以multipart/formdata形式提交的数据
// multer也可以处理文件的上传
var multer = require('multer');

var app = express();
// // 实例化一个multer对象form
var form = multer();

app.use(express.static('wwwroot'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/test', function(req, res){
    // 如果客户端发送的是get请求，应该从查询字段(query)中获取数据
    console.log(req.query.username);
    console.log(req.query.pwd);
    res.status(200).send('OKOKOKOK');
});
// 参数2 form.array()表示在处理表单提交的数据之前先处理以multipart/formdata形式提交的数据
app.post('/test', form.array(), function(req, res){
    // 如果没有经过body-parser中间件解析, req.body输出的是undefined
    console.log(req.body);
    res.status(200).send('我是POST返回的信息...');
})

app.listen(3000, ()=>{console.log('server is OK')});

