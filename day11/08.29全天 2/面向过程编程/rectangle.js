// rectangle.js

// p1(100, 100) p2(300, 500)
function showRectangle(p1, p2, color, lineSize) {
    // pStart(100, 100)
    var pStart = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
    // pEnd(300, 500)
    var pEnd = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
    console.log(pStart)
    // 
    var div = document.createElement('div');
    div.style.width = pEnd.x - pStart.x + 'px';
    div.style.height = pEnd.y - pStart.y + 'px';
    div.style.border = lineSize + 'px solid ' + color;
    div.style.borderRadius = lineSize + 'px';
    // div.style.backgroundColor = color;
    div.style.position = 'absolute';
    div.style.top = pStart.y - lineSize / 2 + 'px';
    div.style.left = pStart.x - lineSize / 2 + 'px';
    document.body.appendChild(div);
}