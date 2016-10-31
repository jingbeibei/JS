require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'localstorage': 'libs/backbone.localStorage'
    }
})

require(['views/edit', 'models/card'], function(View, Card){
    // 模型的id属性用来唯一标识一个数据模型
    // 在存储数据，获取数据时都需要使用它
    var card = new Card({id: 'me'})
    
    card.fetch().done(function(){
        new View({model: card})
    })
})