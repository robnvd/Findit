(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('bookmarksService', bookmarksService);

    bookmarksService.$inject = ['dataService', '$user'];
    function bookmarksService(dataService, $user) {
        this.getPersonBookmarks = getPersonBookmarks;
        this.getPlaceBookmark = getPlaceBookmark;
        this.addToBookmarks = addToBookmarks;
        this.removeFromBookmarks = removeFromBookmarks;

        ////////////////

        function getPersonBookmarks() {
            return $user.get().then((user) => {
                return dataService.get(`Bookmarks/MyBookmarks?username=${user.username}`);
            }, (error) => {
                return error;
            });
        }

        function getPlaceBookmark(placeId) {
            return $user.get().then((user) => {
                return dataService.get(`Bookmarks/PlaceBookmark?username=${user.username}&placeId=${placeId}`);
            }, (error) => {
                return error;
            });
        }

        function addToBookmarks(bookmark) {
            return $user.get().then((user) => {
                return dataService.post(`Bookmarks/AddBookmark?username=${user.username}`, bookmark);
            }, (error) => {
                return error;
            });
        }

        function removeFromBookmarks(placeId) {
            return $user.get().then((user) => {
                return dataService.delete(`Bookmarks/RemoveBookmark?username=${user.username}&placeId=${placeId}`);
            }, (error) => {
                return error;
            });
        }
    }
})();