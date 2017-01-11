(function () {
    'use strict';

    angular
        .module('Findit.Account', ['Findit.Core'])
        .config(config)
        .run(appRun);


    config.$inject = ['lockProvider', 'jwtOptionsProvider', '$httpProvider', 'auth0ClientID', 'auth0Domain'];
    function config(lockProvider, jwtOptionsProvider, $httpProvider, auth0ClientID, auth0Domain) {
        lockProvider.init({
            clientID: auth0ClientID,
            domain: auth0Domain,
            options: {
                auth: {
                    params: {
                        scope: 'openid name email picture'
                    },
                    redirect: false
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
