(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['authService', '$state'];
    function controller(authService, $state) {
        var vm = this;

        vm.login = authService.login;
        vm.logout = function() { 
            authService.logout();
            $state.go('root.search');
        };

        authService.currentUser().then(_init);

        function _init(user) {
            vm.userData = user;
        }
    }
})();