(function () {
    'use strict';

    angular
        .module('Findit.Account', ['Findit.Core'])
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'logger'];

    function appRun($rootScope, $state, logger) {
        // $rootScope.$on('$sessionEnd', function () {
        //     logger.success('Session ended')
        //     $state.transitionTo('login');
        // });

        // if (!$user.currentUser) {
        //     $user.get();
        // }
    }
})();
