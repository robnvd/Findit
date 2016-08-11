(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['$location', 'storage', 'logger', '$user'];
    function controller($location, storage, logger, $user) {
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
                }).catch((error) => {
                    logger.error('User data retrieval failed', error, 'Fail');
                });
            } else {
                vm.userData = $user.currentUser;
            }
        }
    }
})();