// index.js

const express = require('express');
const bodyParser = require('body-parser');
// cookie-parser用于处理cookie数据
const cookieParser = require('cookie-parser');
// multer用于处理文件上传
const multer = require('multer');
const fs = require('fs');

// 创建上传文件的保存信息
const storage = multer.diskStorage({
    // 设置上传后的文件路径，该目录会自动创建
    destination:'upload',
    // 给上传文件重命名
    filename:function(req, file, callback){
        // 从cookies中读取username字段的值
        var username = req.cookies.username;
        // 用username的值命名图片
        // ``表示模板字符串，模板里的${}是占位符，username表示一个变量
        // 如下：`${username}.jpg`每次会生成一个不同的文件名，例如：zhangsan.jpg
        callback(null, `${username}.jpg`);;
    }
});
// 添加配置文件到multer对象
var uploads = multer({storage});

// 
const app = express();

app.use(express.static('wwwroot'));
app.use(bodyParser.urlencoded({extended:true}));
// 使用cookieParser,可以处理请求的cookie
app.use(cookieParser());

// 处理用户注册的接口
app.post('/user/register', (req, res)=>{
    // 在body中添加ip和time
    req.body.ip = req.ip;
    req.body.time = new Date();
    console.log(req.body);
    // send函数用来向客户端返回响应信息
    function send(code, message) {
        res.status(200).json({code, message});
    }
    
    // 定义一个函数saveFile()用来保存文件，避免代码重复，因为下面会调用两次
    function saveFile() {
        var fileName = `users/${req.body.username}.txt`;
        // 判断用户对应的.txt文件是否存在
        fs.exists(fileName, (exists)=>{
            // 如果文件已经存在，表示该用户已注册，弹出提示信息
            if(exists){
                send('registered','该用户名已被占用，请重新注册！');
            }else{
                // 未注册过
                fs.appendFile(fileName, JSON.stringify(req.body), (err)=>{
                    if(err){
                        send('file error', '抱歉，系统错误...');
                    }else send('success', '恭喜，注册成功！请登录...');
                })
            }
        })
    }
    // 判断users文件夹是否存在
    // 如果存在：调用saveFile()
    // 如果不存在：创建users文件夹并调用saveFile()
   fs.exists('users', (exists)=>{
        if(exists){
            saveFile();
        }else{
            fs.mkdir('users', (err)=>{
                if(err){
                    send('file error', '抱歉，系统错误...');
                }else saveFile();
            })
         }
    })
})

// 处理用户登录的接口
app.post('/user/signin', (req, res)=>{
    var fileName = `users/${req.body.username}.txt`;
    // 
    function send(code, message){
        res.status(200).json({code, message});
    }
    // 判断文件是否存在，如果存在读取"密码"字段的值
    fs.exists(fileName, (exists)=>{
        if(exists){
            fs.readFile(fileName, (err, data)=>{
                if(err){
                    send('file error', '抱歉，系统错误...');
                }else{
                    // 把文件内容转换为json对象并存入变量user
                    var user = JSON.parse(data);
                    console.log(user);
                    // 取得读取到密码并和请求体中的密码比较
                    if(user.password == req.body.password){
                        // 设置cookie中username的值为req.body.username
                        // 这样，用户的登录状态就保留下来了。
                        res.cookie('username', req.body.username);
                        send('success', '登录成功...');
                    }else send('signin error', '用户名或密码错误!');
                }
            })
        }else send('signin error', '用户名未注册');
    })
})

// 处理用户登出的接口
app.get('/user/signout', (req, res)=>{
    // 清除cookie，用户就登出了
    res.clearCookie('username');
    res.status(200).json({code:'success'});
})

// 处理用户上传头像的接口
// single()：上传单个文件
app.post('/user/photo', uploads.single('photo'), (req, res)=>{
    res.status(200).send('上传成功');
})

app.listen(3000, ()=>{console.log('server is running....')});