(function () {
    angular
        .module('LicentaWeb.Controllers')
        .controller('navController', controller);

    controller.$inject = ['$scope', 'auth', 'store', '$uibModal'];
    function controller($scope, auth, store, $uibModal) {
        $scope.login = function() {
            $uibModal.open({
                templateUrl: 'scripts/modules/nav/login.html',
                controller: 'loginController'
            });
        };
    }
})();