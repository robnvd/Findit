(function () {
    angular
        .module('Findit.Map')
        .controller('mapController', controller);

    controller.$inject = ['$scope', 'mapService', 'logger', 'blockUI'];
    function controller($scope, mapService, logger, blockUI) {
        var vm = this;

        mapService.init({
            radius: 700
        }).then(_mapInitialized, _handleErrors);

        function _mapInitialized() {
            mapService.searchNearbyPlaces().then(mapService.showPlacesOnMap, _handleErrors);
            mapService.mapInitialized = true;
        }

        function _handleErrors(err) {
            logger.error(err);
        }
        var searchPanelBlock = blockUI.instances.get('search-panel');
        searchPanelBlock.start();
        $scope.$watch(() => mapService.mapInitialized, (newValue, oldValue) => {
            if(newValue == oldValue) return;
            if(newValue) searchPanelBlock.stop();
        });
    }
})();