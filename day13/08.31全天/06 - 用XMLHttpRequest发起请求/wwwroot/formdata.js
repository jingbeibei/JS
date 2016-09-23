// formdata.js

var data = new FormData();

// 利用append()函数添加一些键值对来模拟表单数据
data.append('nickname', 'blackmask');
data.append('pwd', '000000');
data.append('content', '我的银行卡密码是000000，你觉得可能吗???');

var xhr = new XMLHttpRequest();

xhr.open('POST', '/comment');
xhr.send(data);