// ajax-event.js
// 此文件演示了ajax的全局事件

// 把请求的基本信息放入对象ajaxOptions
var ajaxOptions = {
    url:'/api/user/login',
    data:{username:'zhangsan', password:'000000'},
    type:'POST'
};

// 设置每一次请求都使用的参数，即全局设置
// 如果某一次请求的参数设置为了不同的值，则会覆盖全局设置
// 使用全局设置后，每一次发起ajax请求都可少传入参数
$.ajaxSetup(ajaxOptions);

$(document).ajaxStart(function(){
    // 请求开始时弹出一个弹出层
    layer.load(1);
}).ajaxError(function(){
    layer.alert('网络故障，请重试...', {icon: 5}, function(){
        layer.closeAll();
    });
}).ajaxComplete(function(){
    layer.alert('请求成功...', {icon:3}, function(){
        layer.closeAll();
    })
});

// 点击页面上的按钮发起请求
$('button').click(function(e){
    // 判断点击的是哪一个按钮???
    if($(this).data('method') == 'GET'){
        // 发起GET请求
        // 重新设置请求方式为: GET
        $.ajax({type:'GET'});
    }else $.ajax({});
});