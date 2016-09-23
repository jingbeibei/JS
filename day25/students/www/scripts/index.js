// index.js

// 发送post请求,删除一条学生信息
function removeStudent(id) {
    if(confirm('确定要删除吗？')){
        $.post(
            '/api/student/remove/' + id,
            null,
            function(res){
                if(res.code == 'success'){
                    location.reload();
                }
                else{
                    alert(res.message);
                }
            }
        )
    }
}