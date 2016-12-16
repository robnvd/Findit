(function () {
    'use strict';

    angular
        .module('Findit.Account', ['Findit.Core'])
        .config(config)
        .run(appRun);


    config.$inject = ['lockProvider', 'jwtOptionsProvider', '$httpProvider'];
    function config(lockProvider, jwtOptionsProvider, $httpProvider) {
        lockProvider.init({
            clientID: '5zc4xm7BSkl3zPRAYq9Fga4v1HyZLRcx',
            domain: 'robnvd.eu.auth0.com',
            options: {
                auth: {
                    params: {
                        scope: 'openid name email picture'
                    }
                }
            }
        });
    }

    appRun.$inject = ['authService', 'authManager', 'lock'];

    function appRun(authService, authManager, lock) {
        authService.registerAuthenticationListener();
        authManager.checkAuthOnRefresh();

        lock.interceptHash();
    }
})();
