(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .service('authService', authService);

    authService.$inject = ['lock', 'authManager', '$q', 'storage'];
    function authService(lock, authManager, $q, storage) {
        this.login = login;
        this.logout = logout;
        this.get = get;
        this.registerAuthenticationListener = registerAuthenticationListener;

        ////////////////

        var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
        var deferredProfile = $q.defer();

        if (userProfile) {
            deferredProfile.resolve(userProfile);
        }

        ////////////////

        function login() {
            lock.show();
        }

        function logout() {
            localStorage.removeItem('id_token');
            authManager.unauthenticate();
        }

        function get() {
            return deferredProfile.promise;
        }

        function registerAuthenticationListener() {
            lock.on('authenticated', function (authResult) {

                lock.getProfile(authResult.idToken, function (error, profile) {
                    //todo change into tostr
                    if (error) return console.log(error);

                    localStorage.setItem('profile', JSON.stringify(profile));
                    deferredProfile.resolve(profile);
                })
                // storage.set('id_token', authResult.idToken);
                localStorage.setItem('id_token', authResult.idToken);
                authManager.authenticate();
            });
        }
    }
})();