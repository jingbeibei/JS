define(['gongzi', 'backbone'], function($_$, B){
    return B.Model.extend({
        defaults: {
            jiben: 0,
            jixiao: 0,
            jiangjin: 0
        },

        validate: function(attrs, options){
            var total = attrs.jiben + attrs.jixiao + attrs.jiangjin
            if(total > 35000){
                return '抱歉，本计算器只为贫下中农服务！'
            }
        },

        calc: function(){
            return $_$(this.get('jiben'), this.get('jixiao'), this.get('jiangjin'))
        }
    })
})