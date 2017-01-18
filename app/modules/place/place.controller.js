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
        vm.addBookmarkToggle = false;

        vm.bookmark = {
            note: null
        };
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

        vm.toggleAddBookmark = () => {
            _resetBookmarkForm();
            vm.addBookmarkToggle = !vm.addBookmarkToggle;
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
                },
                bookmarkText: vm.bookmark.note
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

        function _resolvePlaceDetails(freshPlace) {
            vm.place = freshPlace;
        }

        function _resolvePlaceBookmark() {
            return bookmarksService.getPlaceBookmark(vm.place.place_id)
                .then((response) => {
                    vm.hideBookmark = response && response.data ? true : false;
                }, _handleError);
        }

        function _resolveCustomReviews() {
            return reviewsService.getPlaceCustomReviews(vm.place.place_id)
                .then((result) => {
                    if (result.data && vm.place.reviews) {
                        var transformedReviews = _turnCustomReviewToGoogleReview(result.data);
                        vm.place.reviews.push(...transformedReviews);
                    }
                }, _handleError);
        }

        function _resolveAddCustomReview(response) {
            if (!response) return;

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
            vm.addBookmarkToggle = false;
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
            if (parseInt(err.status) >= 500) {
                logger.error(err);
            }
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

        function _resetBookmarkForm() {
            vm.bookmark.note = null;
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