(function () {
    angular
        .module('LicentaWeb.Controllers')
        .controller('homeController', controller);

    controller.$inject = ['$scope', 'auth', 'store', 'geolocation', '$timeout', 'uiGmapGoogleMapApi'];
    function controller($scope, auth, store, geolocation, $timeout, uiGmapGoogleMapApi) {

        $scope.searchData = {
            location: 'near',
            radius: 700
        };

        $scope.map = {
            center: {
                latitude: 44.4267674,
                longitude: 26.102538399999958
            },
            options: {
                scrollwheel: true,
            },
            events: {
                bounds_changed: function (map) {
                    //console.log('map bounds changed');
                    //console.log(map);
                },
                center_changed: function (map) {
                    //console.log('map center changed');
                    //console.log(map);
                },
            },
            control: {},
            zoom: 14
        };

        $scope.place = {
            template: 'place-searchbox.html',
            events: {
                places_changed: function (searchbox) {
                    var places = searchbox.getPlaces();
                    console.log(places);
                }
            }
        }

        $scope.remoteLocation = {
            template: 'remoteLocation-searchbox.html',
            events: {
                places_changed: (searchBox) => {
                    const places = searchBox.getPlaces();
                    if (places.length > 0) {
                        const [place] = places;
                        if (place.geometry && place.geometry.location) {
                            const location = place.geometry.location;
                            changeMapCenter(location.lat(), location.lng());
                        } else {
                            console.log('Could not obtain coordinates, try another place');
                        }
                    } else {
                        console.log('No place was found');
                    }
                }
            }
        }

        geolocation.getLocation().then((data) => {
            changeMapCenter(data.coords.latitude, data.coords.longitude);
        }, () => {
            changeMapCenter(44.4267674, 26.102538399999958);
        });

        $scope.login = () => {
            auth.signin();
        };

        $scope.search = () => {
            console.log($scope.searchData);
        }
        var changeMapCenter = (lat, long) => {
            $scope.map.center = {
                latitude: lat,
                longitude: long
            };
        };
       
        uiGmapGoogleMapApi.then((maps) => {
            //console.log(maps.places.SearchBox.getPlaces());
        });

        // $timeout(function () {
        //     console.log('done stuff');
        //     console.log($scope.map.control);
        //     console.log($scope.map.control.getGMap());
        //     console.log($scope.map.control.getGMap().getBounds());
        // }, 5000);
    }
})();