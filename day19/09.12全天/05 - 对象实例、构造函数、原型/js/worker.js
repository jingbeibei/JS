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
// Worker.prototype.study = function(course, hours){
//     console.log('我是重写的方法');
// }

Worker.prototype.study = function(game, hours){
    console.log(this.name + '原型链上play方法调用之前');
    // 调用原型链上的play方法
    Child.prototype.play.call(this, game, hours);
    console.log('调用原型链上的play方法后');
}