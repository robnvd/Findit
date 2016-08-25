(function () {
    'use strict';

    angular
        .module('Findit.Account', ['Findit.Core'])
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'logger', '$user'];

    function appRun($rootScope, $state, logger, $user) {
        $rootScope.$on('$sessionEnd', function () {
            logger.success('Session ended')
            $state.transitionTo('login');
        });

        if (!$user.currentUser) {
            $user.get();
        }
    }
})();
