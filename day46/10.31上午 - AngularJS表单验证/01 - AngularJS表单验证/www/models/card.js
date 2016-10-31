define(['backbone'], function(B){
    return B.Model.extend({
        urlRoot: '/api/card',

        // 将服务端返回的数据转换成Backbone需要形式（纯数据）
        parse: function(res, options){
            if(res.code == 'success'){
                return res.data
            }
        },

        defaults: {
            name: '',
            title: '',
            address: '',
            phone: '',
            qq: '',
            email: '',
            description: ''
        },

        validate: function(attrs, options){
            if(attrs.name.length < 1 || attrs.name.length > 8){
                return {attr: 'name', message: '名字必须填写且不能超过8个字符'}
            }
            if(attrs.title.length < 1 || attrs.title.length > 12){
                return {attr: 'title', message: '职位必须填写且不能超过12个字符'}
            }
            if(attrs.address.length < 1 || attrs.address.length > 20){
                return {attr: 'address', message: '地址必须填写且不能超过20个字符'}
            }
            if(attrs.phone.length != 11){
                return {attr: 'phone', message: '手机号不正确'}
            }
            if(attrs.qq.length < 6 || attrs.name.length > 11){
                return {attr: 'qq', message: 'QQ必须填写且不能超过11个字符'}
            }
            if(attrs.email.length < 3 || attrs.email.length > 25){
                return {attr: 'email', message: '电子邮箱必须填写且不能超过25个字符'}
            }
            if(attrs.description.length < 1 || attrs.description.length > 100){
                return {attr: 'description', message: '介绍必须填写且不能超过50个字符'}
            }
        }
    })
})