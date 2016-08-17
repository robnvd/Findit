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
            //TODO make abstract account state
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'templates/login/login.html',
                    controller: 'loginController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: false
                    }
                }
            },
            {
                state: 'signup',
                config: {
                    url: '/signup',
                    templateUrl: 'templates/login/signup.html',
                    controller: 'signupController',
                    controllerAs: 'vm',
                    sp: {
                        authenticate: false
                    }
                }
            },
        ];
    }
})();
