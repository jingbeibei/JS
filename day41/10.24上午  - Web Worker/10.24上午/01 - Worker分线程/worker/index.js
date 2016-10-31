var i = 1;
setInterval(function() {
    document.body.innerText = i++;
}, 1000);

// 不能在主线程使用这么笨的方法计算斐波数，会导致页面卡死
// function fibo(n){
//     if(n < 1) return 0
//     if(n <= 2) return 1
    
//     return fibo(n - 1) + fibo(n - 2)
// }
// alert(fibo(53))

// 实例化Worker对象并传入要执行的JavaScript文件名
var w = new Worker('worker.js');

// 通过message事件与页面进行通信
w.onmessage = function(ev) {
    // 
    alert(ev.data);
}

// 使用postMessage()方法给w传递消息
// 消息内容是任何能被序列化的值
w.postMessage(48)