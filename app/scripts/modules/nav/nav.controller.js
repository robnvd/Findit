(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['authService'];
    function controller(authService) {
        var vm = this;

        vm.login = authService.login();
    }
})();