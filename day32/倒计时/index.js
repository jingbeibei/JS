// index.js

// 倒计时完成时的回调函数
function complete(){
    alert('倒计时完成');
}

// 倒计时变化时的回调函数(在页面上显示剩余的秒数)
// seconds表示剩余秒数
function change1(seconds){
    $('div').text(seconds);
}

// 改变进度条的值
function change2(seconds){
    $('progress').attr('value', seconds);
}

// 改变当前页面标题
function change3(seconds){
    $(document).prop('title', seconds);
}

// 
$('button').click(function(){
    // 从文本框中读取值是多少
    var total = $('input').val();
    
    // total是字符串，需要转换为整型
    total = parseInt(total);
    console.log(typeof total);

    // 创建Countdown实例并传入参数
    // 参数3：传入函数数组
    new Countdown(total, complete, [change1, change2, change3]).start();

    // 设置进度条的最大值
    $('progress').attr('max', total);
    // 进度条的当前值
    $('progress').attr('value', total);
})