(function() {
'use strict';

    angular
        .module('Findit.Bookmarks')
        .controller('bookmarksController', bookmarksController);

    bookmarksController.$inject = ['$scope'];
    function bookmarksController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();