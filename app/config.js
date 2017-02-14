(function () {
    'use strict';

    angular.module('Findit.Core')
        // .constant('baseUrl', 'https://findit-api.azurewebsites.net')
        // .constant('apiUrl', 'https://findit-api.azurewebsites.net/api/')
        .constant('baseUrl', 'http://localhost:5000')
        .constant('apiUrl', 'http://localhost:5000/api/')
        .constant('auth0ClientID', '5zc4xm7BSkl3zPRAYq9Fga4v1HyZLRcx')
        .constant('auth0Domain', 'robnvd.eu.auth0.com')
        .constant('auth0WhiteList', ['localhost', 'localhost:5000', 'find-it.tech', 'findit-api.azurewebsites.net'])
        ;
})();