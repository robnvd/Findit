(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['authService'];
    function controller(authService) {
        var vm = this;

        vm.login = authService.login;
        vm.logout = authService.logout;

        authService.currentUser().then(_init);

        function _init(user) {
            vm.userData = user;
        }
    }
})();