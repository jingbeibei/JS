// index.js 服务器的入口文件，用来处理客户端发来的请求

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static('wwwroot'));
// 解析客户端发来的urlencode编码的数据
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/user/login', (req, res)=>{
    console.log(req.query);
    // setTimeout()：作用是推迟一定时间向客户端发送响应信息
    setTimeout(function() {
        res.status(200).json({status: 'success', message: 'GET登录成功'});
    }, 2*1000);
});

app.post('/api/user/login', (req, res)=>{
    // 设置一个自定义响应头
    res.set('Y-School', 'ZhongBei');
    setTimeout(function() {
        res.status(200).json({status:'zhongzhong', message:'POST登录成功'});
    }, 5*1000);
});

app.listen(3000, ()=>{console.log('server is running...')});