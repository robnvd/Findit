(function () {
    'use strict';

    angular
        .module('Findit.Account')
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
                        main: {
                            templateUrl: 'templates/account/login.tpl.html',
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
                        main: {
                            templateUrl: 'templates/account/signup.tpl.html',
                            controller: 'signupController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'forgot',
                config: {
                    url: '/forgot',
                    views: {
                        main: {
                            templateUrl: 'templates/account/forgot.tpl.html',
                            controller: 'forgotController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'reset',
                config: {
                    url: '/reset',
                    views: {
                        main: {
                            templateUrl: 'templates/account/reset.tpl.html',
                            controller: 'resetController',
                            controllerAs: 'vm',
                        }
                    },
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'socialLogin',
                config: {
                    url: '/sociallogin',
                    views: {
                        main: {
                            templateUrl: 'templates/account/social.tpl.html',
                            controller: 'socialController',
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
