// StartScene.js

// 开始场景

function StartScene(game, src) {
    console.log(game);
    src = src || 'images/0.jpg';
    console.log('***'+src);
    // 调用父构造函数
    // 调用别人的构造函数构造自己的对象
    Scene.call(this, game, src);
}

// 构造原型链，实现继承
StartScene.prototype = Object.create(Scene.prototype);
StartScene.prototype.constructor = StartScene;
// 实现"父类"中的clickListener方法
StartScene.prototype.clickListener = function(x, y) {
    console.log(x + ', StartScene' + y);
    // 如果点击的是"开始游戏"
    if(x > 643 && x < 858 && y > 334 && y < 418){
        // 把fullScreen移除
        this.fullScreen.remove();
        // 加载Game.js中的游戏场景
        this.game.loadGameScene(this);
    }
}

// 重写Scene.js中场景加载方法，添加全屏按钮
StartScene.prototype.load = function(prevScene) {
    this.fullScreen = new FullScreen(this.game.box, {
        left:'auto',
        right:'20px',
    })
    this.fullScreen.show();
    
    // 调用父构造函数原型中的load方法，传递this
    Scene.prototype.load.call(this);
}