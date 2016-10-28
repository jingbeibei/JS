define(['backbone', 'localstorage'], function(B){
    return B.Model.extend({
        // 通过第三方plugin实现本地存储功能，b-card是本
        // 地存储数据的命名空间，本地存储的key以b-card开头的
        localStorage: new B.LocalStorage("b-card"),

        defaults: {
            name: '',
            title: '',
            address: '',
            phone: '',
            qq: '',
            email: '',
            description: ''
        },

        // 第三方插件通过重写Backbone.sync()为
        // 模型中的save方法、fetch方法、destroy方法
        // 提供支持

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