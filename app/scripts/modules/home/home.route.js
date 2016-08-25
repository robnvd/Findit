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
                    views: {
                        'main': {
                            templateUrl: 'templates/home/map.tpl.html',
                            controller: 'mapController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'home.search',
                config: {
                    url: '/',
                    templateUrl: 'templates/home/search.tpl.html',
                    controller: 'searchController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'home.reviews',
                config: {
                    url: '/reviews',
                    templateUrl: 'templates/home/reviews.tpl.html',
                    controller: 'reviewsController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: true
                    }
                }
            },
            {
                state: 'home.bookmarks',
                config: {
                    url: '/bookmarks',
                    templateUrl: 'templates/home/bookmarks.tpl.html',
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
