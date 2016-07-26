(function () {
    angular
        .module('LicentaWeb.Controllers')
        .controller('navController', controller);

    controller.$inject = ['$location'];
    function controller($location) {
        var vm = this;

        vm.isActive = function (route) {
            return route === $location.path();
        };
    }
})();