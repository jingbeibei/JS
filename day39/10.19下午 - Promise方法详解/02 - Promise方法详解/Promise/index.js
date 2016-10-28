// index.js

// 创建Promise对象的步骤：
// 1 调用new Promise()构造函数并传入一个函数(作用域)
// 2 在函数作用域中开启一个异步任务(此时为pending状态)
// 3 异步任务成功或失败时切换Promise对象的状态
//   切换状态的方法是调用resolve或reject函数
//   resolve或reject函数是通过参数注入函数作用域内部的

// var p = new Promise(function(resolve, reject){
//     // 此处执行一个异步任务
//     // 此时Promise处于pending状态

//     if(任务成功){
//         // 切换Promise为成功状态(resolved)
//         resolve(data);
//     }else{
//         // 切换Promise为失败状态(rejected)
//         reject(error);
//     }
// });

var p = new Promise(function(resolve, reject){
    // Image对象可以在内存中预加载一个图片
    // 加载后在页面上使用这个图片就需要通过网络下载了，所以显示速度会比较快
    // Image对象相当于document.createElement('img')
    // 图片预加载成功后可以得到图片的宽度和高度信息
    var img = new Image();

    img.onload = function(){
        resolve(img);
    }
    img.onerror = function(){
        reject(new Error('图片加载失败'));
    }

    img.src = 'http://www.zhiyou100.com/img/logo.png';
});

// 使用Promise包装一个异步任务后
// 可以在任何时候、任何地方通过then方法获取任务的执行结果(不管是成功或失败)
p.then(function(img){
    console.log(img);
}, function(err){
    console.log(err);
});

// 此处省略若干行代码

p.then(function(img){
    console.log(img);
}, function(err){
    console.log(err);
});

// 此处省略若干行代码

p.then(function(img){
    console.log(img);
}, function(err){
    console.log(err);
});

// Promise附带的效果是可以对异步任务的结果进行缓存
// 无论异步任务是成功还是失败，都会缓存数据
// 成功时缓存的是成功的数据，失败时缓存的是错误信息

// 加分隔线起不到正确的分隔效果，因为then的回调函数在Promise状态变成resolved的时候才调用
console.log('-'.repeat(30));

// 当对then进行链式调用时，then返回的是一个新的Promise对象，而不是原来的Promise对象
// 这个特性可以用来对异步任务的结果进行加工，将异步任务的结果转换成新数据
// 相似的知识点：
var arr = [1, 2, 3];
var arr1 = arr.map(i => i * 2).map(i => i + 1);
console.log(arr1);

// 类似：express请求处理管道
// app.get('url', H1, H2, H3, (req, res)=>{

// })

p.then(function(img){
    console.log(img);

    return {
        src: img.src,
        width: img.width,
        height: img.height
    }
}, function(err){
    console.log(err);
    return err;
}).then(function(img){
    console.log(img);

    img.area = img.width * img.height;
    return img;
}, function(err){
    console.log(err);
    return err;
}).then(function(img){
    console.log(img);
}, function(err){
    console.log(err);
});

// then方法的变种：
// p.catch(function(){});
// 相当于
// p.then(null, function(){});
// 好处是：语义上更加清晰，then只用来处理成功时的情况，catch只用来处理失败时的情况
// p.then(success).catch(fail);

// 不管是成功还是失败都会调用[同一个]回调函数，通常是要执行一个清理动作
// 比如：关闭loading提示图，关闭某种服务(服务连接、http服务等)，删除之前的数据，对界面进行复原
// 此时一般不关心异步任务的执行结果
// p.then(success).catch(fail).finally(clean);

// Promise会在内部捕获异步任务的失败状态，供then方法的第2个回调函数使用
// 或catch方法的回调函数使用。
// 如果不希望自己处理失败的情况，也就是不写then的第2个回调函数也不catch
// 在这种情况下失败状态将会变成未处理的错误！
// 并且Promise会将此错误抛出，Chrome会立即抛出，FireFox会等待一段时间

// 如果不希望失败状态沉默，而是抛出错误并让外部错误处理机制捕获错误，可以使用done方法
// p.done(success)

// 注意：finally方法和done方法不是ES6提供的标准方法
// 如果需要使用，则应自己扩展这两个方法，具体代码请参考：
// http://es6.ruanyifeng.com/#docs/promise

// p.then(function(){
//     console.log('图片加载成功');
// }).catch(function(){
//     console.log('是否会立即出现错误提示???');
// });

// alert(1);