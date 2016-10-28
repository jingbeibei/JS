define(['jquery', 'backbone'], function($, B){
    return B.View.extend({
        el: $('body')[0],

        events: {
            'click div.edit': 'goEdit'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render)
        },

        render: function(){
            this.$('h1').html(this.model.get('name') + 
                '<small>' + 
                this.model.get('title') + 
                '</small>');

            this.$('address .addr').text(this.model.get('address'));
            this.$('address .tel').text(this.model.get('phone'));
            this.$('address .qq').text(this.model.get('qq'));
            this.$('address .email').text(this.model.get('email'));
            this.$('aside p').text(this.model.get('description'));
        },

        goEdit: function(){
            location.hash = '#edit';
        },

        showButton: function(){
            this.$('div.edit').fadeIn();
        }, 

        hideButton: function(){
            this.$('div.edit').fadeOut();
        }
    })
})