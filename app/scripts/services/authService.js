(function () {
    'use strict';

    angular
        .module('LicentaWeb.Services')
        .service('authService', service);

    service.$inject = ['$q', 'auth', 'store', '$rootScope'];
    function service($q, auth, store, $rootScope) {
        this.login = login;
        this.logout = logout;
        this.isAuth = isAuth;
        this.broadcastUserLoginState = broadcastUserLoginState;
        this.autologin = autologin;


        function login() {
            var deferred = $q.defer();

            auth.signin({
                closable: true,
                authParams: {
                    scope: 'openid offline_access',
                    device: 'Mobile device'
                }
            }, function (profile, token, accessToken, state, refreshToken) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                store.set('refreshToken', refreshToken);

                broadcastUserLoginState();

                deferred.resolve();
            }, function () {
                // Error callbacka
                broadcastUserLoginState();

                deferred.reject();
            });

            return deferred.promise;
        }

        function logout() {
            auth.signout();
            broadcastUserLoginState();

            store.remove('profile');
            store.remove('token');
            store.remove('refreshToken');
        }

        function isAuth() {
            return auth.isAuthenticated;
        }

        function broadcastUserLoginState(userLoginState) {
            $rootScope.$broadcast('toggleUserLoginState');
        }

        function autologin() {
            $rootScope.$on('$stateChangeStart', function () {
                if (!auth.isAuthenticated) {
                    var token = store.get('token');
                    if (token) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            });
        }
    }
})();