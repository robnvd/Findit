(function () {
    'use strict';

    angular
        .module('Findit.Login', ['Findit.Core'])
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'logger', 'localStorageService'];

    function appRun($rootScope, $state, logger, localStorageService) {
        $rootScope.$on('$sessionEnd', function () {
            logger.success('Session ended')
            $state.transitionTo('login');
        });

        $rootScope.$on('$authenticated', function (event, userData) {
            localStorageService.set('userData', userData);
        });
    }
})();
