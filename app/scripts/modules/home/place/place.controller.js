(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('placeController', controller);

    controller.$inject = ['place', '$scope', 'placeService', 'logger', 'usSpinnerService'];
    function controller(place, $scope, placeService, logger, usSpinnerService) {
        //init
        var vm = this;

        vm.placeIsLoading = true;

        vm.hidePhotos = true;
        vm.hideReviews = true;

        vm.addReviewToggle = false;
        vm.newReview = {
            placeId: place.place_id,
            rating: 5
        };

        vm.toggleAddReview = () => {
            vm.addReviewToggle = !vm.addReviewToggle;
        };

        vm.saveReview = () => {
            placeService.addCustomReview(vm.newReview).then((result) => {
                vm.place.reviews.push(..._turnCustomReviewToGoogleReview([result.data]));
                _resetReviewForm();
            }, (err) => {
                logger.error(err);
                _resetReviewForm();
            });
        };

        vm.addToBookmarks = () => {
            placeService.addToBookmarks({
                placeId: place.place_id
            }).then(_resolveAddToBookmarks, _handleError);
        };

        vm.removeFromBookmarks = () => {
            placeService.removeFromBookmarks(place.place_id)
                .then(_resolveRemoveFromBookmarks, _handleError);
        };

        _init();

        //////// Private

        function _init() {
            placeService.getGooglePlaceDetails(place.place_id)
                .then((place) => { usSpinnerService.spin('place-modal-body'); return place; }, _handleError)
                .then(_resolvePlaceDetails, _handleError)
                .then(_resolvePlaceBookmark, _handleError)
                .then(_resolveCustomReviews, _handleError)
                .then(() => { usSpinnerService.stop('place-modal-body'); vm.placeIsLoading = false; });
        }

        function _resolvePlaceDetails(place) {
            return place;
        }

        function _resolvePlaceBookmark(place) {
            return placeService.getPlaceBookmark(place.place_id)
                .then((response) => {
                    vm.hideBookmark = response.data ? true : false;
                    return place;
                }, _handleError);
        }

        function _resolveCustomReviews(place) {
            return placeService.getPlaceCustomReviews(place.place_id)
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
            logger.error(err);
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

        function _resetReviewForm() {
            vm.addReviewToggle = false;
            vm.newReview = {
                placeId: place.place_id,
                rating: 5
            }
        }

        function _resolveAddToBookmarks() {
            logger.success("Bookmark saved successfully!");
            vm.hideBookmark = true;
        }

        function _resolveRemoveFromBookmarks() {
            logger.success("Bookmark removed successfully!");
            vm.hideBookmark = false;
        }
    }
})();