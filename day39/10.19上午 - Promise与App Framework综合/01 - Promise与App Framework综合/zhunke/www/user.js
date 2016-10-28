// user.js

Promise.prototype.finally = function (callback) {
  return this.then(
    value  => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => { throw reason; })
  );
}

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
            });
            return;
        }

        if (clicked) return;
        clicked = true;

        // 因为下面Ajax请求的回调函数中不使用此this,所以使用一个变量来代替this
        var a = $(this);
        a.removeClass('orange').addClass('gray');

        var data = $('#signin form').serialize();

        $.afui.showMask('正在登录...', 15 * 1000);

        // 使用Promise可以将异步任务与业务代码分离开，使代码更清晰，减少代码重复。
        // Promise对象内部只需要关注什么时候resolve，什么时候reject就可以了
        // Promise对象外部只需关注成功时怎么处理，不成功怎么处理，最后怎么清理即可
        var p = new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/user/signin',
                data: data,
                type: 'POST',
                dataType: 'JSON',
                success: function(res){
                    if(res.code == 'success'){
                        resolve(res);
                    }
                    else{
                        reject(new Error(res.message));
                    }
                },
                error: function(ajax, statusText, error){
                    reject(new Error('网络故障，请稍后再试！'));
                }
            })
        })

        p.then(function(res){
            $.afui.toast({
                message: res.message,
                position: 'tc',
                type: 'success'
            });
        }).catch(function(err){
            $.afui.toast({
                message: err.message,
                position: 'bc',
                type: 'error'
            });
        }).finally(function(){
            clicked = false;
            a.removeClass('gray').addClass('orange');
            $.afui.hideMask();
        })
    })
})