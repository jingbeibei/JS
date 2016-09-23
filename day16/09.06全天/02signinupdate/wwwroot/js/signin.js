// signin.js
// 提交用户的注册信息

$('form').submit(function(e){
    console.log('signin')
    // 阻止表单自动提交
    e.preventDefault();
    // 序列化表单数据
    var data = $(this).serialize();
    console.log(data);
    $.post('/user/signin', data, function(res){console.log('193741983741')
        if(res.code == 'success'){console.log('***')
            location.href = '/';
        }else alert(res.message);
    });
})