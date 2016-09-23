// post.js

// 该文件用于向服务器发起一个POST请求

// 创建一个XMLHttpRquest对象 
var xhr = new XMLHttpRequest();

// onreadystatechange是一个事件
// 当请求状态的值发生变化时会触发该 事件
xhr.onreadystatechange = function() {
    switch(xhr.readyState){
        case 0:
            console.log('未打开');
            break;
        case 1:
            console.log('连接已经建立');
            break;
        case 2:
            console.log('请求已经被接收，获取到响应头');
            break;
        case 3:
            console.log('正在下载响应体');
            break;
        case 4:
            console.log('请求已经完成');
            // xhr.status表示返回的状态码
            // 200 表示成功
            // 404 表示未找到
            console.log("状态码：" + xhr.status);
            // 
            console.log("状态描述：" + xhr.statusText);
            // 
            console.log("响应类型：" + xhr.responseType);
            // 
            console.log("响应文本：" + xhr.responseText);
            // 
            console.log("响应头：" + xhr.getResponseHeader);
            break;
         default:
           break;
    }
}

// 用open方法初始化一个请求
xhr.open('POST', '/comment');

//**********************************************************************
// 讲课时没有设置请求头，导致后台没有解析到数据，需要同学们注意
// 如果向服务端发送的数据是urlencoded,需要设置Content-Type为application/x-www-form-urlencoded
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//**********************************************************************

// 发起请求
xhr.send('nickname=hahahaha&password=123456&detail=中北大学');