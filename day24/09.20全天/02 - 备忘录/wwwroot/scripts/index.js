// index.js
// 
$('footer>span').click(function(){
    // 用new Prompt创建一个提示框
    new Prompt('新建文件夹', '请输入新文件夹的名字', function(){
        // 取得输入的文本内容并掉空格
        var foldername = this.text().trim();
        // 如果没有输入名字
        if(foldername.length == 0){
            new Alert('必须填写文件夹的名字！').show();
            return;
        }

        // new RegExp()创建一个正则表达式对象
        // .test(str)使用正则表达式测试str字符串是否符合模式
        // ^ 表示正则表达式必须从第一个字符开始测试
        // $ 表示正则表达式必须测试到最后一个字符
        // 如果不写^$，则只要字符串一部分符合条件即通过测试
        // ^表示一行开头，行首
        // $表示一行结尾，行尾
        // 正则表达式的字面量写法：   /正则表达式/
        
        // Regular Expression
        // new RegExp('^[a-z0-9A-Z\u4e00-\u9fa5]{1,16}$')
        if(!(/^[a-z0-9A-Z\u4e00-\u9fa5]{1,16}$/.test(foldername))){
            new Alert('文件夹名字不能使用特殊字符！').show();
            return;
        }
        // 向服务器发送post请求,实现新建目录的功能
        $.post('/api/folder/add/' + foldername, null, function(res){
            alert(res.message);
        });
    }).show();
});