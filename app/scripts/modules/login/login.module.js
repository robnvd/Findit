(function () {
    'use strict';

    angular
        .module('Findit.Login', ['Findit.Core'])
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'logger'];

    function appRun($rootScope, $state, logger) {
        $rootScope.$on('$sessionEnd', function () {
            logger.success('Session ended')
            $state.transitionTo('login');
        });

        $rootScope.$on('$authenticated', function (event, userData) {
            //User authenticated
        });
    }
})();
