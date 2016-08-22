(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('placeController', controller);

    controller.$inject = ['place', '$scope', 'placeService', 'logger'];
    function controller(place, $scope, placeService, logger) {
        var vm = this;

        placeService.getGooglePlaceDetails(place.place_id)
            .then(_resolvePlaceDetails, _handleError)
            .then(_resolveCustomReviews, _handleError);

        function _resolvePlaceDetails(place) {
            return place;
        }

        function _resolveCustomReviews(place) {
            placeService.getPlaceCustomReviews(place.place_id)
                .then((result) => {
                    if (result.data && place.reviews) {
                        var transformedReviews = _turnCustomReviewToGoogleReview(result.data);
                        place.reviews.push(...transformedReviews);
                    }
                    vm.place = place;
                }, (err) => {
                    vm.place = place;
                    _handleError(err)
                });
        }

        function _handleError(err) {
            //TODO handle error gracefully
            logger.warning(err);
        }

        function _turnCustomReviewToGoogleReview(reviews) {
            var result = [];
            angular.forEach(reviews, (review) => {
                result.push({
                    author_name: review.createdBy,
                    time: review.createdOn,
                    text: review.reviewText,
                    rating: review.rating
                });
            });
            return result;
        }

        vm.newReview = {
            placeId: place.place_id,
            rating: 5
        };

        vm.addReview = () => {
            vm.addReviewToggle = true;
        };
        vm.cancelAddReview = () => {
            vm.addReviewToggle = false;
        };

        vm.saveReview = () => {
            placeService.addCustomReview(vm.newReview).then((result) => {
                vm.place.reviews.push(..._turnCustomReviewToGoogleReview([result.data]));
                resetReviewForm();
            }, (err) => {
                logger.error(err);
                resetReviewForm();
            });
        };

        function resetReviewForm() {
            vm.addReviewToggle = false;
            vm.newReview = {
                placeId: place.place_id,
                rating: 5
            }
        }

    }
})();