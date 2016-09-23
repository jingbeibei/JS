// index.js

// 此文件用来发起GET请求

// 1 原生方法发起GET请求
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//     if(xhr.readyState == 4){
//         var res = JSON.parse(xhr.responseText);
//         alert(res.message);
//     }
// };

// xhr.open('GET', '/api/user/login?usuername=baobao&password=000000');
// xhr.send();

// 2 jquery GET请求
$.get('/api/user/login',
{username:'baobao', password:'123456'},
function(res){
    alert(res.message);
});