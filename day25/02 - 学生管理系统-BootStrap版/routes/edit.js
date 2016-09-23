const   express = require('express'),
        // ../表示加载上一层目录下的mongoose.js
        Student = require('../mongoose')

const route = express.Router()


route.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if(err){
            //跳转到错误页
        }
        else{
            var student = data.toObject()
            student.id = student._id.toString()
            delete student._id
            
            res.render('edit', {student})
        }
    })
})


module.exports = route