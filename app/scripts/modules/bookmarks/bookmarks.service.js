(function () {
    'use strict';

    angular
        .module('Findit.Bookmarks')
        .service('bookmarksService', bookmarksService);

    bookmarksService.$inject = ['dataService', 'authService'];
    function bookmarksService(dataService, authService) {
        this.getPersonBookmarks = getPersonBookmarks;
        this.getPlaceBookmark = getPlaceBookmark;
        this.addToBookmarks = addToBookmarks;
        this.updateBookmark = updateBookmark;
        this.removeFromBookmarks = removeFromBookmarks;

        ////////////////

        function getPersonBookmarks() {
            return dataService.get(`Bookmarks/MyBookmarks`);
        }

        function getPlaceBookmark(placeId) {
            return dataService.get(`Bookmarks/PlaceBookmark/${placeId}`);
        }

        function addToBookmarks(bookmark) {
            return dataService.post(`Bookmarks/AddBookmark`, bookmark);
        }

        function updateBookmark(bookmark) {
            return dataService.put(`Bookmarks/UpdateBookmark`, bookmark);
        }

        function removeFromBookmarks(placeId) {
            return dataService.delete(`Bookmarks/RemoveBookmark/${placeId}`);
        }
    }
})();