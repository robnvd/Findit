(function() {
    'use strict';

    angular.module('Findit.Core', [
        'ngMap', 'ui.router', 'ui.bootstrap', 'ngGeolocation', 'angular-jwt',
        'ngAnimate', 'ngSanitize', 'auth0.lock', 'ngMessages',
        'blocks.exception', 'blocks.logger', 'blocks.router', 'LocalStorageModule', 
        'angularSpinner', 'blockUI', 'angular-confirm'
    ]);
})();