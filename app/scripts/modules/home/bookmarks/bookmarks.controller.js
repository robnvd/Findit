(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('bookmarksController', bookmarksController);

    bookmarksController.$inject = ['bookmarksService', 'placeService', 'mapService', '$uibModal', '$q', 'usSpinnerService', '$timeout', 'logger'];
    function bookmarksController(bookmarksService, placeService, mapService, $uibModal, $q, usSpinnerService, $timeout, logger) {
        let vm = this;
        vm.bookmarks = [];

        vm.showPlaceOnMap = function(bookmark) {
            //TODO remove center marker and radius (setMapCenter with options)
            mapService.clearAllMarkers();
            mapService.setMapCenter(bookmark.place.geometry.location);
            mapService.addMarkerToMapForPlace(bookmark.place, _markerClickCallback)
        };

        vm.removeBookmark = function(index) {
            let bookmark = vm.bookmarks[index];
            placeService.removeFromBookmarks(bookmark.placeId)
                .then(_resolveRemoveBookmark, _errorHandler);
            vm.bookmarks.splice(index, 1);
        };  

        _init();

        ////////////////

        function _init() {
            bookmarksService.getPersonBookmarks()
                .then(_resolveGetPersonBookmarks, _errorHandler)
                .then(_resolveGetPlacesDetails, _errorHandler);
        }

        function _resolveGetPersonBookmarks(response) {
            vm.dataIsLoading = true;
            if (response.data) {
                vm.bookmarks = response.data;
                return response.data;
            }
            return [];
        }

        function _resolveGetPlacesDetails(bookmarks) {
            let promises = [];
            angular.forEach(bookmarks, (bookmark, index) => {
                //TODO optimize place details requests
                if ((index + 1) % 10 === 0) {
                    $timeout(() => {
                        let promise = _getPlaceDetails(bookmark);
                        promises.push(promise);
                    }, 1000);
                } else {
                    var promise = _getPlaceDetails(bookmark);
                    promises.push(promise);
                }

            });
            $q.all(promises).then(() => {
                vm.dataIsLoading = false;
            }, _errorHandler);
        }

        function _getPlaceDetails(bookmark) {
            return placeService.getGooglePlaceDetails(bookmark.placeId)
                .then((place) => {
                    bookmark.place = place;
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

        function _resolveRemoveBookmark() {
            logger.success('Bookmark removed successfully!');
        }

        function _errorHandler(error) {
            logger.error(error);
            vm.dataIsLoading = false;
        }
    }
})();