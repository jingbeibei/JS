// 添加按扭事件监听
// 创建一个倒计时完成时的回调函数（弹出提示）
// 创建一个倒计时变化时的回调函数（在页面上显示剩余秒数）
// 创建一个倒计时对象并开启

function complete(){
    alert('已完成！');
}

function change1(seconds){
    $('div').text(seconds);
}

function change2(seconds){
    $('progress').attr('value', seconds);
}

function change3(seconds){
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
    cd.changes.add(change1);
    cd.changes.add(change2, change3);
    cd.start();
    
    $('progress').attr('max', total);
    $('progress').attr('value', total);
});