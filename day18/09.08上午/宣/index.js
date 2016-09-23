// 加载express模块
var express = require('express'); 

// 用express创建一个对象app
var app = express();

// 
app.use(express.static('打地鼠'));

// 让app可以处理GET请求
// app.get('/usr', (req, res)=>{
//     // get请求从查询字段(query)中获取值
//     // name password从客户端发送过来的name属性的值
//     // var name = req.query.lisi;
//     // var pwd = req.query.pass;
//     // console.log('你的名字是：' + name +', 密码是：' + pwd);
// });

app.listen(3000, ()=>{console.log('server is running...')});