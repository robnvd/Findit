(function() {
    angular
        .module('LicentaWeb.Controllers')
        .controller('homeController', controller);

    controller.$inject = ['$scope', 'auth', 'store'];
    function controller($scope, auth, store) {
        var vm = this;
        $scope.login = function() {
            auth.signin();
        };
    }
})();