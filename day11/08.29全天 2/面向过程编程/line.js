// line.js

// 
function showLine(p1, p2, color, lineSize) {
    var div = document.createElement('div');
    div.style.width = calcDistance(p1, p2) + 'px';
    div.style.height = lineSize + 'px';
    div.style.backgroundColor = color;
    div.style.borderRadius = lineSize / 2 + 'px';
    div.style.position = 'absolute';
    div.style.left = p1.x + 'px';
    div.style.top = p1.y - lineSize / 2 + 'px';
    // 
    div.style.transform = 'rotate(' + calcDegree(calcArc(p1, p2)) + 'deg)';
    div.style.transformOrigin = 'left';
    document.body.appendChild(div);
}