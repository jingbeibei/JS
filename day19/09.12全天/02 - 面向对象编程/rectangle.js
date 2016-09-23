//Rectangle对象，整合了画距形需要的数据和功能
function Rectangle(p1, p2){
	this.pStart = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y))
	this.pEnd = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y))
	this.color = 'red'
	this.lineSize = 10
	
	this.show = function(){
		var div = document.createElement('div')
		div.style.width = this.pEnd.x - this.pStart.x + 'px'
		div.style.height = this.pEnd.y - this.pStart.y + 'px'
		div.style.border = this.lineSize + 'px solid ' + this.color
		div.style.borderRadius = this.lineSize + 'px'
		div.style.position = 'absolute'
		div.style.top = this.pStart.y - this.lineSize / 2 + 'px'
		div.style.left = this.pStart.x - this.lineSize / 2 + 'px'
		document.body.appendChild(div)
	}
}
