(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .service('authService', authService);

    authService.$inject = ['lock', 'authManager', '$q', 'storage', '$state'];
    function authService(lock, authManager, $q, storage, $state) {
        this.login = login;
        this.logout = logout;
        this.currentUser = currentUser;
        this.registerAuthenticationListener = registerAuthenticationListener;

        var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
        var deferredProfile = $q.defer();

        if (userProfile) {
            deferredProfile.resolve(userProfile);
        }

        function login() {
            lock.show();
        }

        function logout() {
            localStorage.removeItem('id_token');
            authManager.unauthenticate();
        }

        function currentUser() {
            return deferredProfile.promise;
        }

        function registerAuthenticationListener() {
            lock.on('authenticated', function (authResult) {

                localStorage.setItem('id_token', authResult.idToken);
                authManager.authenticate();

                lock.getUserInfo(authResult.accessToken, function (error, profile) {
                    if (error) return console.log(error);

                    localStorage.setItem('profile', JSON.stringify(profile));
                    deferredProfile.resolve(profile);

                    $state.go('root.search');
                });
            });
        }
    }
})();