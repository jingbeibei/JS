//表示一个点
function Point(x, y){
	this.x = x
	this.y = y
	
	this.show = function(){
		var div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.left = (this.x - 5) + 'px'
		div.style.top = (this.y - 5) + 'px'
		div.style.width = 10 + 'px'
		div.style.height = 10 + 'px'
		div.style.backgroundColor = 'red'
		div.style.borderRadius = '50%'
		
		document.body.appendChild(div)
	}
}

//两点之间的距离
function getLength(p1, p2){
	var x = p2.x - p1.x
	var y = p2.y - p1.y
	// 勾股定理计算两点之间的距离
	return Math.sqrt(x * x + y * y)
}

//计算两点连线与x轴之间的角度
function getAngle(p1, p2){
	var y = p2.y - p1.y
	var length = getLength(p1, p2)
	// 用反正弦函数求得弧度，再把弧度转换为角度
	// y / length 对边比斜边
	return Math.asin(y / length) * 180 / Math.PI
}

// 画直线
function Line(p1, p2){
	this.p1 = p1
	this.p2 = p2
	this.color = 'red'
	this.width = 1
	this.showPoints = true
	
	this.show = function(){
		if(this.showPoints){
			this.p1.show()
			this.p2.show()
		}
		
		var div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.left = this.p1.x + 'px'
		div.style.top = this.p1.y + 'px'
		div.style.width = getLength(this.p1, this.p2) + 'px'
		div.style.height = this.width + 'px'
		div.style.backgroundColor = this.color
		div.style.transform = 'rotate(' + getAngle(p1, p2) + 'deg)'
		div.style.transformOrigin = 'left'
		
		document.body.appendChild(div)
	}
}

// 画矩形
function Rectangle(p1, p2){
	this.p1 = p1 // 400, 350
	this.p2 = p2 // 600, 450
	this.p3 = new Point(p2.x, p1.y)
	this.p4 = new Point(p1.x, p2.y)
	this.color = 'red'
	this.width = 1
	this.showPoints = true
	
	this.show = function(){
		if(this.showPoints){
			this.p1.show()
			this.p2.show()
			this.p3.show()
			this.p4.show()
		}
		
		var div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.left = this.p1.x + 'px'
		div.style.top = this.p1.y + 'px'
		div.style.width = this.p2.x - this.p1.x + 'px'
		div.style.height = this.width + 'px'
		div.style.backgroundColor = this.color
		document.body.appendChild(div)
		
		div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.left = this.p2.x + 'px'
		div.style.top = this.p1.y + 'px'
		div.style.width = this.width + 'px'
		div.style.height = this.p2.y - this.p1.y + 'px'
		div.style.backgroundColor = this.color
		document.body.appendChild(div)
		
		div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.left = this.p1.x + 'px'
		div.style.top = this.p2.y + 'px'
		div.style.width = this.p2.x - this.p1.x + 'px'
		div.style.height = this.width + 'px'
		div.style.backgroundColor = this.color
		document.body.appendChild(div)
		
		div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.left = this.p1.x + 'px'
		div.style.top = this.p1.y + 'px'
		div.style.width = this.width + 'px'
		div.style.height = this.p2.y - this.p1.y + 'px'
		div.style.backgroundColor = this.color
		document.body.appendChild(div)
	}
}

// 画圆
function Circle(p, r){
	this.p = p
	this.r = r
	this.color = 'red'
	this.width = 1
	this.showPoints = true
	
	this.show = function(){
		if(this.showPoints){
			this.p.show()
		}
		
		var div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.left = (this.p.x - r) + 'px'
		div.style.top = (this.p.y - r) + 'px'
		div.style.width = 2 * r + 'px'
		div.style.height = 2 * r + 'px'
		div.style.border = this.width + 'px solid ' + this.color
		div.style.borderRadius = '50%'
		
		document.body.appendChild(div)
	}
}

