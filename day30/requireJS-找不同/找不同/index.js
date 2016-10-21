// index.js

require.config({
    // baseUrl指定了一个目录，然后requirejs基于这个目录来寻找依赖的模块
    baseUrl: 'js',
    // paths属性指定各个模块的加载路径
    paths: {
        jquery: '../jquery/jquery',
        fullscreen: '../jquery/jquery.fullscreen'
    },
    // shim属性，专门用来配置不兼容的模块
    // shim: {
    //     fullscreen: ['jquery']
    // }
})

require(['Game'], function(Game){
    new Game('main')
});