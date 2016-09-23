var petname = $.cookie('petname')

if(petname){
    $('#user').find('span').last().text(petname)
}
else{
    $('#user').find('span').last().text('登录').end().end().removeAttr('data-toggle').click(function(){
        location.href = 'signin.html'
    })
}

$('#ask').click(function(){
    if(petname){
        location.href = 'ask.html'
    }
    else{
        location.href = 'signin.html'
    }
})

$('.navbar .dropdown-menu li').last().click(function(){
    $.get('/user/signout', null, function(res){
        if(res.code == 'success'){
            location.href = 'index.html'
        }
    })
})

$('.questions').delegate('[question]', 'click', function(){
    if(petname){
        $.cookie('question', $(this).attr('question'))
        location.href = 'answer.html'
    }
    else{
        location.href = 'signin.html'
    }
})

// 以下是新修改部分
$.getJSON('/questions', null, function(res){
    // res.data服务器返回的数据，它是一个数组
    // 在控制台输出一下可以看到结果是：Array[Object, Object]
    console.log(res.data)
    // 渲染数据至指定区域
    var html = template('question-template', res)
    $('.questions').html(html)
})
// 使用template.helper(name, callback)注册公用辅助方法
// 在模板中可以使用辅助方法
template.helper('ms', function(t){
    t = new Date(t)
    // 返回getTime()是毫秒
    return t.getTime()
})

template.helper('formatTime', function(t){
    t = new Date(t)
    
    var M = t.getMonth() + 1,
        d = t.getDate(),
        h = t.getHours(),
        m = t.getMinutes()

    M = M < 10 ? '0' + M : M
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    
    return t.getFullYear() + '-' + M + '-' + d + ' ' + h + ':' + m
})

template.helper('formatIP', function(ip){
    if(ip.startsWith('::1')){
        return '127.0.0.1'
    }
    if(ip.startsWith('::ffff:')){
        return ip.substr(7)
    }
})
