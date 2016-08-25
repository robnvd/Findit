(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['$scope', '$user'];
    function controller($scope, $user) {
        var vm = this;

        vm.userData = $user.currentUser;

        $scope.$on('$authenticated', function (event, userData) {
            vm.userData = userData;
        });
    }
})();