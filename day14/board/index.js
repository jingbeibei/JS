// index.js

// 服务器的主文件，它可以实现文件的读写
// 该示例演示了一个网站计数器的写法

var express = require('express');

// fs：file system
// fs模块用来对文件进行读写
var fs = require('fs');

var app = express();
// 规定文件名
var fileName = 'counter.txt';

app.use(express.static('wwwroot'));

app.get('/counter', (req, res)=>{
    // 封装一个函数，该函数用来向客户端发送信息
    function send(count){
        res.status(200).send(count + '');
    }
    
    // 用fs模块调用exists()来判断counter.txt是否存在
    // 参数1表示文件名
    // 参数2表示回调函数
    fs.exists(fileName, (exists)=>{
        // 判断exists的值，如果为true，表示文件存在
        if(exists){
            // 文件存在
            // 如果文件存在则读取该文件的内容并且把文件内容发送给客户端
            // readFile()可以读取文件内容
            fs.readFile(fileName, (err, data)=>{
                
                if(!err){
                    var content=JSON.parse(data);
                    send(content);
                }
            })
        }else{
            // else分支表示counter.txt不存在
            // 在这里应该创建这样一个文件
            // 参数1表示创建的文件名
            // 参数2表示写入的数据
            // 参数3表示回调函数，可以对它的参数判断是否有错误发生
            fs.appendFile(fileName, 1, (err)=>{
                send(err ? 0 : 1);                
            })
        }
    })
})
app.get('/content', (req, res)=>{
    // 封装一个函数，该函数用来向客户端发送信息
    function send(count){
        res.status(200).send(count + '');
    }
    
    // 用fs模块调用exists()来判断counter.txt是否存在
    // 参数1表示文件名
    // 参数2表示回调函数
    fs.exists(fileName, (exists)=>{
        // 判断exists的值，如果为true，表示文件存在
        if(exists){
            // 文件存在
           
            
            // fs.writeFile(fileName,JSON.stringify(req.query),(err)=>{
               
            //     if(!err){
            //         // var content=JSON.parse(data);
            //         // console.log(content);
            //         send(JSON.stringify(req.query));
            //     }
            // })
             fs.appendFile(fileName, JSON.stringify(req.query), (err)=>{
                send(err ? 0 : JSON.stringify(req.query));                
            })
        }else{
            // else分支表示counter.txt不存在
            // 在这里应该创建这样一个文件
            // 参数1表示创建的文件名
            // 参数2表示写入的数据
            // 参数3表示回调函数，可以对它的参数判断是否有错误发生
            fs.appendFile(fileName, JSON.stringify(req.query), (err)=>{
                send(err ? 0 : JSON.stringify(req.query));                
            })
        }
    })
})
app.listen(3000, ()=>{console.log('server is OK')});