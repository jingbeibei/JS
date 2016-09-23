var num = 10;
function func1() {
    console.log(num);
}
func1();
function func2() {
    var num1 = 100;
    num2 = 1000;
}
func2();
// console.log(num1);//未定义，错误
console.log(num2);

//从外部得到局部变量的值
//func3外部无法得到num3的值，但是可以用内部的方法func4
function  func3() {
    var num3=10000;
    function func4() {
        
        return num3;
    }
    //把func4作为结果返回
//js中函数也是对象，可以作为参数或返回值
    return func4;
}
var fnuc=func3();
console.log(fnuc());
//用闭包花间函数
function circleArea(pi,r) {
    return pi*r*r;

}
function calcCircleArea(r){
    return circleArea(3.14,r);

}
console.log("圆的面积");
console.log(calcCircleArea(5));
//化简函数
function getCalcCircleArea(pi){
    return function(r){
        return pi*r*r;

    }

}
var caleCircleArea1=getCalcCircleArea(3.14);
console.log(caleCircleArea1(5));
var caleCircleArea2=getCalcCircleArea(3.1415926);
console.log(caleCircleArea2(6));