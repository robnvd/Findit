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
                state: 'root.bookmarks',
                config: {
                    url: '/bookmarks',
                    templateUrl: 'modules/bookmarks/bookmarks.tpl.html',
                    controller: 'bookmarksController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
