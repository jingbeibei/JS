// server.js
// 服务器入口文件
const express = require('express');
const bodyParser = require('body-parser');
// 这里把连接数据的代码分离出去了(mongoose.js)
// 加载mongoose.js
// mongoose.js和server.js是同一目录,所以用./mongoose
const Student = require('./mongoose');
const template = require('art-template');
        
const app = express();


template.config('cache', false);

app.engine('html', template.__express);
app.set('view engine', 'html');


app.use(express.static('www'));
app.use(bodyParser.urlencoded({extended: true}));

// 把处理请求的接口分散到路由文件中,分别在routes目录中
// 使用路由（模块化）技术将代码分散到多个文件中
// 好处是：
// 1.每个文件中的代码都很少，便于阅读和修改
// 2.将代码分散不同的文件中可以多人同时开发
app.use('/api/student', require('./routes/api/student'));
app.use('/edit', require('./routes/edit'));
app.use('/add', require('./routes/add'));
app.use('/', require('./routes/index'));


app.listen(3000, () => console.log('正在运行...'));