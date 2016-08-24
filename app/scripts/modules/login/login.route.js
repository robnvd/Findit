(function () {
    'use strict';

    angular
        .module('Findit.Login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    views: {
                        'map': {
                            templateUrl: 'templates/home/map.template.html',
                            controller: 'mapController',
                            controllerAs: 'vm',
                        },
                        'sidePanel': {
                            templateUrl: 'templates/login/login.html',
                            controller: 'loginController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'signup',
                config: {
                    url: '/signup',
                    views: {
                        'map': {
                            templateUrl: 'templates/home/map.template.html',
                            controller: 'mapController',
                            controllerAs: 'vm',
                        },
                        'sidePanel': {
                            templateUrl: 'templates/login/signup.html',
                            controller: 'signupController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            },
        ];
    }
})();
