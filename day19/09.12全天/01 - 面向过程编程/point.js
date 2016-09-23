// point.js

//构造函数，构造点这样一个数据对象
function Point(x, y){
	this.x = x
	this.y = y
}

//函数，名字中有动词，它实现了将“点”显示到页面上的功能
function showPoint(p, color, radius){
	var div = document.createElement('div')
//	var radius = 5
//	var color = 'red'
//	提升为参数
	
	div.style.width = 2 * radius + 'px'
	div.style.height = 2 * radius + 'px'
	div.style.backgroundColor = color
	div.style.borderRadius = '50%'
	div.style.position = 'absolute'
	div.style.left = (p.x - radius) + 'px'
	div.style.top = (p.y - radius) + 'px'
	
	document.body.appendChild(div)
}