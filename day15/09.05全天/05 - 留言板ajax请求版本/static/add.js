// add.js 向文件中写入留言内容

$('form').submit(function(ev){
    ev.preventDefault();
    
    // var formData = { content:document.querySelector('textarea').value }
    // var formData = { content:$('textarea').val() }
    var formData = $(this).serialize();
    // $(表单).serialize()
    // 将表单元素的name属性的值和表单内容序列化为urlencoded格式，用于ajax提交
    $.post('add', formData, function(data){
        new Alert(data.message, function(){
            location.href = '/';
        }).show();
    }, 'json')
})