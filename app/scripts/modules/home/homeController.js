(function () {
    angular
        .module('LicentaWeb.Controllers')
        .controller('homeController', controller);

    controller.$inject = ['$scope', 'auth', 'store', 'geolocation'];
    function controller($scope, auth, store, geolocation) {

        $scope.searchData = {
            location: 'near',
            radius: 700
        };

        $scope.place = {
            template: 'place-searchbox.html',
            events: {
                places_changed: function(searchbox) {
                    var places = searchbox.getPlaces();
                    console.log(places);
                }
            }
        }

        $scope.remoteLocation = {
            template: 'remoteLocation-searchbox.html',
            events: {
                places_changed: function (searchBox) {
                    var places = searchBox.getPlaces();
                    if (places.length > 0) {
                        if (places[0].geometry && places[0].geometry.location) {
                            changeMapCenter(places[0].geometry.location.lat(), places[0].geometry.location.lng());
                        } else {
                            console.log('Could not obtain coordinates, try another place');
                        }
                    } else {
                        console.log('No place was found');
                    }
                }
            }
        }

        $scope.map = { center: { latitude: 44.4267674, longitude: 26.102538399999958 }, zoom: 14 };
        $scope.options = { scrollwheel: true };

        geolocation.getLocation().then(function (data) {
            changeMapCenter(data.coords.latitude, data.coords.longitude);
        }, function () {
            changeMapCenter(44.4267674, 26.102538399999958);
        })

        $scope.login = function () {
            auth.signin();
        };

        $scope.search = function () {
            console.log($scope.searchData);
        };

        var changeMapCenter = function(lat, long) {
            $scope.map = {
                center: {
                    latitude: lat,
                    longitude: long
                },
                zoom: 14
            };
        };
    }
})();