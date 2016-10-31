// 不使用系统主题（如果在iOS会使用iOS主题，
// 如果在firefox中会使用firefox主题，禁用后将使用
// app framework的默认主题）
$.afui.useOSThemes = false;

// 刷新或进入页面时，是否加载url中的hash指定的panel
// 如果设置为false，则每次都会进入“首页”
$.afui.loadDefaultHash = false;

// 是否自动启动，如果希望更好地控制启动页面(splashscreen)
// 可以设置为false，设置为false之后需要自己写代码
// 启动 app framework
// $.afui.autoLaunch = false

// $.afui.backButtonText = '返回'
$.afui.backButtonText = '';

$.afui.ready(function(){
    // $.afui.setBackButtonText('返回')

    var isLoading = false;

    $('#food').scroll(function(ev){
        var bp = $('#food').scrollTop() + $('#food').outerHeight()
        var h = document.title = $('#food')[0].scrollHeight
        
        function load(){
            isLoading = true

            $('<li class="loading">'+
            '<i class="icon-spinner icon-spin icon-3x"></i>'+
            '<br>美食正在加载中' +
            '</li>')
            .appendTo('#food ul')

            //模拟发起Ajax请求

            setTimeout(function() {
                isLoading = false
                $('#food li.loading').remove()
                $('#food li:lt(10)').clone().appendTo('#food ul')
            }, 1000);
        }

        if(bp >= h - 50 && !isLoading){
            load()
        }
    })

    $('#shop').on('panelload', function(){
        $.afui.setTitle('德克士(乐尚店)')
        var hash = location.hash
        
        // 获取数据的方法1：
        // var data = hash.split('/')
        // data.shift()
        
        // 匹配字符：
        // [1-9]   表示匹配1~9这个范围任意一个字符
        // [1]     表示只匹配1这个字符
        // [^1]    匹配任意一个不是1的字符
        
        // 表示匹配数量：
        // {1,3}   表示最少1份，最多3份
        // ?       表示0份或1份
        // +       表示1份或多份
        // *       表示0份或多份

        // 分组：
        // 可以使用()将一个大的匹配拆分成小的组
        // 假设 '/([^/]+)/([^/]+)' 匹配了 /hot/12
        // 第一个([^/]+)会从匹配结果中提取hot
        // 第二个([^/]+)会从匹配结果中提取12

        // 字符串的match方法可以使用正则表达式匹配字符串
        // match方法的参数是正则表达式对象
        // 如果传入的是一个字符串，则match内部会将其转换成正则表达式对象
        // 如果正则表达式设置全局匹配标记g，则不能得到分组内容
        // 如果不加g，则调用一次只能得到一个匹配结果，但匹配
        // 结果中含有分组内容等详细信息
        
        // 正则表达式标记 i 表示忽略大小写，如
        //      /[a-z]/i 可以匹配大写字母

        // 正则表达式标记 m 表示多行模式，可跨越多行
        // 进行匹配

        // 字符串的replace方法也支持正则表达式：
        // str.replace('oldstr', 'newstr')
        // str.replace(regex, 'newstr')

        // 字符串的search方法判断字符串
        // 是否符合正则表达式
        // str.search(regex)

        // 正则表达式构造函数：
        // new RegExp('正则表达式', '正则表达式标记选项')
        // 正则表达式字面量：
        // JS中使用 / / 包围的内容是正则表达式对象字面量
        // 如果正则表达式中有 / 则需要使用 \ 对其进行转义
        // 字面量 / /后面可以加标记，如 / /gi

        // 方法 regexp.exec(str) 可以使用正则表达式对象
        // 匹配字符串，而且支持while循环连续匹配

        // var results = hash.match(/\/([^\/]+)\/([^\/]+)/)
        // alert(JSON.stringify(results))

        var regex = /\/([^\/]+)\/([^\/]+)/g
        var results
        var datas = {}

        // 注意：在while中不能直接使用正则表达式字面量
        // 也不直接使用new RegExp()构造函数，因为这样做
        // 会导致每1次循环都创建一个全新的正则表达式对象
        // 会导致每1次都从第1个字符开始匹配，从而造成死循环

        // 实际上regexp连续匹配时会在内部记录上一次匹配的
        // 位置，下一次匹配时会从上一次匹配的位置之后开始进行
        // 匹配
        while(results = regex.exec(hash)){
            // alert(results)
            alert(regex.lastIndex);
            datas[results[1]] = results[2];
        };

        // 方法regExp.test(str)测试字符串是否符合正则表达式
        // 与str.search(regex)功能相同


        alert(JSON.stringify(datas));
    })
})

