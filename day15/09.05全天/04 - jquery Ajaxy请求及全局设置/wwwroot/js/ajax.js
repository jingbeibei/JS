// ajax.js 
// 此文件演示了更基础的ajax发起请求的方法，它的功能更强大，但是设置的参数更多

// 1
// $.ajax({
//     type:"POST",
//     url:'/api/user/login',
//     data:"username=baobao&pwd=000000",
//     success:function(data, textStatus, jqXHR){
//         alert(data.message);
//         console.log(textStatus);
//         alert(jqXHR.getResponseHeader('Y-School'));
//     }
// });

// 2 jquery ajax请求
// 可以设定更多的参数
layer.load(2, {shade:0.5});
// 发起ajax请求
$.ajax({
    beforeSend:function(xhr){
        alert('发起请求之前调用');
    },
    data:{name:'zhangSan', password:'111111'},
    dataType:'json',
    error:function(xhr, status, err){
        if(err){
            layer.alert('不好意思，网络超时，明天再来吧', {icon:5},
            function(){
                layer.closeAll();
            })
        }
    },
    // 自定义请求头
    headers: {'Y-Student-Name':'wang'},
    // 请求成功
    success: function(data, status, xhr){
        alert(data.message);
        alert(xhr.getResponseHeader('Y-School'));
        layer.closeAll();
    },
    // 请求的url
    url:'/api/user/login',
    type:'POST',
    timeout:10*1000,
    // 是否允许使用缓存
    // 如果使用缓存，则有可能不发起请求，直接使用上次对同一个url请求时获得的数据
    cache:false
});