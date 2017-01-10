(function () {
    'use strict';

    angular.module('Findit.Core')
        // .constant('baseUrl', 'https://api.find-it.tech')
        // .constant('apiUrl', 'https://api.find-it.tech/api/');
        .constant('baseUrl', 'http://localhost:5000')
        .constant('apiUrl', 'http://localhost:5000/api/')
        .constant('auth0ClientID', '5zc4xm7BSkl3zPRAYq9Fga4v1HyZLRcx')
        .constant('auth0Domain', 'robnvd.eu.auth0.com')
        .constant('auth0WhiteList', ['localhost', 'localhost:5000'])
        ;
})();