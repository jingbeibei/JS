// signin.js 提交用户登录的信息

$('form').submit(function(e){
    // 阻止表单的自动提交
    e.preventDefault();
    
    // serialize()序列化表单数据
    // 例如：用户名:hao123 密码:000000
    // 序列化以后：username=hao123&password=000000
    var data = $(this).serialize();
    console.log(data);
    // 发起请求，提交数据
    $.post('/user/signin', data, function(res){
        // 如果登录成功跳转到首页
        if(res.code == 'success'){
            // 登录成功，显示登录成功的消息
            alert(res.message);
            location.href = '/';
        }else alert(res.message);
    })
})