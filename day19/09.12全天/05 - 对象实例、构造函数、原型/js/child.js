// child.js

function Child(name, isMale, birthDate){
    // call()可以调用一个对象的一个方法，以另外一个对象替换当前对象
    // 在子构造函数中，可以通过调用父构造的call方法实现继承
    Baby.call(this, name, isMale, birthDate);

}

// Object.create()可以通过提供的原型创建一个对象
Child.prototype = Object.create(Baby.prototype);
// Child的原型对象有一个costructor属性，它指向该原型对象对应的构函数
Child.prototype.constructor = Child;

// 向Child的原型中添加一个方法
Child.prototype.play = function(game, hours){
    console.log(this.name + '玩' + game + hours + '小时');
}