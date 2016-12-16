(function () {
    'use strict';

    angular
        .module('Findit.Reviews')
        .service('reviewsService', reviewsService);

    reviewsService.$inject = ['dataService', 'authService'];
    function reviewsService(dataService, authService) {
        this.getPersonReviews = getPersonReviews;
        this.getPlaceCustomReviews = getPlaceCustomReviews;
        this.addCustomReview = addCustomReview;

        ////////////////

        function getPersonReviews() {
            return dataService.get(`Reviews/MyReviews`);
        }

        function getPlaceCustomReviews(placeId) {
            return dataService.get(`Reviews/PlaceReviews/placeId=${placeId}`);
        }

        function addCustomReview(review) {
            return dataService.post('Reviews/AddReview', review);
        }

    }
})();