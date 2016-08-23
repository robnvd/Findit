(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('bookmarksController', bookmarksController);

    bookmarksController.$inject = ['bookmarksService', 'placeService', '$q', 'usSpinnerService', 'logger'];
    function bookmarksController(bookmarksService, placeService, $q, usSpinnerService, logger) {
        var vm = this;
        vm.bookmarks = [];

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
                var promise = placeService.getGooglePlaceDetails(bookmark.placeId)
                    .then((place) => {
                        angular.extend(bookmark, place);
                    }, _errorHandler);
                promises.push(promise);
            });
            $q.all(promises).then(() => {
                //all bookmarked places are loaded
                console.log('stop spinning');
                vm.dataIsLoading = false;
            }, _errorHandler);
        }

        function _errorHandler(error) {
            logger.error(error);
            vm.dataIsLoading = false;
        }
    }
})();