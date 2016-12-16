(function () {
    'use strict';

    angular
        .module('Findit.Reviews')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.reviews',
                config: {
                    url: '/reviews',
                    templateUrl: 'templates/reviews.tpl.html',
                    controller: 'reviewsController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: true
                    }
                }
            }
        ];
    }
})();
