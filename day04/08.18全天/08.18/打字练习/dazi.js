var code
var okCount = 0
var errorCount = 0
var charBox = document.querySelector('#char')

function show(){
    var rand = Math.random();
    
    code = rand * 26
    code = Math.floor(code)
    code = code + 65

    var char = String.fromCharCode(code)

    charBox.innerText = char
}

show()

window.onkeyup = function(ev){
    var key = ev.keyCode

    if(key == code){
        okCount++
        show()
        charBox.className = 'animated zoomIn'
        setTimeout(clearAnimate, 500);
    }
    else{
        errorCount++
        charBox.className = 'animated shake error'
        setTimeout(clearAnimate, 500);
    }

    showResult()
}

function clearAnimate() {
    charBox.className = "animated";
}

function showResult(){
    var ratio = 100 * okCount / (okCount + errorCount)

    document.querySelector('#result').innerText = 
        '正确 ' + okCount + ' 个，' +
        '错误 ' + errorCount + ' 个，' + 
        '正确率 ' + ratio.toFixed(2) + '%'
}