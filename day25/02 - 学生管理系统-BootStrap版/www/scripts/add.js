// add.js 提交学生信息,增加一个学生的信息

$('form').submit(function(ev){
    ev.preventDefault()
    
    $.post(
        $(this).attr('action'),
        $(this).serialize(),
        function(res){
            if(res.code == 'success'){
                location.href = '/'
            }
            else{
                alert(res.message)
            }
        }
    )
})