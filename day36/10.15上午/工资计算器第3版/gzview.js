define(['jquery', 'backbone'], function($, B){
    return B.View.extend({
        el: $('body')[0],

        events: {
            'click form>button': 'doCalc',
            'input form': 'hideResults'
        },

        doCalc: function(){
            var jishu = this.$('#jishu').val(),
                jixiao = this.$('#jixiao').val(),
                jiangjin = this.$('#jiangjin').val()
            
            this.model.set({
                jiben: parseFloat(jishu) || 0,
                jixiao: parseFloat(jixiao) || 0,
                jiangjin: parseFloat(jiangjin) || 0
            })

            if(!this.model.isValid()){
                alert(this.model.validationError)
                return
            }
            
            var data = this.model.calc()

            // this.$ 会在视图关联的标签元素的范围内执行筛选器
            // 因此使用this.$要比直接使用$速度更快

            this.$('#zonge').text(data.total.toFixed(2))
            this.$('#yanglao').text(data.shebao.yanglao.toFixed(2))
            this.$('#yiliao').text(data.shebao.yiliao.toFixed(2))
            this.$('#shiye').text(data.shebao.shiye.toFixed(2))
            this.$('#gongjijin').text(data.shebao.gongjijin.toFixed(2))
            this.$('#tongchou').text(data.shebao.tongchou.toFixed(2))
            this.$('#jishui').text(data.jishui.toFixed(2))
            this.$('#shui').text(data.shui.toFixed(2))
            this.$('#shifa').text(data.shifa.toFixed(2))
            
            this.$('section').slideDown()
        },

        hideResults: function(){
            this.$('section').fadeOut()
        }
    })
})