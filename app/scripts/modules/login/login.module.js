(function () {
    'use strict';

    angular.module('Findit.Login', [
        'Findit.Core'
    ]);

    appRun.$inject = ['$rootScope', '$state', 'logger'];

    function appRun($rootScope, $state, logger) {
        $rootScope.$on('$sessionEnd', function () {
            logger.success('Session ended')
            $state.transitionTo('login');
        });

        $rootScope.$on('$authenticated', function (event, response) {
            alert();
            console.log(event);
            console.log(response);
        });
    }
})();
