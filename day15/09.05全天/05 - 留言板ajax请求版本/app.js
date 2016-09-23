const   exp = require('express'),
        bodyParser = require('body-parser'),
        fs = require('fs'),
        multer = require('multer');
const app = exp();
const multipart = multer();
        
// 用来创建对象的方法如上面的exp()/multer(),可以称为工厂方法
        
// const是声明一个常量的关键字，一旦声明其值就不能改变
// 所以通常声明时即会赋值;如果声明时不赋值，将永远等于undefined

// 如果一常量指向一个对象，那么这个常量将不能指向其它值或对象
// 但是对象内部的属性值可以变化

// 如果不希望对象内部发生变化，需要将它freeze
// Object.freeze(obj)

app.use(exp.static('static'))
app.use(bodyParser.urlencoded({extended:true}))

app.post('/add', multipart.array(), (req, res) => { 
    // 防止XSS攻击
    // 攻击方法：提交留言 <iframe src="xss.html"></iframe>
    var content = req.body.content
    // content = content.replace('<', '&lt;')
    // content = content.replace('>', '&gt;')
    // 上面的写法只能替换第一个字符，不能替换所有的字符
    content = content.replace(/</g, '&lt;')
    content = content.replace(/>/g, '&gt;')
    // replace的第1个参数/</g 是正则表达式
    // 其中g表示全局匹配，即匹配文本中所有符合条件的字符串
    
    var message = {
        content:content,
        time: new Date(),
        ip: req.ip
    }
    
    // 异步判断文件是否存在
    fs.exists('data', exists =>{
        if(!exists){
            // 如果文件不存在，则同步创建文件
            // 即文件创建成功后才继续执行后续代码
            fs.mkdirSync('data')
        }
        
        // 多加1个【,】方便读取时拼成数组JSON字符串
        fs.appendFile('data/message.txt', JSON.stringify(message) + ',', error => {
            if(error){
                console.error('保存文件时发生错误：%s', error)
            }
        })
        
        // 测试文件是否能够删除
        // setTimeout(() => fs.unlink('data/message.txt'), 10 * 1000)
    })
    // 文件后缀名决定操作系统用什么图标显示文件
    // 决定操作系统用什么程序打开文件
    // appendFile可以将数据附加到文件的末尾，
    // 如果文件不存在，它会自动创建文件
    
    // 判断文件或文件夹是否存在 fs.exists
    // 创建文件夹 fs.mkdir
    // 删除文件 fs.unlink
    // 删除文件夹 fs.rmdir  必须是空文件夹才能删除
    // 读取文件 fs.readFile
    // 重命名文件 fs.rename
    
    res.status(200).json({ message: '感谢您的留言！'});
})

app.get('/messages', (req, res) => {
    fs.exists('data/message.txt', (exists) => {
        if(exists){
            fs.readFile('data/message.txt', (error, data) => {
                if(!error){
                    // 拼成数组JSON字符串，方便浏览器端解析
                    var result = '[' + data;
                    result = result.substr(0, result.length - 1);
                    result = result + ']';
                    console.log(result);
                    res.status(200).send(result);
                }
            })
        }
        else res.status(200).send('[]');
    })
})

app.listen(3000, () => console.log('Server Running..'));