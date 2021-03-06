// 倒计时对象的构造函数
// total: 总秒数
// complete: 倒计时完成时的回调函数
function Countdown(total, complete) {
    this.total = total || 60;
    this.complete = complete;
    // 创建回调对象
    this.changes = $.Callbacks('unique');

    // 当前剩余秒数
    this.seconds = this.total;
}

// 启动倒计时
Countdown.prototype.start = function () {
    this.changes.fire(this.seconds);

    // 开启周期是1s的定时器
    var timer = setInterval(function () {
        // 判断剩余秒数是否大于0
        if (this.seconds > 0) {
            this.seconds--;

            this.changes.fire(this.seconds);
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