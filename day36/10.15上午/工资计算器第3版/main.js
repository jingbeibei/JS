require(['gzmodel' ,'gzview'], function(Model, View){
    new View({
        model: new Model()
    });
});