require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'localstorage': 'libs/backbone.localStorage'
    }
})

require(['views/index', 'models/card'], function(View, Card){
    var card = new Card({id: 'me'})
    card.fetch()

    new View({model: card})
})