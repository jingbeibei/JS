function fibo(n){
    if(n < 1) return 0
    if(n <= 2) return 1
    
    return fibo(n - 1) + fibo(n - 2)
}

// 在worker内部接收消息
onmessage = function(ev) {
    // console.dir(ev.data)
    var result = fibo(ev.data)

    // 将数据发送给主线程
    postMessage(result)
}