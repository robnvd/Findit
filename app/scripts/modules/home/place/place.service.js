(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('placeService', placeService);

    placeService.$inject = ['dataService', 'mapService', '$q'];
    function placeService(dataService, mapService, $q) {
        this.getGooglePlaceDetails = getGooglePlaceDetails;
        this.getPlaceCustomReviews = getPlaceCustomReviews;
        this.addCustomReview = addCustomReview;

        ////////////////

        function getGooglePlaceDetails(placeId) {
            const deferred = $q.defer();
            var service = mapService.getMapPlacesService();
            service.getDetails({ placeId: placeId}, (place, status) => {
                 if (status === google.maps.places.PlacesServiceStatus.OK) {
                     deferred.resolve(place);
                 } else {
                     deferred.reject(status);
                 }
            });
            return deferred.promise;
        }

        function getPlaceCustomReviews(placeId) {
            return dataService.get('Reviews/PlaceReviews?placeId=' + placeId);
        }

        function addCustomReview(review) {
            return dataService.post('Reviews/AddReview', review);
        }
    }
})();