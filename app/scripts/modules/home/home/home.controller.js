(function () {
    angular
        .module('Findit.Home')
        .controller('homeController', controller);

    controller.$inject = ['$scope', 'mapService', 'homeService', '$uibModal'];
    function controller($scope, mapService, homeService, $uibModal) {
        var vm = this;

        vm.searchData = {
            location: 'near',
            radius: 700
        };

        mapService.init({
            radius: vm.searchData.radius,
            centerMarkerPositionChangedCallback: _centerMarkerPositionChangedCallback
        }).then(() => {
            $scope.$watch(() => vm.searchData.radius, (newVal) => {
                mapService.setRadiusSize(newVal);
            });

            vm.locationChanged = (location) => {
                if (location === 'near') {
                    homeService.getCurrentLocation().then((data) => {
                        mapService.setMapCenter(data.coords.latitude, data.coords.longitude);
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
                        mapService.setMapCenter(location.lat(), location.lng());
                        mapService.searchNearbyPlaces().then(_resolvePlaces, _handleErrors);
                    } else {
                        console.log('Could not obtain coordinates, try another place');
                    }
                } else {
                    console.log('No place was found');
                }
            };

            vm.search = () => {
                mapService.searchPlacesByText(vm.searchData.place).then(_resolvePlaces, _handleErrors)
            }

            mapService.searchNearbyPlaces().then(_resolvePlaces, _handleErrors);

        }, (err) => {
            console.log(err);
        });

        function _centerMarkerPositionChangedCallback(centerMarker) {
            const center = centerMarker.getPosition();
            mapService.setMapCenterWithoutCenterMarker(center);
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
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'templates/home/place.html',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                size: 'lg',
                controller: 'placeController',
                controllerAs: 'vm',
                resolve: {
                    place: () => place
                }
            });
        };

        function _handleErrors(err) {
            console.log(err);
        }
    }
})();