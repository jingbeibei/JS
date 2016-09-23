// register.js

// 用于提交用户的注册信息

// 
$('form').submit(function(e){
    e.preventDefault();
    
    // 找到form里的密码框
    var pass = $(':password').map(function(){
        // 返回密码框的内容
        return $(this).val();
    });
    console.log(pass);
    // 判断两次输入的密码是否相同
    if(pass[0] == pass[1]){
        console.log('两次输入的密码一致，准备提交数据');
        // 序列化表单内容
        var data = $(this).serialize();
        console.log(data);
        
        $.post('/user/register', data, function(res){
            if(res.code == 'success'){
                // 注册成功后跳转到首页
                location.href = 'index.html';
            }
        })
    }else alert('两次输入的密码不一致，请重新输入');
})