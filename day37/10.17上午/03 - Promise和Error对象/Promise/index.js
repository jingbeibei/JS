// 创建Promise对象的步骤：
// 1、调用new Promise()构建函数，并转入一个函数（作用域）
// 2、在函数作用域中开启一个异步任务（此时为Pending状态）
// 3、异步任务成功或失败时切换Promise对象的状态
//     切换状态的方法是调用resolve或reject函数
//     resolve或reject函数是通过参数注入函数作用域内部的

// var p = new Promise(function(resolve, reject){
//     // 执行一个异步任务
//     // 此时Promise处于pending状态

//     if(任务成功){
//         // 切换Promise为成功状态（resolved）
//         resolve(data)
//     }
//     else{
//         // 切换Promise为失败状态（rejected）
//         reject(error)
//     }
// })


var p = new Promise(function(resolve, reject){
    var img = new Image();
    // Image对象可以在内存中预加载一个图片
    // 加载后在页面上使用这个图片就不需要通过网络下载了
    // 所以显示速度会比较快
    // Image对象相当于document.createElement('img')
    // 图片预加载成功后可以得到图片的宽度和高度信息

    img.onload = function(){
        resolve(img)
    }
    img.onerror = function(){
        reject(new Error('图片加载失败！'))
    }

    img.src = 'http://www.nuc.edu.cn/_m/images/logo.gif'
})

// 使用Promise包装一个异步任务后，可以在任何时候
// 通过then方法获取任务的执行结果（不管是成功还是失败）
p.then(function(img){
    console.log(img);
}, function(err){
    console.log(err);
});