(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('bookmarksService', bookmarksService);

    bookmarksService.$inject = ['dataService', '$user'];
    function bookmarksService(dataService, $user) {
        this.getPersonBookmarks = getPersonBookmarks;

        ////////////////

        function getPersonBookmarks() {
            return $user.get().then((user) => {
                return dataService.get(`Bookmarks/MyBookmarks?username=${user.username}`);
            }, (error) => {
                return error;
            });
        }
    }
})();