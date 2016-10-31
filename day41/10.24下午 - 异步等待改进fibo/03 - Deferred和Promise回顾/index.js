// index.js

// 创建Deferred(延迟)对象
// var d = $.Deferred();

// setTimeout(function() {
//     // resolve()函数用于解决Deferred(延迟)对象
//     d.resolve('2000ms时间到')
// }, 2000);

// done()：当延迟成功时调用一个函数
// 当延迟对象被resolved时，任何通过deferred.then或deferred.done添加的doneCallbacks都会被调用
// d.done(function(data){
//     alert(data);
// });
// Deferred对象中什么也没有，它的状态是在外面改变的
///////////////////////////////////////////////

// var p = new Promise(function(resolve, reject){
//     setTimeout(function() {
//         // 
//         resolve('2000ms时间到');
//     }, 2000);
// });

// p.then(function(data){
//     alert(data);
// });
// Promise对象需要传入一个函数，它的状态是在内部改变的
///////////////////////////////////////////////

// Deferred也可以写成类似Promise的方式
// var d = $.Deferred(function(de){
//     setTimeout(function() {
//         de.resolve('2000毫秒时间到');
//     }, 2000);
// });

// d.done(function(data){
//     alert(data);
// });
///////////////////////////////////////////////

function getTimer(ms){
    return $.Deferred(function(de){
        setTimeout(function() {
            de.resolve(ms + 'ms时间到啦');
        }, ms);
    });
}

var t1 = getTimer(2000);
var t2 = getTimer(10000);
// 
$.when(t1, t2).done(function(t1, t2){
    alert(t1);
    alert(t2);
});