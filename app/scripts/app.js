(function () {

    angular.module('LicentaWeb', [
        'LicentaWeb.Controllers',
        'LicentaWeb.Services',
        'LicentaWeb.Directives',
        'uiGmapgoogle-maps',
        'ui.router',
        'ui.bootstrap'
    ])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/home/home.html',
                    controller: 'homeController'
                })
            $urlRouterProvider.otherwise('/home');
        }]);

    // Controller module

    angular.module('LicentaWeb.Controllers', [
        'angular-storage',
        'auth0',
        'angular-jwt',
        'uiGmapgoogle-maps',
        'ui.bootstrap',
        'geolocation',
        'ngMessages'
    ])
        .config(['$httpProvider', 'authProvider', 'jwtInterceptorProvider',
            function ($httpProvider, authProvider, jwtInterceptorProvider,) {
                authProvider.init({
                    domain: 'robnvd.eu.auth0.com',
                    clientID: '5zc4xm7BSkl3zPRAYq9Fga4v1HyZLRcx',
                    //loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
                });

                //Called when login is successful
                authProvider.on('loginSuccess', ['$state', 'profilePromise', 'idToken', 'store',
                    function ($state, profilePromise, idToken, store) {
                        // Successfully log in
                        // Access to user profile and token
                        //console.log('login success');
                        profilePromise.then(function (profile) {
                            // profile
                            store.set('profile', profile);
                            store.set('token', idToken);
                        });
                        $state.go('home');
                    }]);

                //Called when login fails
                authProvider.on('loginFailure', function () {
                    // If anything goes wrong
                    //console.log('login failure');
                });

                authProvider.on('authenticated', function () {
                    // if user is authenticated.
                    // Useful in re-authentication
                    //console.log('authenticated');
                });

                jwtInterceptorProvider.tokenGetter = ['store', 'jwtHelper', 'auth', function (store, jwtHelper, auth) {
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
                }];

                $httpProvider.interceptors.push('jwtInterceptor');
            }])
        .run(['auth', 'store', 'jwtHelper', '$rootScope',
            function (auth, store, jwtHelper, $rootScope) {
                // Listen to a location change event
                $rootScope.$on('$stateChangeStart', function () {
                    // Grab the user's token
                    var token = store.get('token');
                    // Check if token was actually stored
                    if (token) {
                        // Check if token is yet to expire
                        if (!jwtHelper.isTokenExpired(token)) {
                            // Check if the user is not authenticated
                            if (!auth.isAuthenticated) {
                                // Re-authenticate with the user's profile
                                auth.authenticate(store.get('profile'), token);
                            }
                        } else {
                            // Either show the login page
                            // $location.path('/');
                            // .. or
                            // or use the refresh token to get a new idToken
                            auth.refreshIdToken(token);
                        }
                    }

                });
            }]);

    //Services module

    angular.module('LicentaWeb.Services', [])
        .constant('constants', {
            apiUrl: 'http://localhost:10076/api/',
        });

    //Directives module

    angular.module('LicentaWeb.Directives', []);
})();