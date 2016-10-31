// index.js

var i = 1;
// 
var w = new Worker('worker.js');

function gotMessage(){
    return $.Deferred(function(d){
        var m = function(ev){
            // w.removeEventListener('message', m);
            d.resolve(ev);
        }
        // 监听message事件，监听到message时调用m
        w.addEventListener('message', m);
    });
}

// 
function getTimer(ms){
    return $.Deferred(function(de){
        setTimeout(function() {
            de.resolve(ms + 'ms时间到啦');
        }, ms);
    });
}

// 
function doWork(){
    var t = getTimer(1000);
    var m = gotMessage();
    // when():执行多个对象的回调函数
    $.when(t, m).done(function(t, ev){
        $('<tr><td class=td' + i + '></td></tr>').prependTo('table');
        $(`.td${i}`).text('第 ' + i + ' 项')
        $('<td></td>').text(ev.data).appendTo('tr:first-child');
        i++;
        // console.log(i);
        w.postMessage(i);
        doWork();
    });    
}

doWork();
w.postMessage(i);

$('button').click(function(){
    w.terminate();
    $('p').text('已停止');
});
