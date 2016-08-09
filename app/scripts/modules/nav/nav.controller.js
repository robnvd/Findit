(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['$location'];
    function controller($location) {
        var vm = this;

        vm.isActive = function (route) {
            return route === $location.path();
        };
    }
})();