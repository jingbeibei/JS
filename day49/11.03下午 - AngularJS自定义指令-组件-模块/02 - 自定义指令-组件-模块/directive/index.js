// index.js

// 如果项目中有很多公共的功能(指令directive, 组件component)
// 可以将这些公共的部分放入一个单独的模块中
// 任何程序使用这些模块时,只需将公共模块添加到本程序到依赖项中即可
angular.module('ZhongBeiApp', ['ZhongBei']);