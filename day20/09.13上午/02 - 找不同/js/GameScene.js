// GameScene.js

// 找不同场景
// 找不同游戏数据

function GameScene(game, datas) {
    // 全部的游戏数据
    this.datas = datas;
    this.index = 0;
    // 当前正在进行的游戏数据
    this.data = datas[this.index];
    console.log(this.data);
    Scene.call(this, game, this.data.src);
}

// 构造原型链
// Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象
GameScene.prototype = Object.create(Scene.prototype);
GameScene.prototype.constructor = GameScene;

// 重写load方法，添加按钮、倒计时、数字标签
// prevScene：上一个场景
GameScene.prototype.load = function(prevScene) {
    this.fullScreen = new FullScreen(this.game.box);
    
    this.fullScreen.show();

    // 调用父对象原型中的load方法
    Scene.prototype.load.call(this);
    
    // 将上一个场景淡出，动画结束后将上一个场景卸载
    // 同时开始倒计时
    // bind()为每个匹配元素的特定事件绑定事件处理函数，在这里用没有绑定函数，只是用来传递数据。
    prevScene.$ele.fadeOut(1500, function(){
        console.log('game scene loaded');
        
        prevScene.unload();
    }.bind(this));
}