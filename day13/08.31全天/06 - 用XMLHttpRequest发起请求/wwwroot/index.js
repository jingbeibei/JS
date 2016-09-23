// index.js
// 用该文件发起一个GET请求

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
xhr.open('GET', '/comment?nickname=hahahaha&password=123456&detail=中北大学');
// 发起请求
xhr.send();
