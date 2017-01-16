(function () {
    'use strict';

    angular
        .module('Findit.Bookmarks')
        .controller('bookmarksController', bookmarksController);

    bookmarksController.$inject = ['bookmarksService', 'placeService', 'mapService', 'logger', '$scope'];
    function bookmarksController(bookmarksService, placeService, mapService, logger, $scope) {
        let vm = this;
        vm.bookmarks = [];
        vm.showAsField = {};

        vm.showPlaceDetails = function (bookmark) {
            _markerClickCallback(bookmark, true);
        };

        vm.showPlaceOnMap = function (bookmark) {
            placeService.getGooglePlaceDetails(bookmark.place.placeId)
                .then((place) => {
                    mapService.clearMap();
                    mapService.setMapCenter(place.geometry.location);
                    mapService.setMapZoom(16);
                    mapService.addMarkerToMapForPlace(place, _markerClickCallback)

                    _updateCachedPlaceData(bookmark, place);
                }, _errorHandler);
        };

        vm.removeBookmark = function (index) {
            let bookmark = vm.bookmarks[index];
            bookmarksService.removeFromBookmarks(bookmark.placeId)
                .then(() => {
                    vm.bookmarks.splice(index, 1);
                    vm.noData = vm.bookmarks.length <= 0;
                    logger.success('Bookmark removed successfully!');
                }, _errorHandler);
        };

        vm.toggleEditNote = function (index) {
            vm.showAsField[index] = !vm.showAsField[index];
        };

        vm.saveBookmarkNote = function (index) {
            let bookmark = vm.bookmarks[index];

            bookmarksService.updateBookmark(bookmark)
                .then(() => {
                    vm.toggleEditNote(index);
                    logger.success('Bookmark updated successfully!');
                }, _errorHandler);
        };

        $scope.$on('bookmarks-count-changed', () => _init());

        _init();

        ////////////////

        function _init() {
            vm.dataIsLoading = true;
            bookmarksService.getPersonBookmarks()
                .then(_resolveGetPersonBookmarks, _errorHandler)
                .then(() => {
                    vm.dataIsLoading = false;
                    vm.noData = vm.bookmarks.length <= 0;
                });
        }

        function _resolveGetPersonBookmarks(response) {
            if (response && response.data) {
                vm.bookmarks = response.data;
            }
        }

        function _markerClickCallback(obj, loadPlace = false) {
            if (loadPlace === true) {
                placeService.getGooglePlaceDetails(obj.place.placeId)
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