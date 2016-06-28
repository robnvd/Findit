(function() {
    angular
        .module('LicentaWeb.Controllers')
        .controller('homeController', controller);

    controller.$inject = ['$scope', 'auth', 'store', 'geolocation'];
    function controller($scope, auth, store, geolocation) {
        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        $scope.options = {scrollwheel: true};

        geolocation.getLocation().then(function(data){
            $scope.map = {
                center: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                },
                zoom: 14
            };
        }, function() {
            $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        })
        
        $scope.login = function() {
            auth.signin();
        };
    }
})();