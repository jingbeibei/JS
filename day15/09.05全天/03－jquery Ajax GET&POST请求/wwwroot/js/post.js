// post.js 此文件用来向服务器发送post请求

// 1 原生方法发起POST请求
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function(){
//     if(xhr.readyState == 4){
//         var res = JSON.parse(xhr.responseText);
//         alert(res.message);
//         // 获得指定响应头的内容
//         alert(xhr.getResponseHeader('Y-School'));
//     }
// };
// xhr.open('POST', '/api/user/login');
// xhr.send('username=baobao&password=123123');

// 2 jquery post请求
$.post('/api/user/login',
{username:'lalala', pwd:'090909'},
function(res, statusText, jqXHR) {
    alert(res.message);
    alert(statusText);
    console.log(jqXHR);
    alert(jqXHR.getResponseHeader('Y-School'));
}
)

