// student.js

function Student(name, isMale, birthDate){
    Child.call(this, name, isMale, birthDate);
}

Student.prototype = Object.create(Child.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function(course, hours){
    console.log(this.name + '学习' + course + hours + '个小时');
}