// 倒计时对象的构造函数
// total: 总秒数
// complete: 倒计时完成时的回调函数
function Countdown(total, complete) {
    this.total = total || 60;
    this.complete = complete;

    // 当前剩余秒数
    this.seconds = this.total;
}

// 启动倒计时
Countdown.prototype.start = function () {
    $(this).trigger('change.countdown.zhiyou100.com', this.seconds);

    // 开启周期是1s的定时器
    var timer = setInterval(function () {
        // 判断剩余秒数是否大于0
        if (this.seconds > 0) {
            this.seconds--;

            // 当秒数变化时通知外面
            // 使用trigger触发事件时可以将事件触发在document等
            // 公共标签对象上，也可以将事件触发在自定义对象上
            $(this).trigger('change.countdown.zhiyou100.com', this.seconds);
        }
        else {
            // 清除定时器
            clearInterval(timer);

            // 判断complete是否设置并且是一个函数
            if (this.complete && (typeof this.complete == 'function')) {
                this.complete();
            }
        }
    }.bind(this), 1000);
}