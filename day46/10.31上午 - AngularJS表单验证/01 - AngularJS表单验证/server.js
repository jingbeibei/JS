const   express = require('express'),
        fs = require('fs'),
        bodyParser = require('body-parser')

const app = express();

app.use(express.static('www'));

// Backbone中默认请求数据编码格式是JSON格式而不
// 我们之前经常使用的urlencoded格式
// application/x-www-form-urlencoded
// name1=value1&name2=value2&name3=value3...

// application/json
// {
//     "name1":"value1",
//     "name2":"value2"
// }

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/card/:id', (req, res) => {
    var fileName = `${req.params.id}.txt`
    fs.readFile(fileName, (err, data) => {
        if(err){
            res.json({code: 'error', message: '数据不存在！'})
        }
        else{
            // 使用send()方法end()方法向浏览器返回数据时
            // 不会附带Content-Type响应头，在某些要求严格的
            // 客户端或框架中会无法处理响应，这时需要使用
            // res.set()设置响应头
            // res.set('Content-Type', 'application/json')
            // res.end(data)

            // 为了保持接口的一致性，应该写成下面的形式
            // 这时需要在Backbone的模型中对数据进行parse
            // 而上面的写法直接返回数据不能用parse转换

            res.json({
                code: 'success',
                message: '成功！',
                data: JSON.parse(data)
            })
        }
    })
})

app.put('/api/card/:id', (req, res) => {
    console.log(req.body)
    fs.writeFile(`${req.params.id}.txt`, JSON.stringify(req.body), err => {
        if(err){
            console.error('保存文件错误', err)
            res.json({code: 'error', message: '保存文件错误'})
        }
        else{
            res.json({code: 'success', message: '成功！'})
        }
    })
})

app.listen(3000, err => console.log('正在运行...'));