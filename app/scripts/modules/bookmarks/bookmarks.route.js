(function () {
    'use strict';

    angular
        .module('Findit.Bookmarks')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'bookmarks',
                config: {
                    url: '/bookmarks',
                    templateUrl: 'templates/bookmarks/bookmarks.html',
                    controller: 'bookmarksController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: true
                    }
                }
            }
        ];
    }
})();
