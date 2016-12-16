(function () {
    'use strict';

    angular
        .module('Findit.Reviews')
        .controller('reviewsController', reviewsController);

    reviewsController.$inject = ['reviewsService', 'placeService', 'mapService', '$uibModal', '$q', '$timeout', 'logger', '$scope'];
    function reviewsController(reviewsService, placeService, mapService, $uibModal, $q, $timeout, logger, $scope) {
        var vm = this;
        vm.reviews = [];

        vm.showPlaceDetails = function (review) {
            _markerClickCallback(review, true);
        };

        vm.showPlaceOnMap = function (review) {
            placeService.getGooglePlaceDetails(review.placeId)
                .then((place) => {
                    mapService.clearMap();
                    mapService.setMapCenter(place.geometry.location);
                    mapService.setMapZoom(16);
                    mapService.addMarkerToMapForPlace(place, _markerClickCallback)

                    _updateCachedPlaceData(review, place);
                }, _errorHandler);
        };

        $scope.$on('reviews-count-changed', () => _init());

        _init();

        ////////////////

        function _init() {
            vm.dataIsLoading = true;
            reviewsService.getPersonReviews()
                .then(_resolveGetPersonReviews, _errorHandler)
                .then(() => {
                    vm.dataIsLoading = false;
                    vm.noData = vm.reviews.length <= 0;
                });
        }

        function _resolveGetPersonReviews(response) {
            if (response && response.data) {
                vm.reviews = response.data;
            }
        }

        function _markerClickCallback(obj, loadPlace = false) {
            if (loadPlace === true) {
                placeService.getGooglePlaceDetails(obj.placeId)
                    .then((place) => {
                        placeService.showPlaceDetails(place, _init);
                        _updateCachedPlaceData(obj, place);
                    }, _errorHandler);
            } else {
                placeService.showPlaceDetails(obj, _init);
            }
        };

        function _updateCachedPlaceData(obj, place) {
            if (obj.place.name !== place.name || obj.place.address !== place.formatted_address) {
                placeService.updateCachedPlace(obj.place.guid, place);
            }
            obj.place.name = place.name;
            obj.place.address = place.formatted_address ? place.formatted_address : place.vicinity;
            obj.place.location = JSON.stringify(place.geometry.location);
        }

        function _errorHandler(error) {
            logger.error(error);
            vm.dataIsLoading = false;
        }
    }
})();