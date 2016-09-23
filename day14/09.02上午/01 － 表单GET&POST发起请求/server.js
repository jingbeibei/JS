// server.js

// nodejs服务器

// 加载nodejs自带的http模块再赋给变量 http
var http = require('http');

// 用http调用 createServer()来创建一个服务器
http.createServer(function(request, response){
   response.end('hello world!'); 
}).listen(3000, function(){console.log('server is OK')});
