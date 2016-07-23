(function () {
    angular
        .module('LicentaWeb.Controllers')
        .controller('homeController', controller);

    controller.$inject = ['$scope', 'auth', 'store', 'geolocation', 'NgMap', 'homeService', '$uibModal'];
    function controller($scope, auth, store, geolocation, NgMap, homeService, $uibModal) {
        var vm = this;
        vm.resultTypes = ['atm', 'bank', 'bar', 'beauty_salon', 'book_store', 'bus_Station', 'cafe',
            'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'city_hall',
            'clothing_store', 'convenience_store', 'dentist', 'department_store', 'doctor', 'electrician',
            'electronics_store', 'fire_station', 'florist', 'furniture_store', 'gas_station', 'gym',
            'hair_care', 'hardware_store', 'hospital', 'jewelry_store', 'laundry', 'library', 'liquor_store',
            'meal_delivery', 'meal_takeaway', 'movie_theater', 'night_club', 'park', 'parking', 'pet_store',
            'pharmacy', 'police', 'post_office', 'restaurant', 'school', 'shoe_store', 'shopping_mall', 'stadium',
            'store', 'subway_station', 'train_station', 'university', 'zoo'
        ];

        vm.searchData = {
            location: 'near',
            radius: 700
        };

        vm.locationChanged = (location) => {
            if (location === 'near') {
                geolocation.getLocation().then((data) => {
                    if (vm.changeMapCenterWithMarker) {
                        vm.changeMapCenterWithMarker(data.coords.latitude, data.coords.longitude);
                        vm.searchNearbyPlaces();
                        vm.searchData.remoteLocation = null;
                    }
                }, (err) => { console.log(err); });
            }
        };

        NgMap.getMap().then((map) => {
            //TODO Implement refresh-rate when near implemented (for mobiles)
            vm.map = map;
            vm.markers = [];

            vm.radius = new google.maps.Circle({
                center: map.getCenter(),
                radius: vm.searchData.radius,
                strokeColor: '#59C4C5',
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: '#59C4C5',
                fillOpacity: 0.2,
                map: map
            });
            vm.centerMarker = new google.maps.Marker({ position: map.getCenter(), map: map });

            $scope.$watch(() => vm.searchData.radius, (newVal) => {
                vm.radius.setRadius(newVal);
            });

            vm.placesService = new google.maps.places.PlacesService(map);

            vm.searchNearbyPlaces = () => {
                vm.clearAllMarkers();
                vm.placesService.nearbySearch({
                    location: vm.map.getCenter(),
                    radius: vm.searchData.radius,
                    types: vm.resultTypes
                }, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const center = vm.map.getCenter();
                        for (let i = 0; i < results.length; i++) {
                            if (google.maps.geometry.spherical.computeDistanceBetween(results[i].geometry.location, center) <= vm.searchData.radius) {
                                vm.markers.push(homeService.createMarker(vm.map, results[i], vm.markerClickCallback));
                            }
                        }
                    } else {
                        //TODO Handle errors
                    }
                });
            };

            vm.seachPlacesByText = (query) => {
                vm.clearAllMarkers();
                vm.placesService.textSearch({
                    location: vm.map.getCenter(),
                    radius: vm.searchData.radius,
                    query: query
                }, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        const center = vm.map.getCenter();
                        for (let i = 0; i < results.length; i++) {
                            if (google.maps.geometry.spherical.computeDistanceBetween(results[i].geometry.location, center) <= vm.searchData.radius) {
                                vm.markers.push(homeService.createMarker(vm.map, results[i], vm.markerClickCallback));
                            }
                        }
                    } else {
                        //TODO Handle errors
                    }
                });
            };

            vm.markerClickCallback = (place) => {
                $uibModal.open({
                    backdrop: 'static',
                    templateUrl: 'templates/home/place.html',
                    controller: 'placeController',
                    controllerAs: 'vm',
                    resolve: {
                        place: () => place,
                        placesService: () => vm.placesService
                    }
                });
            };

            vm.clearAllMarkers = () => {
                for (let marker of vm.markers) {
                    marker.setMap(null);
                }
                vm.markers = [];
            };

            vm.changeMapCenterWithMarker = (lat, long) => {
                const center = new google.maps.LatLng(lat, long);
                if (!vm.centerMarker.getMap()) {
                    vm.centerMarker.setMap(vm.map);
                }
                vm.centerMarker.setPosition(center);
                vm.radius.setCenter(center);
                vm.map.setCenter(center);
                vm.map.setZoom(16);
            };

            vm.ChangeMapCenterWithoutMarker = (lat, long) => {
                const center = new google.maps.LatLng(lat, long);
                vm.centerMarker.setMap(null);
                vm.radius.setCenter(center);
                vm.map.setCenter(center);
                vm.map.setZoom(16);
            };

            vm.searchNearbyPlaces();

        });

        vm.types = "['geocode', 'establishment', 'address']";

        vm.remoteLocationChanged = function () {
            console.log(vm.searchData.remoteLocation);
            const currentPlace = this.getPlace();
            if (currentPlace) {
                if (currentPlace.geometry && currentPlace.geometry.location) {
                    const location = currentPlace.geometry.location;
                    vm.ChangeMapCenterWithoutMarker(location.lat(), location.lng());
                    vm.searchNearbyPlaces();
                } else {
                    console.log('Could not obtain coordinates, try another place');
                }
            } else {
                console.log('No place was found');
            }
        };

        vm.login = () => {
            auth.signin();
        };

        vm.search = () => {
            //TODO IMPROVE
            vm.seachPlacesByText(vm.searchData.place);
        }
    }
})();