(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('reviewsService', reviewsService);

    reviewsService.$inject = ['dataService', '$user'];
    function reviewsService(dataService, $user) {
        this.getPersonReviews = getPersonReviews;

        ////////////////

        function getPersonReviews() {
            return $user.get().then((user) => {
                return dataService.get(`Reviews/MyReviews?username=${user.username}`);
            }, (error) => {
                return error;
            });
        }
    }
})();