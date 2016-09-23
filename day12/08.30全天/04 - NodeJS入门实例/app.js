var http = require('http');

// request请求对象:包含客户端请求信息
// response响应对象：服务器端的响应信息
// 用listen()添加一个监听，里面是监听的端口号
// 
http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.end('learnning nodejs');
}).listen(3000);

console.log('......');