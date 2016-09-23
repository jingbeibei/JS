// server.js

// 在nodejs中使用express框架，默认的是ejs和jade渲染模板
const express = require('express');
// 使用npm安装NodeJS版artTemplate
// npm install art-template --save
const template = require('art-template');

var app = express();

// template.config('cache', false)更改引擎的默认配置
// 是否开启缓存，false表示禁用模板缓存，修改模板立即生效
// 在正式产品中不要禁用，仅在开发时可以使用
// 在产品上线时下面这句话去掉
template.config('cache', false);

// app.engine(ext, callback)方法用于创建一个模板引擎
// .html是文件的扩展名,表示要渲染的文件
app.engine('.html', template.__express);

// 注册模块引擎
app.set('view engine', 'html');

// 
app.get('/', (req, res)=>{
    // 数据
    var html = template('template', {
        title: '服务端模板数据',
        books: [
            {
                name: '重构－改善既有代码的设计'
            },
            {
                name: '大话设计模式'
            }
        ]
    });
    res.end(html);
});

app.get('engine', (req, res)=>{
    // 渲染模板
    res.render('template', {
        title: '服务端模板数据',
        books: [
            {
                name: '重构=改善既有代码的设计'
            },
            {
                name: '大话设计模式'
            }
        ]
    })
});

// 
app.listen(3000, ()=>{console.log('server is running...')});