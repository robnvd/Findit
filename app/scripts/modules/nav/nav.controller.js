(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['$location', 'storage'];
    function controller($location, storage) {
        var vm = this;

        vm.userData = {};

        activate();

        ////////////////

        function activate() {
            debugger;
            vm.userData = storage.get('userData');
        }
    }
})();