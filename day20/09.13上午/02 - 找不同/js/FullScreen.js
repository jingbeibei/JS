// FullScreen.js
// 全屏按钮

// FullScreen()是全屏按钮的构造函数，整个页面上只有一个构造函数
// box:全屏按钮放置的位置，即父元素
// options:覆盖代码中的默认数据，实现样式自定义
function FullScreen(box, options) {
    this.box = box;
    // $.extend() 用一个或多个其他对象来扩展一个对象，返回被扩展的对象
    // this.options表示扩展后的对象
    // 在这里$.extend()用来合并对象，即把options合并到前一个对象上，参考jQuery API
    this.options = $.extend({
        position:'absolute',
        left:'10px',
        bottom:'26px',
        fontSize:'16px',
        backgroundColor:'red',
        display:'inline-block',
        padding:'8px',
        borderRadius:'6px'
    }, options)
}

// 将全屏按钮(<span>)显示在页面上
FullScreen.prototype.show = function(){
    // this.$ele表示：this对象中的一个属性，表示一个封装在jQuery对象中的标签元素
    // 对象，因为这个标签元素不是一个DOM对象，而是一个jQuery封装的对象，所以在属性
    // 名字前面加了$，表示这个是jQuery对象，而不是普通DOM对象
    // on: 用于绑定事件
    this.$ele = $('<span>', {
        on:{
            click:function(){
                // fullScreen()方法来自jquery.fullscreen插件
                // FullScreen.isFullScreen = !FullScreen.isFullScreen表示给fullScreen赋相反的值
                // 上面表达式的结果是：FullScreen.isFullScreen
                // 下面这句代码实现文档在全屏和非全屏两个状态切换
                $(document).fullScreen(FullScreen.isFullScreen = !FullScreen.isFullScreen);
                // 更改span的文本内容(退出全屏或者全屏)
                if(FullScreen.isFullScreen){
                    $(this).text('退出全屏');
                }else $(this).text('全屏');
            }
        } // prependTo()把匹配的元素前置到另一个、指定的元素集合中。
    }).text(FullScreen.isFullScreen ? '退出全屏' : '全屏').css(this.options).prependTo(this.box);
    console.log(this.$ele);
}

// 从页面上移除全屏按钮
FullScreen.prototype.remove = function(){
    this.$ele.remove();
}