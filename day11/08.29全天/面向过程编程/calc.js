// calc.js
// 将计算类的方法都集中到一起

// 1 计算两点之间的距离
function calcDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
}

// 2 计算两点之间的连线与x轴之间的夹角
function calcArc(p1, p2) {
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    // 通过反正切函数求得弧度
    return Math.atan(b / a);
}

// 3 把弧度转换为角度
function calcDegree(arc) {
    return arc * 180 / Math.PI;
}