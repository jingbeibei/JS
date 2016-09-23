// stars.js

// stars.js用来定义星星的属性以及控制星星的显示
// count：星星的数量
// size：星星的大小
function Stars(count, size) {
    // 找到div
    this.box = document.querySelector('.input-stars');
    this.count = count || 5;
    this.size = size || 30;
    // 把方法放入构造函数内部
    // this.show = function(){}
}

// 把显示星星的方法放入原型中
Stars.prototype.show = function(){
    for(var i = 0; i < this.count; i++){
        var star = document.createElement('img');
        star.src = 'img/star-yellow.png';
        star.style.width = this.size + 'px';
        star.style.height = this.size + 'px';
        star.style.marginRight = this.size / 2 + 'px';
        // 添加自定义属性data-index
        star.dataset.index = i;

        // 给star添加单击事件
        star.onclick = function(event) {
            var stars = document.querySelectorAll('img');
            var score00 = document.querySelector('.input-stars-score');
            var index = event.currentTarget.dataset.index;
            // 第2次单击时把red.png改为star-yellow.png
            for(var i = 0; i < stars.length; i++){
                console.log(stars[i].src);
                if(stars[i].src.endsWith('red.png')){
                    stars[i].src = 'img/star-yellow.png';
                }
            }
            // 第1次点击时把图片改为star-red.png
            for(var i = 0; i <= index; i++){
                stars[i].src = 'img/star-red.png';
            }
            // 显示评分
            score00.innerText = Number.parseInt(index) + 1 + '分';
        }
        this.box.appendChild(star);
        

    }
        // score显示评分
        var score = document.createElement('span');
        score.className = 'input-stars-score';
        score.style.display = 'inline-block';
        score.style.height = this.size + 'px';
        score.style.lineHeight = this.size * 1.1 + 'px';
        score.style.verticalAlign = 'top';
        score.style.fontSize = this.size * 0.6 +'px';
        score.style.color = '#666';
        this.box.appendChild(score);
}