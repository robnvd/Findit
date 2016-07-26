(function () {

    angular.module('LicentaWeb', [
        'LicentaWeb.Controllers',
        'LicentaWeb.Services',
        'LicentaWeb.Directives',
        'LicentaWeb.Filters',
        'ngMap',
        'ui.router',
        'ui.bootstrap'
    ])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/home/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login/login.html',
                    controller: 'loginController',
                    controllerAs: 'vm'
                })
                .state('bookmarks', {
                    url: '/bookmarks',
                    templateUrl: 'templates/home/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: true
                    }
                })
                .state('reviews', {
                    url: '/reviews',
                    templateUrl: 'templates/home/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: true
                    }
                });
            $urlRouterProvider.otherwise('/home');
        }]);

    // Controller module

    angular.module('LicentaWeb.Controllers', [
        'angular-jwt',
        'ngMap',
        'ui.bootstrap',
        'geolocation',
        'ngMessages',
        'stormpath',
        'stormpath.templates'
    ])
        .run(['$stormpath', ($stormpath) => {
            $stormpath.uiRouter({
                loginState: 'login',
                defaultPostLoginState: 'home'
            });
        }]);

    //Services module

    angular.module('LicentaWeb.Services', [])
        .constant('constants', {
            apiUrl: 'http://localhost:10076/api/',
        });

    //Directives module

    angular.module('LicentaWeb.Directives', []);
    angular.module('LicentaWeb.Filters', []);
})();