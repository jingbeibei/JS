// add.js

// 提交表单数据,向服务器发送post请求
$('form').submit(function(ev){
    ev.preventDefault();
    
    $.post(
        $(this).attr('action'),
        // 序列化表单数据
        $(this).serialize(),
        function(res){
            if(res.code == 'success'){
                location.href = '/';
            }
            else{
                alert(res.message);
            }
        }
    )
})