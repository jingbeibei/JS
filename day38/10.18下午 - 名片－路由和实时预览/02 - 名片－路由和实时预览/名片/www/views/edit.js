define(['jquery', 'underscore', 'backbone'], function($, _, B){
    return B.View.extend({
        el: $('form')[0],

        events: {
            'submit': 'submit',
            'input': 'input'
        },

        input: function(ev){
            // 调用set()方法修改模型中的数据时，会触发一系列事件
            // 我们常常通过监听这些事件，来动态调整界面中数据的显示
            this.model.set(ev.target.name, ev.target.value);
        },

        render: function(){
            this.$('[name=name]').val(this.model.get('name'))
            this.$('[name=title]').val(this.model.get('title'))
            this.$('[name=phone]').val(this.model.get('phone'))
            this.$('[name=qq]').val(this.model.get('qq'))
            this.$('[name=email]').val(this.model.get('email'))
            this.$('[name=address]').val(this.model.get('address'))
            this.$('[name=description]').val(this.model.get('description'))
        },

        isValid: function(){
            if(!this.model.isValid()){
                this.$('input,textarea')
                .removeClass('error')
                .removeAttr('title')

                var error = this.model.validationError
                this.$('[name='+ error.attr +']')
                .addClass('error')
                .attr('title', error.message)
                .focus()

                return false
            }

            return true
        },

        submit: function(ev){
            ev.preventDefault()
            
            var arr = this.$el.serializeArray()
            var data = _.reduce(arr, function(prev, item){
                prev[item.name] = item.value
                return prev
            }, {})

            this.model.set(data)

            if(this.isValid()){
                this.model.save()
                .done(function(res){
                    if(res.code == 'success'){
                        location.hash = '#'
                    }
                    else{
                        alert(res.message)
                    }
                })
                .fail(function(){
                    alert('网络故障，请稍后再试！')
                })
            }
        },

        show: function(){
            var top = ($(window).innerHeight() - this.$el.outerHeight()) / 2
            this.$el.css('top', top)
            .animate({
                'right': '50px'
            })
        },

        hide: function(){
            this.$el.animate({
                'right': '-320px'
            })
        }
    })
})