// index.js

// 创建一个回调对象
var callbacks = $.Callbacks();

// 添加一个回调函数
// 如果需要使用匿名函数的名字，可以给
// 匿名函数添加名字，加名字之后不会影响它
// 作为匿名函数被使用
// 匿名函数的名字只能在匿名函数内部使用（递归调用）
callbacks.add(function cb(){
    console.log(cb);
    console.log('等一会我会被调用');
});

// console.log(cb)

function sayHello(){
    console.log('等一会说你好！');
}

function sayHi(){
    console.log('nice to meet you!');
}

callbacks.add([sayHello, sayHi]);


// 移除回调函数
// callbacks.remove(sayHi)
// 批量移除回调函数
// callbacks.remove(sayHi, sayHello)
// 清空回调函数对象
callbacks.empty();

// 调用回调函数对象中的所有回调函数
callbacks.fire();


/**************************************/

function add(a, b){
    console.log('%d + %d = %d', a, b, a + b);
}

function multi(a, b){
    console.log('%d * %d = %d', a, b, a * b);
}

var calcs = $.Callbacks();
calcs.add(add, multi);

// 调用回调函数的同时可以传参
calcs.fire(3, 5);


/*********************************** */

function Person(name){
    this.name = name;
    console.log(this.name);
}

Person.prototype = {
    sayHello: function(){
        console.log(this.name + ' 说您好');
    },
    sayHi: function(){
        console.log(this.name + ' say nice to meet you');
    }
}

var person = new Person('ZhangSan');

var cbs = $.Callbacks();
// 要让sayHello，sayHi接收参数的话，要在函数名后面加上()
cbs.add(person.sayHello(), person.sayHi());

console.log(cbs.has(person.sayHello()));
console.log(cbs.has(sayHello));
console.log(callbacks.has());
console.log(cbs.has());

/******************************* */

// cbs.lock();
cbs.add(sayHello);
console.log('是否有sayHello:' + cbs.has(sayHello));
cbs.fire();