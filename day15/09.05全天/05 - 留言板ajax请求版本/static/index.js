// index.js 此文件发起get请求，读取留言内容并显示到页面上

$.get('messages', null, function(arr){
    var messages = '';

    for(var i = arr.length - 1; i > -1; i--){
        var message = arr[i];
        
        // 使用拼字符串的方式生成HTML字符串片段
        messages += '<section>'
        messages += '<p>'
        messages += message.content
        messages += '</p>'
        messages += '<span>'
        messages += formatDateTime(new Date(message.time))
        messages += '</span>'
        messages += '<span>'
        messages += formatIP(message.ip)
        messages += '</span>'
        messages += '</section>'
    }
    
    // 将HTML字符串片段插入到页面上
    document.querySelector('article').innerHTML = messages
}, 'json');

// 格式化日期时间对象
function formatDateTime(t){
    var M = t.getMonth() + 1,
        d = t.getDate(),
        h = t.getHours(),
        m = t.getMinutes()
        
        // js区分大小写！所以可以使用M、m表示两个不同的变量
        
    M = M < 10 ? '0' + M : M
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    
    return t.getFullYear() + '-' + M + '-' + d + ' ' + h + ':' + m;
}

// 格式化IP地址
function formatIP(ip){
    if(ip.startsWith('::1')){
        return '127.0.0.1';
    }
    if(ip.startsWith('::ffff:')){
        return ip.substr(7);
    }
}