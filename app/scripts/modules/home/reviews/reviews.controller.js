(function() {
'use strict';

    angular
        .module('Findit.Reviews')
        .controller('reviewsController', reviewsController);

    reviewsController.$inject = ['$scope'];
    function reviewsController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();