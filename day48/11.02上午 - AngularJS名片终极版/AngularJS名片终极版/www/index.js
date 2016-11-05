var m = angular.module('Card', ['ngResource', 'ngAnimate', 'ngRoute'])

m.controller('CardController', 
    ['$rootScope', 'Card',
    function($rootScope, Card){

    Card.get(function(res){
        $rootScope.card = res.data
    })
}])

m.controller('EditController', 
    ['$scope', '$rootScope', '$window', 'Card',
    function ($scope, $rootScope, $window, Card) {

    $scope.save = function(){
        Card.update($rootScope.card, function(){
            $window.location.href = '#/'
        })
    }
}])

m.factory('Card', ['$resource', function($resource){
    return $resource('/api/card/me', null, {
        update: {method: 'PUT'}
    })
}])

m.config(['$routeProvider', function($rp){
    $rp.when('/edit', {
        templateUrl: 'edit.html'
    })
}])

m.animation('.editor', ['$document', '$timeout', function($doc, $t){
    return {
        enter: function(el, done){
            $doc.find('main').removeClass('cardRight').addClass('cardLeft')
            el.addClass('animated zoomInRight')
            $t(done, 1000)
        },
        leave: function(el, done){
            $doc.find('main').removeClass('cardLeft').addClass('cardRight')
            el.addClass('animated zoomOutRight')
            $t(function(){
                el.css('display', 'none')
                done()
            }, 1000)
        }
    }
}])