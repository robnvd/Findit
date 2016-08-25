(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('reviewsService', reviewsService);

    reviewsService.$inject = ['dataService', '$user'];
    function reviewsService(dataService, $user) {
        this.getPersonReviews = getPersonReviews;
        this.getPlaceCustomReviews = getPlaceCustomReviews;
        this.addCustomReview = addCustomReview;

        ////////////////

        function getPersonReviews() {
            return $user.get().then((user) => {
                return dataService.get(`Reviews/MyReviews?username=${user.username}`);
            }, (error) => {
                return error;
            });
        }

        function getPlaceCustomReviews(placeId) {
            return dataService.get(`Reviews/PlaceReviews?placeId=${placeId}`);
        }

        function addCustomReview(review) {
            return dataService.post('Reviews/AddReview', review);
        }

    }
})();