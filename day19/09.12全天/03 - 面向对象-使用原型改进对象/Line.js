//Line对象，解决了起点终点问题
function Line(p1, p2){
	this.pStart = p1.x < p2.x ? p1 : p2
	this.pEnd = this.pStart == p2 ? p1 : p2
}

//原型也可以这样定义：
Line.prototype.color = 'red'
Line.prototype.lineSize = 10
Line.prototype.show = function(){
	var div = document.createElement('div')
	
	div.style.width = this.pStart.distanceTo(this.pEnd) + 'px'
	div.style.height = this.lineSize + 'px'
	div.style.backgroundColor = this.color
	div.style.borderRadius = this.lineSize / 2 + 'px'
	div.style.position = 'absolute'
	div.style.left = this.pStart.x + 'px'
	div.style.top = this.pStart.y - this.lineSize / 2 + 'px'
	
	div.style.transform = 'rotate(' + this.pStart.degreeTo(this.pEnd) + 'deg)'
	div.style.transformOrigin = 'left center'
	
	document.body.appendChild(div)
}
