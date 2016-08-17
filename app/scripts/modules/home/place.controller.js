(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .controller('placeController', controller);

    controller.$inject = ['place', 'placesService', '$scope', 'dataService'];
    function controller(place, placesService, $scope, dataService) {
        var vm = this;
        var placeReviewsTemp = [];
        placesService.getDetails({ placeId: place.place_id }, getDetailsCallback);
        dataService.get('Reviews/PlaceReviews?placeId=' + place.place_id).then((result) => {
            placeReviewsTemp.push(...result.data);
        }).catch((error) => {
            //TODO Handle error
        });

        function getDetailsCallback(place, status) {
            $scope.$apply(() => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    vm.place = place;
                    vm.place.customReviews = placeReviewsTemp;
                }
            })
        }
    }
})();