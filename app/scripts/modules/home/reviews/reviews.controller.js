(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('reviewsController', reviewsController);

    reviewsController.$inject = ['reviewsService', 'placeService', 'mapService', '$uibModal', '$q', '$timeout', 'logger'];
    function reviewsController(reviewsService, placeService, mapService, $uibModal, $q, $timeout, logger) {
        var vm = this;
        vm.reviews = [];

        vm.showPlaceDetails = function(review) {
            _markerClickCallback(review.place);
        };

        vm.showPlaceOnMap = function(review) {
            mapService.clearMap();
            mapService.setMapCenter(review.place.geometry.location);
            mapService.setMapZoom(16);
            mapService.addMarkerToMapForPlace(review.place, _markerClickCallback)
        };

        _init();

        ////////////////

        function _init() {
            reviewsService.getPersonReviews()
                .then(_resolveGetPersonReviews, _errorHandler)
                .then(_resolveGetPlacesDetails, _errorHandler);
        }

        function _resolveGetPersonReviews(response) {
            vm.dataIsLoading = true;
            if (response.data) {
                vm.reviews = response.data;
                return response.data;
            }
            return [];
        }

        function _resolveGetPlacesDetails(reviews) {
            let promises = [];
            angular.forEach(reviews, (review, index) => {
                //TODO optimize place details requests
                if ((index + 1) % 10 === 0) {
                    $timeout(() => {
                        let promise = _getPlaceDetails(review);
                        promises.push(promise);
                    }, 1000);
                } else {
                    var promise = _getPlaceDetails(review);
                    promises.push(promise);
                }

            });
            $q.all(promises).then(() => {
                vm.dataIsLoading = false;
            }, _errorHandler);
        }

        function _getPlaceDetails(review) {
            return placeService.getGooglePlaceDetails(review.placeId)
                .then((place) => {
                    review.place = place;
                }, _errorHandler);
        }

        function _markerClickCallback(place) {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'templates/home/place.tpl.html',
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

        function _errorHandler(error) {
            logger.error(error);
            vm.dataIsLoading = false;
        }
    }
})();