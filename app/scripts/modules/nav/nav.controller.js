(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['$location', 'storage', 'logger', '$user', '$http'];
    function controller($location, storage, logger, $user, $http) {
        var vm = this;

        vm.userData = {};

        activate();

        ////////////////

        function activate() {
            setUserData();
        }

        function setUserData() {
            if (!$user.currentUser) {
                $user.get().then((user) => {
                    vm.userData = user;
                }, (error) => {
                    logger.error(error);
                });
            } else {
                vm.userData = $user.currentUser;
            }
        }
    }
})();