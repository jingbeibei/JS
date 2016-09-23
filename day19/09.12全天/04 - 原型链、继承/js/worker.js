// worker.js

function Worker(name, isMale, birthDate){
    Student.call(this, name, isMale, birthDate);
}

Worker.prototype = Object.create(Student.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.work = function(task, hours){
    console.log(this.name + task + hours + '个小时');
}

// 重写study方法
Worker.prototype.study = function(course, hours){
    console.log('我重写的方法');
}