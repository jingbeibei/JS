// index.js
// 该文件是服务器的入口文件

var express = require('express');
var bodyParser = require('body-parser');
// multer是处理文件上传的中间件
// 当有文件的时候，express会拦截此请求并通过multer组件完成上传操作
var multer = require('multer');

var app = express();
var form = multer();

app.use(express.static('wwwroot'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/comment', (req, res)=>{
    console.log('收到GET请求：' + JSON.stringify(req.query));
    res.status(200).send("感谢您的评价，5星好评!!!");
});

// 第2个参数form.array()表示在正式处理请求之前处理以formdata方式提交的数据
app.post('/comment', form.array(), (req, res)=>{
    console.log('收到POST请求：' + JSON.stringify(req.body));
    res.status(200).send('这个是POST请求，差评…………');
});

app.listen(3000, ()=>{
    console.log('server is ok...');
});