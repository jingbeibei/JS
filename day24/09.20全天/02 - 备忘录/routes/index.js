// index.js

const express = require('express');
const fs = require('fs');

// 创建express的路由功能
// 路由:类似于java中的拦截器功能,在请求到过后台之前,先在这里处理
const route = express.Router();

// route.get('/'):截取GET请求方式中的url中含有'/'的请求
route.get('/', (req, res)=>{
    // 读取data目录
    fs.readdir('data', (err, files)=>{
        // item:数组元素
        // i:数组索引
        // arr:数组本身
        var folders = files.map((item, i, arr) => {
            console.log({name: item, count: i});
            // 把读取到的文件夹以对象的方式返回
            // 例如: {name: '大四备忘录', count: 1}
            return {name: item, count: i};
        });
        
        // res.render的功能是调用模板引擎,并将其生产的页面直接返回给客户端
        // 参数1是模板名称,即views目录下的模板文件名,不包含扩展名
        // 参数2是传递给模板的数据,用于模板翻译
        res.render('index', {folders});
    })
});

// 导出route
module.exports = route;