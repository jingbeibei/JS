// add.js

document.forms[0].onsubmit = function(event){
    // 阻止表单的自动提交功能
    event.preventDefault();
    
    var data = new FormData(this);
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                new Alert(data.information, function(){
                    // 点击"确定"按钮跳转到首页
                    location.href = '/';
                }).show();
            }else new Alert('很抱歉，留言失败，大侠重新来过...').show();
        }
    }
    // 发送post请求
    xhr.open("POST", '/add');
    xhr.send(data);
}