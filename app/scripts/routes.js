(function () {

    angular.module('LicentaWeb')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('home', {
                    url: '/home',
                    template: 'areas/home/home.html',
                    //controller: 'homeController'
                })
            $urlRouterProvider.otherwise('/home');
        }]);
})();