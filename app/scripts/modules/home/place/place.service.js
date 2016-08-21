(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('placeService', placeService);

    placeService.$inject = ['dataService'];
    function placeService(dataService) {
        this.getPlaceReviews = getPlaceReviews;
        this.addReview = addReview;

        ////////////////

        function getPlaceReviews(placeId) {
            return dataService.get('Reviews/PlaceReviews?placeId=' + placeId);
        }

        function addReview(review) {
            return dataService.post('Reviews/AddReview', review);
        }
    }
})();