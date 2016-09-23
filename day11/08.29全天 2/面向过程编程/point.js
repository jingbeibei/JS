// point.js
// Point构造函数,构造"点"这个一个数据对象
function Point(x, y) {
    this.x = x;
    this.y = y;
}

// showPoint函数
function showPoint(p, color, radius) {
    var div = document.createElement('div');
    // 把radius color提升为参数
    // var radius = 5;
    // var color = 'red';
    
    div.style.width = 2 * radius + 'px';
    div.style.height = 2 * radius + 'px';
    div.style.backgroundColor = color;
    div.style.borderRadius = '50%';
    div.style.position = 'absolute';
    div.style.left = (p.x - radius) + 'px';
    div.style.top = (p.y - radius) + 'px';
    document.body.appendChild(div);
}
