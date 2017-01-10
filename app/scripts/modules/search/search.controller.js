(function () {
    angular
        .module('Findit.Search')
        .controller('searchController', controller);

    controller.$inject = ['$scope', 'placeService', 'mapService', '$http'];
    function controller($scope, placeService, mapService, $http) {
        var vm = this;

        vm.types = ['geocode', 'establishment', 'address'];

        vm.searchData = {
            location: 'near',
            radius: 700
        };

        mapService.init({
            radius: vm.searchData.radius,
            centerMarkerDragEndedCallback: _centerMarkerDragEndedCallback
        }).then(() => {
            $scope.$watch(() => vm.searchData.radius, (newVal) => {
                mapService.setRadiusSize(newVal);
            });

            vm.locationChanged = (location) => {
                if (location === 'near') {
                    mapService.getCurrentLocation().then((data) => {
                        mapService.setMapCenter(data.coords.latitude, data.coords.longitude, true, true);
                        mapService.searchNearbyPlaces().then(_resolvePlaces, _handleErrors);
                        vm.searchData.remoteLocation = null;
                    }, (err) => { console.log(err); });
                }
            };

            vm.remoteLocationChanged = function () {
                const currentPlace = this.getPlace();
                if (currentPlace) {
                    if (currentPlace.geometry && currentPlace.geometry.location) {
                        const location = currentPlace.geometry.location;
                        mapService.setMapCenter(location.lat(), location.lng(), true, true);
                        mapService.searchNearbyPlaces().then(_resolvePlaces, _handleErrors);
                    } else {
                        console.log('Could not obtain coordinates, try another place');
                    }
                } else {
                    console.log('No place was found');
                }
            };

            vm.search = () => {
                if(vm.searchData.place && vm.searchData.place.length > 0) {
                    mapService.searchPlacesByText(vm.searchData.place).then(_resolvePlaces, _handleErrors)
                } else {
                    mapService.searchNearbyPlaces().then(_resolvePlaces, _handleErrors);
                }
            }

            mapService.searchNearbyPlaces().then(_resolvePlaces, _handleErrors);

        }, (err) => {
            console.log(err);
        });

        function _centerMarkerDragEndedCallback(centerMarker) {
            const center = centerMarker.getPosition();
            mapService.setMapCenter(center, null, true, true);
            mapService.clearAllMarkers();
            mapService.searchNearbyPlaces().then(_resolvePlaces, _handleErrors);
        }

        function _resolvePlaces(results) {
            mapService.clearAllMarkers();
            const center = mapService.getMapCenter();
            for (let i = 0; i < results.length; i++) {
                if (google.maps.geometry.spherical.computeDistanceBetween(results[i].geometry.location, center) <= vm.searchData.radius) {
                    mapService.addMarkerToMapForPlace(results[i], _markerClickCallback);
                }
            }
        }

        function _markerClickCallback(place) {
            placeService.showPlaceDetails(place);
        };

        function _handleErrors(err) {
            console.log(err);
        }
    }
})();