(function () {
    angular
        .module('Findit.Search')
        .controller('searchController', controller);

    controller.$inject = ['$scope', 'mapService', 'logger', 'blockUI'];
    function controller($scope, mapService, logger, blockUI) {
        var vm = this;

        vm.types = ['geocode', 'establishment', 'address'];

        vm.searchData = {
            location: 'near',
            radius: 700
        };

        vm.radiusChange = function () {
            mapService.setRadiusSize(vm.searchData.radius);
        };

        vm.locationChanged = (location) => {
            if (location === 'near') {
                mapService.getCurrentLocation().then((data) => {
                    mapService.setMapCenter(data.coords.latitude, data.coords.longitude, true, true);
                    mapService.searchNearbyPlaces().then(mapService.showPlacesOnMap, _handleErrors);
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
                    mapService.searchNearbyPlaces().then(mapService.showPlacesOnMap, _handleErrors);
                } else {
                    console.log('Could not obtain coordinates, try another place');
                }
            } else {
                console.log('No place was found');
            }
        };

        vm.search = () => {
            if (vm.searchData.place && vm.searchData.place.length > 0) {
                mapService.searchPlacesByText(vm.searchData.place).then(mapService.showPlacesOnMap, _handleErrors)
            } else {
                _searchNearbyPlacesAndShowOnMap();
            }
        };

        vm.reset = () => {
            mapService.mapInitialized = false;
            mapService.init({
                radius: vm.searchData.radius
            }).then(_searchNearbyPlacesAndShowOnMap, _handleErrors);
        };

        function _searchNearbyPlacesAndShowOnMap() {
            mapService.searchNearbyPlaces().then(mapService.showPlacesOnMap, _handleErrors);
            mapService.mapInitialized = true;
        }

        function _handleErrors(err) {
            logger.error(err);
        }
    }
})();