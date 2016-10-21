// Countdown.js
// 倒计时文件

// Countdown实现倒计时
// total:总秒数
// complete:表示倒时计完成时的回调函数
// change:表示倒计时变化时的回调函数
function Countdown(total, complete, change){
    // 如果total传入有值的话，this.total = total;
    // 如果total没有传入值，this.total = 60;
    this.total = total || 60;
    this.complete = complete;
    this.change = change;

    // 当前剩余秒数
    this.seconds = this.total;
    console.log(this.seconds + '###');
}

// 给Countdown的原型添加一个方法来启动倒计时
Countdown.prototype.start = function(){
    function change(){console.log('***');
        // 判断this.change是否有值
        if(this.change){
            // 判断this.change是否是函数
            if(typeof this.change == 'function'){
                // 把剩余秒数传入this.change
                this.change(this.seconds);
            }

            // 判断this.change是否是Array的一个实例
            if(this.change instanceof Array){
                // forEach需要一个回调函数，而不是立即调用这个函数
                // 
                this.change.forEach(function(func, index, arr){
                    console.log(func);
                    if(typeof func == 'function'){
                        // 调用change1,change2,change3,并传入剩余秒数
                        func(this.seconds);
                    }
                }.bind(this)); // 使用bind纠正this指向并返回一个新函数
            }
        }
    }
    // 调用change()
    // 如果希望立即调用函数并纠正函数内部this的指向可以使用call或者apply方法
    change.call(this);

    // 开启周期是1秒的定时器
    var timer = setInterval(function(){console.log('888')
        // 判断剩余秒数是否大于0，大于0的话--
        if(this.seconds > 0){
            this.seconds--;
            change.call(this);
            console.log(this.seconds);
        }else{
            clearInterval(timer);
            // 判断this.complete有值并且是一个函数
            if(this.complete && (typeof this.complete == 'function')){
                this.complete();
            }
        }
    }.bind(this), 1000);
}
