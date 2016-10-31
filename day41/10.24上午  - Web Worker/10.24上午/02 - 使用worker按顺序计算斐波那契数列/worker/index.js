var i = 1;
var w = new Worker("worker.js");

w.onmessage = function(ev){console.log('onmessage');
    $('<tr><td class=td' + i + '></td></tr>').prependTo('table');
    $(`.td${i}`).text('第 ' + i + ' 项')
    $('<td></td>').text(ev.data).appendTo('tr:first-child')
    i++;
    console.log(i);
    w.postMessage(i);
}

w.postMessage(i);

$('button').click(function(){
    w.terminate();
    $('p').text('已停止！');
});

// 前30多个斐波数几乎是一瞬间出现的，太快了！
// 能不能让它们慢慢出现呢？
// 比如1秒出现1个？
