(function () {
    'use strict';

    angular
        .module('Findit.Search')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.search',
                config: {
                    url: '/',
                    templateUrl: 'templates/search.tpl.html',
                    controller: 'searchController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: false
                    }
                }
            }
        ];
    }
})();
