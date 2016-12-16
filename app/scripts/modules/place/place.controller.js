(function () {
    'use strict';

    angular
        .module('Findit.Place')
        .controller('placeController', controller);

    controller.$inject = ['place', 'refreshList', '$rootScope', 'placeService', 'reviewsService', 'bookmarksService', 'logger'];
    function controller(place, refreshList, $rootScope, placeService, reviewsService, bookmarksService, logger) {
        //init
        var vm = this;
        vm.dataIsLoading = true;

        vm.hidePhotos = true;
        vm.hideReviews = true;

        vm.addReviewToggle = false;
        vm.newReview = {
            placeId: place.place_id,
            rating: 5,
            place: {
                placeId: place.place_id,
                name: place.name,
                address: place.formatted_address ? place.formatted_address : place.vicinity,
                location: JSON.stringify(place.geometry.location)
            }
        };

        vm.toggleAddReview = () => {
            _resetReviewForm();
            vm.addReviewToggle = !vm.addReviewToggle;
        };

        vm.saveReview = () => {
            reviewsService.addCustomReview(vm.newReview)
                .then(_resolveAddCustomReview, _handleError);
        };

        vm.addToBookmarks = () => {
            bookmarksService.addToBookmarks({
                placeId: place.place_id,
                place: {
                    placeId: place.place_id,
                    name: place.name,
                    address: place.formatted_address ? place.formatted_address : place.vicinity,
                    location: JSON.stringify(place.geometry.location)
                }
            }).then(_resolveAddToBookmarks, _handleError);
        };

        vm.removeFromBookmarks = () => {
            bookmarksService.removeFromBookmarks(place.place_id)
                .then(_resolveRemoveFromBookmarks, _handleError);
        };

        _init();

        //////// Private

        function _init() {
            placeService.getGooglePlaceDetails(place.place_id)
                .then(_resolvePlaceDetails, _handleError)
                .then(_resolvePlaceBookmark, _handleError)
                .then(_resolveCustomReviews, _handleError)
                .then(() => { vm.dataIsLoading = false; }, _handleError);
        }

        function _resolvePlaceDetails(place) {
            return place;
        }

        function _resolvePlaceBookmark(place) {
            return bookmarksService.getPlaceBookmark(place.place_id)
                .then((response) => {
                    vm.hideBookmark = response && response.data ? true : false;
                    return place;
                }, _handleError);
        }

        function _resolveCustomReviews(place) {
            return reviewsService.getPlaceCustomReviews(place.place_id)
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

        function _resolveAddCustomReview(response) {
            if(!response) return;
            
            if (!vm.place.reviews) vm.place.reviews = [];
            vm.place.reviews.push(..._turnCustomReviewToGoogleReview([response.data]));
            logger.success('Review saved successfully!');
            _resetReviewForm();
            vm.addReviewToggle = false;

            if (refreshList) {
                refreshList();
            } else {
                $rootScope.$broadcast('reviews-count-changed');
            }
        }

        function _resolveAddToBookmarks() {
            logger.success('Bookmark saved successfully!');
            vm.hideBookmark = true;
            if (refreshList) {
                refreshList();
            } else {
                $rootScope.$broadcast('bookmarks-count-changed');
            }
        }

        function _resolveRemoveFromBookmarks() {
            logger.success('Bookmark removed successfully!');
            vm.hideBookmark = false;
            if (refreshList) {
                refreshList();
            } else {
                $rootScope.$broadcast('bookmarks-count-changed');
            }
        }

        function _handleError(err) {
            //TODO handle error gracefully
            logger.error(err);
        }

        //Private
        function _turnCustomReviewToGoogleReview(reviews) {
            var result = [];
            angular.forEach(reviews, (review) => {
                result.push({
                    author_name: review.createdBy,
                    time: Date.parse(review.createdOn) / 1000,
                    text: review.reviewText,
                    rating: review.rating
                });
            });
            return result;
        }

        function _resetReviewForm() {
            vm.newReview = {
                placeId: place.place_id,
                rating: 5,
                reviewText: null,
                place: {
                    placeId: place.place_id,
                    name: place.name,
                    address: place.formatted_address ? place.formatted_address : place.vicinity,
                    location: JSON.stringify(place.geometry.location)
                }
            };
        }
    }
})();