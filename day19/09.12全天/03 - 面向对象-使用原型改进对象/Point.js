//构造函数
function Point(x, y){
	this.x = x
	this.y = y
}
//构造函数的原型 - 原型是一个对象，对象中的属性和方法是共享的/公用的
//它们会被构造函数创建出来的所有对象共享/公用

//在对象的方法中使用属性或调用其它方法时，会首先在对象自身中查找是否有
//这个属性或方法，如果有则优先使用，
//如果没有，会去对象的原型查找，如果原型中有，则使用


//将属性和方法放入原型中
Point.prototype = {
	color: 'red',
	radius: 5,
	show: function(){
		var div = document.createElement('div')		
		div.style.width = 2 * this.radius + 'px'
		div.style.height = 2 * this.radius + 'px'
		div.style.backgroundColor = this.color
		div.style.borderRadius = '50%'
		div.style.position = 'absolute'
		div.style.left = (this.x - this.radius) + 'px'
		div.style.top = (this.y - this.radius) + 'px'
		
		document.body.appendChild(div)
	},
	
	distanceTo: function(p){
		var a = this.x - p.x
		var b = this.y - p.y
		
		return Math.sqrt(a * a + b * b)
	},
	
	arcTo: function(p){
		var a = p.x - this.x
		var b = p.y - this.y
		
		return Math.atan(b/a)
	},
	
	degreeTo: function(p){
		var arc = this.arcTo(p)
		return arc * 180 / Math.PI
	}
}
