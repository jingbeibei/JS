// index.js

// 参考文献：requirejs：让人迷惑的路径解析
// http://www.cnblogs.com/chyingp/p/requirejs-path-resolve.html

// 入口脚本
require.config({
    // paths属性指定各个模块的加载路径
    paths:{
        layer:'zhongbei-layer'
    }
})

// 加载模块
require(['layer/js/Prompt'], function(Prompt){
    new Prompt('文件夹名称','请输入文件夹名称',function(){
        console.log('你点击了确定');
    },function(){
        console.log('你点击了取消');
    }).show();
})