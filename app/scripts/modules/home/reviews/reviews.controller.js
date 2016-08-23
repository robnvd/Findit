(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('reviewsController', reviewsController);

    reviewsController.$inject = ['$scope', 'reviewsService', 'logger'];
    function reviewsController($scope, reviewsService, logger) {
        var vm = this;
        vm.reviews = [];

        _init();

        ////////////////

        function _init() {
            vm.dataIsLoading = true;
            reviewsService.getPersonReviews().then(_resolveGetPersonReviews, _errorHandler);
        }

        function _resolveGetPersonReviews(response) {
            if (response.data) {
                vm.reviews = response.data;
            }
            vm.dataIsLoading = false;
        }

        function _errorHandler(error) {
            logger.error(error);
            vm.dataIsLoading = false;
        }
    }
})();