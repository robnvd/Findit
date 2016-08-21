(function () {
    angular
        .module('Findit.Home')
        .controller('homeController', controller);

    controller.$inject = ['$scope', 'NgMap', 'homeService', '$uibModal', 'searchResultTypes'];
    function controller($scope, NgMap, homeService, $uibModal, searchResultTypes) {
        var vm = this;

        vm.searchData = {
            location: 'near',
            radius: 700
        };

        vm.locationChanged = (location) => {
            if (location === 'near') {
                homeService.getCurrentLocation().then((data) => {
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
            //TODO make center marker green and draggable
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
                    types: searchResultTypes
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
                        googlePlacesService: () => vm.placesService
                    }
                });
            };

            vm.clearAllMarkers = () => {
                angular.forEach(vm.markers, (marker) => {
                    marker.setMap(null);
                });
                //TODO delete from memory
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

        //vm.types = '[\'geocode\', \'establishment\', \'address\']';

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

        vm.search = () => {
            //TODO IMPROVE
            vm.seachPlacesByText(vm.searchData.place);
        }
    }
})();