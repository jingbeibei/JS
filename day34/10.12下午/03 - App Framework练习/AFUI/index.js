// 关闭AF根据浏览器自动设置主题的功能
// 关闭自动设置主题后可以在<body>标签加主题样式如
// <body class="ios7">
$.afui.useOSThemes = false;

// 关闭AF自动启动
$.afui.autoLaunch = false;

$(function(){
    setTimeout(function() {
        // 手动启动AF
        $.afui.launch()
    }, 2000);
})