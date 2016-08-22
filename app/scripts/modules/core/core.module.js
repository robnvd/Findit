(function() {
    'use strict';

    angular.module('Findit.Core', [
        'ngMap', 'ui.router', 'ui.bootstrap', 'ngGeolocation', 'angular-jwt',
        'ngAnimate', 'ngSanitize', 'stormpath', 'stormpath.templates', 'ngMessages',
        'blocks.exception', 'blocks.logger', 'blocks.router', 'LocalStorageModule'
    ]);
})();