// folder.js

const express = require('express');
const fs = require('fs');

// 创建一个路由
// 将发送到特定url的请求转交给指定的函数去处理
const route = express.Router();
// route.post('/add/:foldername'):截取POST请求方式中的url中含有'/add/:foldername'的请求
// :foldername是点位标识符
route.post('/add/:foldername', (req, res)=>{
    // 获取输入的文件夹名
    // 与点位标识符(:foldername)相关的值可以被req.params获取
    console.log(req.params.foldername)
    var foldername = req.params.foldername;
    // 用模板字符串保存到变量path中
    var path = `data/${foldername}`;
    // 判断文件是否存在
    fs.exists(path, (exists)=>{
        if(exists){
            res.json({code: 'fail', message:'文件夹已经存在！'});
        }else{
            fs.mkdir(path, (err)=>{
                if(err){
                    res.json({code: 'error', message: '系统错误!'});
                }else res.json({code: 'success', message: '成功!!!'});
            })
        }
    })
});

// 导出route
module.exports = route;

// node.js中，每一个js文件都有独立的作用域,相互之间不会干扰，
// 也看不到其它js文件中全局变量及函数，所以无法直接调用其它js文件中定义的函数！
// 全局作用域是隔离的,模块相互调用只能使用模块导入require和模块导出exports机制