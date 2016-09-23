// Game.js

// 游戏基本控制
function Game(box){
    console.log(box);
    this.box = box;
    
    // 创建音效对象，播放背景音乐
    this.audio = new Audio();
    this.audio.playMusic(true);
    
    // 监听点击事件
    this.listen();
    // 加载开始场景
    this.loadStartScene();
}

Game.prototype.listen = function(){
    // 为this.box添加单击事件
    $(this.box).click(function(e){
        // offsetX、offsetY表示鼠标相对于事件源元素的X,Y坐标
        // 在这里事件源元素是this.box，即main
        var x = e.offsetX;
        var y = e.offsetY;
        
        console.log('click x: %d, y: %d', x, y);
        // console.log(this);
        // 播放“点击”音效
        this.audio.playClick();
        // 判断this.clickListener是否是一个函数
        // 如果是的话，传递当前鼠标点击的位置
        if(typeof this.clickListener == 'function'){
            this.clickListener(x, y);
        }
    }.bind(this)); // bind(this)用来传递数据
}
// 加载开始场景
Game.prototype.loadStartScene = function(){
    // console.log(this);
    // 创建开始场景对象scene
    var scene = new StartScene(this);
    // 调用开始场景的load()方法
    scene.load();
}
// 加载游戏场景
Game.prototype.loadGameScene = function(prevScene){
    console.log('load next scene...');
    var scene = new GameScene(this, Game.GameSceneDatas);
    scene.load(prevScene);
}