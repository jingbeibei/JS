// calc.js
//将计算类方法都集中到一起
//计算两点之间的距离
function calcDistance(p1, p2){
	var a = p1.x - p2.x;
	var b = p1.y - p2.y;
	
	return Math.sqrt(a * a + b * b);
}
//计算两点之间连线与x轴的夹角弧度
function calcArc(p1, p2){
	var a = p2.x - p1.x;
	var b = p2.y - p1.y;
	// b/a 对边比邻边
	// 通过反正切函数Math.atan(b/a)求得弧度
	return Math.atan(b/a);
}
//计算弧度对应的角度值
function calcDegree(arc){
	return arc * 180 / Math.PI;
}