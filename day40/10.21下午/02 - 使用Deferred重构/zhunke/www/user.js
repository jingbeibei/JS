// App Framework页面框架加载完成后
$.afui.ready(function () {

    var clicked = false;

    $('#signin a').click(function () {
        var username = $('#signin input[name=username]').val()
        var password = $('#signin input[name=password]').val()

        if (username.trim().length == 0 || password.trim().length == 0) {
            $.afui.toast({
                message: '请填写用户名和密码！',
                position: 'bc',
                type: 'error'
            })
            return
        }

        if (clicked) return
        clicked = true

        // 因为下面Ajax请求的回调函数中不使用此this
        // 所以使用一个变量来代替this
        var a = $(this)
        a.removeClass('orange').addClass('gray')

        var data = $('#signin form').serialize()

        $.afui.showMask('正在登录...', 15 * 1000)
        // 发起post请求
        // done() fail() always()都是$deferred方法
        $.post('/api/user/signin', data)
        .done(function(res){
            var option = {
                message: res.message,
                position: 'tc',
                type: 'success'
            }

            if(res.code != 'success'){
                option.position = 'bc'
                option.type = 'error'
            }

            $.afui.toast(option)
        })
        .fail(function(ajax, status, message){
            // console.log(arguments)
            $.afui.toast({
                message: '网络故障，请稍候再试！',
                position: 'bc',
                type: 'error'
            })
        })
        .always(function(){
            clicked = false
            a.removeClass('gray').addClass('orange')
            $.afui.hideMask()
        })
    })
})