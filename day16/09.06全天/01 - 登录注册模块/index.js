// index.js服务器文件

var express = require('express');
var bodyParser = require('body-parser');
// cookie-parser模块用于处理cookie中的数据
var cookieParser = require('cookie-parser');
// multer模块用于处理文件的上传,需要将表单的enctype属性值设为multipart/formdata
var multer = require('multer');
var fs = require('fs');

// multer.diskStorage()函数指定上传文件的路径
var storage = multer.diskStorage({
    // 设置上传后的文件目录为upload,该目录会自动创建
    destination:'upload',
    // 给上传后的文件重新命名
    filename:function(req, file, callback){
        // 从cookie中读取用户注册的"用户名"
        var username = req.cookies.username;
        // callback()用来给上传的文件重新命名，用username重新命名图片
        // `${username}.jpg`是一个模板字符串，`${username}是点位符
        callback(null, `${username}.jpg`);
    }
})

// 添加配置文件到multer对象
var uploads = multer({storage});

var app = express();

app.use(express.static('wwwroot'));
app.use(bodyParser.urlencoded({extended:true}));
// 使用cookieParser中间件，可以处理请求的cookie
app.use(cookieParser());

// 1 处理用户注册的接口
app.post('/user/register', (req, res)=>{
    // 在body中添加ip和时间 
    req.body.ip = req.ip;
    req.body.time = new Date();
    // 向客户端发送消息(服务器做出响应)
    function send(code, message){
        res.status(200).json({code, message});
    }
    
    // 把处理注册的功能封装到一个函数里
    function saveFile(){
        // 通过模板字符串来命名用户对应的文件
        var fileName = `users/${req.body.username}.txt`;
        // 判断该文件是否存在
        fs.exists(fileName, (exists)=>{
            if(exists){
                // 调用send
                send('registered', '该用户名已经被占用，请重新注册!!!');
            }else{
                fs.appendFile(fileName, JSON.stringify(req.body), (err)=>{
                    if(err){
                        send('file error', '抱歉，系统错误...');
                    }else send('success', '恭喜，注册成功！可以登录了...');
                })
            }
        })
    }
    // 判断users文件夹是否存在
    // 如果users存在，就调用saveFile()创建一个txt文件
    // 如果users不存在先创建users文件夹
    fs.exists('users', (exists)=>{
        if(exists){
            // 调用saveFile()
            saveFile();
        }else{
            fs.mkdir('users', (err)=>{
                if(err){
                    send('file error', '创建目录失败，系统错误');
                }else saveFile();
            })
        }
    })
})

// 2 用户登录的接口
app.post('/user/signin', (req, res)=>{
    var fileName = `users/${req.body.username}.txt`;
    
    function send(code, message) {
        res.status(200).json({code, message});
    }
    
    // 
    fs.exists(fileName, (exists)=>{
        if(exists){
            // err表示错误信息
            // data表示文件内容
            fs.readFile(fileName, (err, data)=>{
                // 判断是否有错误发生
                if(err){
                    send('file error', '抱歉，系统错误...');
                }else{
                    // 把文件内容转换为json数据
                    var user = JSON.parse(data);
                    console.log(user);
                    // 找到用户注册的密码，和用户输入的密码比较
                    if(user.password == req.body.password){
                        // 设置cookie中username的值为req.body.username
                        res.cookie('username', req.body.username);
                        send('success', '登录成功!!!');
                    }else send('singin error', '密码错误，请重新输入');
                }
            })
        }else send('signin error', '该用户未注册');
    })
})

// 
app.listen(3000, ()=>{console.log('server is running...')});