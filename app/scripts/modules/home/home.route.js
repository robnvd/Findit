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
                    templateUrl: 'templates/home/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: false
                    }
                }
            }
        ];
    }
})();
