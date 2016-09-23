// index.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

var app = express();
var form = multer();

app.use(express.static('wwwroot'));
app.use(bodyParser.urlencoded({extended:true}));

// post用于向文件中写入数据
app.post('/add', form.array(), (req, res)=>{
    var content = req.body.content;
    // <iframe src="xss.html"></iframe>
    // 过滤用户的提交
    // replace(1,2) 其中1是是尖括号，g是全局的意思，/</g是一个正则表达式
    content = content.replace(/</g, '&lt;');
    content = content.replace(/>/g, '&gt;');
    var message = {
        content:content,
        time:new Date(),
        ip:req.ip
    }
    console.log(message);
    // 判断文件是否存在
    fs.exists('data', (exists)=>{
        // 如果文件不存在
        if(!exists){
            // 同步创建文件：即文件创建成功后再继续执行后续代码
            fs.mkdirSync('data');
        }
        // 向文件中写入数据
        // JSON.stringify(）把JSON转换为字符串
        // 参数2的末尾多加了一个','方便读取时拼成JSON字符串数组
        fs.appendFile('data/message.txt', JSON.stringify(message)+',', (error)=>{
            if(error){
                console.error('保存文件时发生错误:%s', error);
            }
        })
    })
    // 返回json对象
    res.status(200).json({information:'感谢您的留言'});
}) 

// get请求的作用是读取文件内容并发送给客户端
app.get('/messages', (req, res)=>{
    fs.exists('data/message.txt', (exists)=>{
        if(exists){
            fs.readFile('data/message.txt', (error, data)=>{
                if(!error){
                    // 拼成JSON字符串数组，方便浏览器解析
                    var result = '[' + data;
                    result = result.substr(0, result.length - 1);
                    result = result + ']';
                    console.log(result);
                    res.status(200).send(result);
                }
            })
        }else res.status(200).send('[]'); // else返回空数组
    })
})

// 监听
app.listen(3000, ()=>{console.log('server is OK')});
