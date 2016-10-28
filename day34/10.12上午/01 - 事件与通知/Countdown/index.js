// 添加按扭事件监听
// 创建一个倒计时完成时的回调函数（弹出提示）
// 创建一个倒计时变化时的回调函数（在页面上显示剩余秒数）
// 创建一个倒计时对象并开启

function complete(){
    alert('已完成！');
}

function change1(ev, seconds){
    $('div').text(seconds);
}

function change2(ev, seconds){
    $('progress').attr('value', seconds);
}

function change3(ev, seconds){
    // document.title = seconds
    // $(document).attr('title', seconds)
    $(document).prop('title', seconds);
}

$('button').click(function(){
    // 从文本框中得到的值是字符串
    var total = $('input').val();
    // 而倒计时需要是数字，所以要进行转换
    total = parseInt(total);
    
    var cd = new Countdown(total, complete);
    
    // 监听倒计时对象的事件，并改变页面
    // 事件监听函数的第1个参数是event对象，
    // 其它更多参数是由trigger传递过来的，如果传了就有，如果没传则只有一个参数
    $(cd).on('change.countdown.zhongbei.com', change1);
    $(cd).on('change.countdown.zhongbei.com', change2);
    $(cd).on('change.countdown.zhongbei.com', change3);

    cd.start();
    
    $('progress').attr('max', total);
    $('progress').attr('value', total);
})