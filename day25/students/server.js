// server.js

const express = require('express');
const bodyParser = require('body-parser');
// 加载mongoose组件,用它连接mongoDB
// npm install mongoose --save
const mongoose = require('mongoose');
// 加载服务端art-template组件
// npm install art-template --save
const template = require('art-template');
        
const app = express();

template.config('cache', false);
// 指定使用art-template模板引擎来渲染html文件
app.engine('html', template.__express);
app.set('view engine', 'html');


app.use(express.static('www'));
// 处理post请求中对url编码的数据
app.use(bodyParser.urlencoded({extended: true}));

// 连接数据库
// mongodb:// 表示连接数据库使用的协议
mongoose.connect('mongodb://192.168.204.16/zhongbei-students');
// 获取当前数据库连接
const db = mongoose.connection;

// 监听数据库连接事件
// 数据库连接失败的提示
db.on('error', err => console.error('数据库连接失败：', err));
// 数据库连接成功的提示
db.on('open', () => console.log('成功打开数据库'));

// mongoose.model()创建一个数据模型（类或构造函数）
// mongoose为MongoDB增加了很多很强大的功能
// 大部分功能以model为基础
// 第1个参数：模型的名称，也是数据库中集合的名称
// 第2个参数：Schema，模式，描述了数据的形状，即
// 数据中有哪些属性，属性的类型，属性的默认值，属性的验证等
const Student = mongoose.model('students', {
    name: String, // 姓名
    age: Number, // 年龄
    isMale: Boolean, // 性别
    phone: String, // 电话
    email: String, // email
    description: String, // 描述
    ip: String, // ip
    createTime: Date, // 创建时间
    updateTime: Date // 修改时间
});

// 创建一个模型的实例，模型实例中存放是数据
// 模型提供了数据的增、删、改、查等方法
// const student = new Student({
//     name: '张强',
//     age: 29,
//     isMale: true,
//     phone: '13803845875',
//     email: 'zhangqiang@zhiyou100.com'
// });

// // 保存数据
// student.save(err => {
//     if(err){
//         console.error('保存数据错误：', err)
//     }
//     else{
//         console.log('保存成功！')
//     }
// })

// 处理添加学生信息的接口
app.post('/api/student/add', (req, res) => {
    // 记录ip
    req.body.ip = req.ip;
    // 记录创建时间
    req.body.createTime = new Date();
    // 记录更新时间
    req.body.updateTime = req.body.createTime;
    
    console.log(req.body);
    // 创建一个模型的实例用来保存学生信息
    new Student(req.body).save(err => {
        if(err){
            res.json({code: 'error', message: '系统错误'});
        }
        else{
            res.json({code: 'success', message: '成功！'});
        }
    });
});

// 更新学生信息的接口
app.post('/api/student/edit/:id', (req, res) => {
    req.body.ip = req.ip;
    req.body.updateTime = new Date();
    
    console.log(req.body);
    // 通过id找到要修改的学生信息
    Student.findByIdAndUpdate(req.params.id, req.body, err => {
        if(err){
            res.json({code: 'error', message: '系统错误'});
        }
        else{
            res.json({code: 'success', message: '成功！'});
        }
    })
})

// 显示学生信息的接口
// 查询数据库并把查询到的信息显示到页面上
app.get('/', (req, res) => {
    // select对数据属性进行筛选，属性名之间用空格分隔
    // 查找"name isMale age phone email"字段
    Student.find().select('name isMale age phone email').exec((err, data) => {
        
        if(err){
            //如果发生错误跳转到错误页,这里没写
        }
        else{
            // data是一个model数组
            // model.toObject()可以将数据从模型实例中剥离出来
            // console.dir(data)
            console.dir(data.map(m => m.toObject()));
            
            // 渲染index.html页面
            res.render('index', {students: data.map(m => {
                m = m.toObject();
                m.id = m._id.toString();
                delete m._id;
                return m;
            })});
        }
    })
})

// 删除学生信息的接口
app.post('/api/student/remove/:id', (req, res) => {
    // 通过id找到要删除的学生信息
    Student.findByIdAndRemove(req.params.id, err => {
        if(err){
            res.json({code: 'error', message: '系统错误'});
        }
        else{
            res.json({code: 'success', message: '成功！'});
        }
    })
})

// 修改学生信息的接口
app.get('/edit/:id', (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if(err){
            //跳转到错误页
        }
        else{
            var student = data.toObject();
            student.id = student._id.toString();
            delete student._id;
            // 渲染edit.html页面
            res.render('edit', {student});
        }
    })
})

app.listen(3000, () => console.log('正在运行...'));