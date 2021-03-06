// point.js
// 把与point相关的数据和函数全部组合到一个对象中
function Point(x, y) {
    this.x = x;
    this.y = y;
    this.color = 'red';
    this.radius = 5;
    
    this.show = function(){
        var div = document.createElement('div');
        // 把radius color提升为参数
        // var radius = 5;
        // var color = 'red';
        
        div.style.width = 2 * this.radius + 'px';
        div.style.height = 2 * this.radius + 'px';
        div.style.backgroundColor = this.color;
        div.style.borderRadius = '50%';
        div.style.position = 'absolute';
        div.style.left = (this.x - this.radius) + 'px';
        div.style.top = (this.y - this.radius) + 'px';
        document.body.appendChild(div);
    }
    // p是一个"点"对象，表示终点
    this.distanceTo = function(p){
        var a = this.x - p.x;
        var b = this.y - p.y;
        return Math.sqrt(a * a + b * b);
    }
    // 求弧度
    this.arcTo = function(p){
        var a = p.x - this.x;
        var b = p.y - this.y;
        return Math.atan(b / a);
    }
    // 把弧度转化为角度
    this.degreeTo = function (p) {
        var arc = this.arcTo(p);
        return arc * 180 / Math.PI;
    }
}