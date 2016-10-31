// index.js

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.post('/api/user/signin', (req, res) => {
    console.log(req.body)

    setTimeout(function() {
        if(req.body.username.trim().length > 0 && req.body.password == '123456'){
            res.json({code: 'success', message: '登录成功！'})
        }
        else{
            res.json({code: 'fail', message: '登录失败！'})
        }
    }, 1000)
})

app.listen(3000, err => console.log('正在运行...'))
