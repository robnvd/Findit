(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('placeController', controller);

    controller.$inject = ['place', 'googlePlacesService', '$scope', 'placeService'];
    function controller(place, googlePlacesService, $scope, placeService) {
        var vm = this;
        googlePlacesService.getDetails({ placeId: place.place_id }, getDetailsCallback);
        var customReviewsPromise = placeService.getPlaceReviews(place.place_id);
        vm.slickConfig = {
            dots: true,
            autoplay: true,
            initialSlide: 3,
            infinite: true,
        };

        function getDetailsCallback(place, status) {
            $scope.$apply(() => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    vm.place = place;
                    customReviewsPromise.then((result) => {
                        if (result.data) {
                            // var transformedReviews = turnCustomReviewToGoogleReview(result.data);
                            // vm.place.reviews.push(...transformedReviews);
                            vm.place.customReviews = result.data;
                        }
                    }).catch((error) => { /*TODO Handle error*/ });
                }
            });
        }

        function turnCustomReviewToGoogleReview(reviews) {
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
            rating: 5
        };

        vm.addReview = () => {
            vm.addReviewToggle = true;
        };
        vm.cancelAddReview = () => {
            vm.addReviewToggle = false;
        };

        vm.saveReview = () => {
            placeService.addReview(vm.newReview).then((result) => {
                vm.place.customReviews.push(result.data);
            },(err)=>{
                console.log(err);
            });
        };

    }
})();