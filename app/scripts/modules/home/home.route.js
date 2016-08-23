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
                            controller: 'mapController',
                            controllerAs: 'vm',
                        },
                        'sidePanel': {
                            templateUrl: 'templates/home/search.template.html',
                            controller: 'searchController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'reviews',
                config: {
                    url: '/reviews',
                    views: {
                        'map': {
                            templateUrl: 'templates/home/map.template.html',
                            controller: 'mapController',
                            controllerAs: 'vm',
                        },
                        'sidePanel': {
                            templateUrl: 'templates/home/reviews.template.html',
                            controller: 'reviewsController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: true
                    }
                }
            },
            {
                state: 'bookmarks',
                config: {
                    url: '/bookmarks',
                    views: {
                        'map': {
                            templateUrl: 'templates/home/map.template.html',
                            controller: 'mapController',
                            controllerAs: 'vm',
                        },
                        'sidePanel': {
                            templateUrl: 'templates/home/bookmarks.template.html',
                            controller: 'bookmarksController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: true
                    }
                }
            }
        ];
    }
})();
