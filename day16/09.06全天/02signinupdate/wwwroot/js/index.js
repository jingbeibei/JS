// index.js

// 输出cookie中username的值
console.log($.cookie('username'));

var username = $.cookie('username');

if(username){
    // empty()：删除匹配的元素集合中所有的子节点。
    $('header').empty();
    $('<h3><span>' + username + '</span><small>退出</small></h3>').appendTo('header');
    $('header small').click(function(){
        $.get('/user/signout', null, function(res){
            if (res.code == 'success') {
                // 跳转到首页
                location.href = '/';
            }
        })
    })
    // 点击"用户名"跳转到user.html
    $('header span').click(function(){
        // 跳转到user.html
        location.href = '/user.html';
    })
}