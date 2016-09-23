// index.js

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4){
        // JSON.parse()：把字符串转换为JSON格式的数据
        var arr = JSON.parse(xhr.responseText);
        console.log(arr);
        var messages = '';
        // 反向遍历数组，为了让最新的留言显示到上面
        for(var i = arr.length - 1; i > -1; i--){
            var message = arr[i];
            // 使用拼字符串的方法向页面添加留言
            messages += '<section>';
            messages += '<p>';
            messages += message.content;
            messages += '</p>';
            messages += '<span>';
            messages += formatDateTime(new Date(message.time));
            messages += '</span>';
            messages += '<span>';
            messages += formatIP(message.ip);
            messages += '</span>';
            messages += '</section>';
        }
        // 
        document.querySelector('article').innerHTML = messages;
    }
}

xhr.open('GET', '/messages');
xhr.send();

// 处理日期、时间格式
function formatDateTime(t) {
    // js区分大小写, M和m会认为是两个变量
    var M = t.getMonth() + 1;
    var d = t.getDate();
    var h = t.getHours();
    var m = t.getMinutes();
    
    M = M < 10 ? ('0' + M) : M;
    d = d < 10 ? ('0' + d) : d;
    h = h < 10 ? ('0' + h) : h;
    m = m < 10 ? ('0' + m) : m;
    
    return t.getFullYear() + '-' + M + '-' + d + '&nbsp;&nbsp;' + h + ':' + m + '&nbsp;&nbsp;&nbsp;&nbsp;';
}

// 处理ip地址
function formatIP(ip){
    if(ip.startsWith('::1')){
        return '127.0.0.1';
    }
    if(ip.startsWith('::ffff:')){
        return ip.substr(7);
    }
}