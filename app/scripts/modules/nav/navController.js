(function () {
    angular
        .module('LicentaWeb.Controllers')
        .controller('navController', controller);

    controller.$inject = ['$scope', 'auth', 'store'];
    function controller($scope, auth, store) {
        $scope.auth = auth;

        $scope.login = function () {
            auth.signin({}, onLoginSuccess, onLoginFailed);
        };

        $scope.logout = function () {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            store.remove('refreshToken');
        };

        function onLoginSuccess(profile, token) {
            $scope.message = '';
            store.set('profile', profile);
            store.set('token', token);
            // $location.path('/');
            $scope.loading = false;
            console.log(auth);
        }

        function onLoginFailed() {
            $scope.message = 'invalid credentials';
            $scope.loading = false;
        }
    }
})();