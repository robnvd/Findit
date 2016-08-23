(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    views: {
                        'map': {
                            templateUrl: 'templates/home/map.template.html',
                            controller: 'homeController',
                            controllerAs: 'vm',
                        },
                        'search': {
                            templateUrl: 'templates/home/search.template.html',
                            controller: 'searchController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            }
        ];
    }
})();
