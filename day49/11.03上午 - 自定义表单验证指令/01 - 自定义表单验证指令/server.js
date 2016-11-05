// index.js

const express = require('express');
const app = express();

app.use(express.static('www'));

app.get('/api/user/(:name)?', (req, res) => {
    setTimeout(function() {
        if(req.params.name == '中北'){
            res.json({code: 'fail', message: '用户已经注册！'})
        }
        else{
            res.json({code: 'success', message: '通过验证可以注册！'})
        }
    }, 1000);
});

app.listen(3000, err => console.log('正在运行...'));