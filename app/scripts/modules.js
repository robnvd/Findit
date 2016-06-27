(function () {
    angular.module('LicentaWeb.Controllers', ['uiGmapgoogle-maps', 'ngMessages'])
        .config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCBPHeuLgfGtYoiSK6vxHo9MRtDTNJiNrE',
                //libraries: 'weather, geometry, visualization',
            });
        }]);

    angular.module('LicentaWeb.Services', ['angular-storage', 'auth0', 'angular-jwt'])
        .config(['$httpProvider', 'authProvider', 'jwtInterceptorProvider', function ($httpProvider, authProvider, jwtInterceptorProvider) {

            authProvider.init({
                domain: 'robnvd.eu.auth0.com',
                clientID: '5zc4xm7BSkl3zPRAYq9Fga4v1HyZLRcx',
                loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
            });

            jwtInterceptorProvider.tokenGetter = function (store, jwtHelper, auth) {
                var idToken = store.get('token');
                var refreshToken = store.get('refreshToken');
                // If no token return null
                if (!idToken || !refreshToken) {
                    return null;
                }
                // If token is expired, get a new one
                if (jwtHelper.isTokenExpired(idToken)) {
                    return auth.refreshIdToken(refreshToken).then(function (idToken) {
                        store.set('token', idToken);
                        return idToken;
                    });
                } else {
                    return idToken;
                }
            }

            $httpProvider.interceptors.push('jwtInterceptor');
        }])
        .run(['authService', 'auth', function (authService, auth) {
            auth.hookEvents();
            // authService.autologin();
            // authService.broadcastUserLoginState();
        }])
        .constant('constants', {
            apiUrl: 'http://localhost:10076/api/',
        });

    angular.module('LicentaWeb.Directives', []);

})();