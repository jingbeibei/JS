define(['jquery', 'underscore', 'backbone'], function($, _, B){
    return B.View.extend({
        el: $('form')[0],

        events: {
            'submit': 'submit'
        },

        initialize: function(){
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
                location.href = 'index.html'
            }
        }
    })
})