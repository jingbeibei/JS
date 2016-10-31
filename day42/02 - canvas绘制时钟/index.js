// index.js

// 获得画布
var clockID = document.getElementById('clockCanvas');
// getContext()返回一个对象，该对象提供用于在画布上绘图的方法和属性
var clock = clockID.getContext('2d');

// 1 使用canvas创建画布
// 2 使用function函数做计算
// 3 实例化Date()对象，获取时、分、秒
function drawClock(){
    // clearRect() 清空指定矩形内的指定像素
    // 这里用来清空画布
    clock.clearRect(0, 0, 1000, 650);

    // 获得当前时间
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // save()和restore()方法是绘制复杂图形不可缺少的方法
    // 它们是分别用来保存和恢复canvas状态的，都没有参数
    clock.save();

    // translate()方法重新映射画布上的(0, 0)位置
    clock.translate(0, 500);

    // 绘制文字，显示当前时间
    clock.fillStyle = 'green';
    clock.strokeStyle = '#eee';
    clock.font = '30px bold 微软雅黑';
    // 
    clock.fillText('当前系统时间：' + hours + '时' + minutes + '分' + seconds + '秒', 100, 100);
    // 
    clock.restore();

    // 转换24小时制为12小时制
    hours = hours + minutes / 60;
    hours = hours > 12 ? hours - 12 : hours;

    // 绘制表盘
    clock.beginPath();
    clock.lineWidth = 10;
    // clock.strokeStyle = "#000000";
    clock.arc(500, 300, 200, 0, 360);
    clock.stroke();
    // 
    // clock.closePath();

    // 绘制刻度
    // 1 “时针”刻度
    for(var i = 0; i < 12; i++){
        // 
        clock.save();
        // 
        clock.translate(500, 300);
        // 
        clock.lineWidth = 7;
        clock.strokeStyle = '#999999';
        // 
        clock.rotate(i * 30 * Math.PI / 180);
        // 
        clock.beginPath();
        // 
        clock.moveTo(0, -170);
        clock.lineTo(0, -190);
        clock.closePath();
        // 
        clock.stroke();
        // 
        clock.restore();
    }

    // 2 “分针”刻度
    for(var j = 0; j < 60; j++){
        // 
        clock.save();
        // 
        clock.translate(500, 300);
        clock.lineWidth = 5;
        clock.strokeStyle = '#999999';
        // 设置旋转角度
        clock.rotate(j * 6 * Math.PI / 180);
        // 
        clock.beginPath();
        clock.moveTo(0, -180);
        clock.lineTo(0, -190);
        // 
        clock.closePath();
        clock.stroke();
        clock.restore();
    }
    // 绘制表针
    // 1 绘制时针
    clock.save();
    clock.translate(500, 300);
    clock.lineWidth = 7;
    clock.strokeStyle = '#000000';
    // 
    clock.rotate(hours * 30 * Math.PI / 180);
    clock.beginPath();
    // 
    clock.moveTo(0, 15);
    clock.lineTo(0, -120);
    clock.stroke();
    // 
    clock.closePath();
    clock.restore();

    // 2 绘制分针
    clock.save();
    clock.translate(500, 300);
    clock.rotate(minutes * 6 * Math.PI / 180);
    clock.lineWidth = 5;
    clock.strokeStyle = '#000';
    clock.beginPath();
    // 
    clock.moveTo(0, 20);
    clock.lineTo(0, -160);
    clock.stroke();
    clock.closePath();
    clock.restore();

    // 3 绘制秒针
    clock.save();
    clock.translate(500, 300);
    clock.rotate(seconds * 6 * Math.PI / 180);
    clock.lineWidth = 3;
    clock.strokeStyle = '#f00';
    // 
    clock.beginPath();
    clock.moveTo(0, 25);
    clock.lineTo(0, -165);
    // 
    clock.stroke();
    clock.closePath();
    

    // 秒针圆心处绘制一个小圆
    clock.fillStyle = '#999';
    clock.strokeStyle = '#f00';
    clock.beginPath();
    clock.arc(0, 0, 6, 0, 360);
    clock.fill();
    clock.stroke();
    clock.closePath();
    clock.restore();

}

// 
drawClock();
setInterval(drawClock, 1000);
