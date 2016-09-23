// server.js

const express = require('express');
// npm install art-template --save
const template = require('art-template');

var app = express();

// 模板默认是缓存的,开发时修改模板不会立即生效
// 所以开发通常将缓存关闭,产品上线时删除下面1行代码
template.config('cache', false);

// 创建一个模板引擎
// 使用template.__express处理html后缀名的视图
// 即指定了html文件的模板解析引擎
app.engine('html', template.__express);

// 指定默认的视图文件是.html文件
// 即res.render('index')省略的后缀名是.html
app.set('view engine', 'html');

// 使用路由处理以/api/folder开头的请求
// 路由在./routes/api/folder.js模块中定义
app.use('/api/folder', require('./routes/api/folder'));
// 使用路由处理/开头的请求
// 路由在./routes/index.js模块中定义
app.use('/', require('./routes/index'));

// express.static实际上也是一个路由
// 当wwwroot中有index.html时,静态文件会先处理请求,导致后面的app.use('/')无效
// 解决方法是:
// 1. 将index.html的名字改掉
// 2. 将处理静态文件的路由写在后面
app.use(express.static('wwwroot'));

// 监听
app.listen(3000, ()=>{console.log('正在运行...')});