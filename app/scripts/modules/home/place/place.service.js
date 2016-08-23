(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('placeService', placeService);

    placeService.$inject = ['dataService', 'mapService', '$q', '$user'];
    function placeService(dataService, mapService, $q, $user) {
        this.getGooglePlaceDetails = getGooglePlaceDetails;
        this.getPlaceCustomReviews = getPlaceCustomReviews;
        this.addCustomReview = addCustomReview;
        this.getPlaceBookmark = getPlaceBookmark;
        this.addToBookmarks = addToBookmarks;
        this.removeFromBookmarks = removeFromBookmarks;

        ////////////////

        function getGooglePlaceDetails(placeId) {
            const deferred = $q.defer();
            mapService.getMapPlacesService().then((service) => {
                service.getDetails({ placeId: placeId }, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        deferred.resolve(place);
                    } else {
                        deferred.reject(status);
                    }
                });
            });
            return deferred.promise;
        }

        function getPlaceCustomReviews(placeId) {
            return dataService.get(`Reviews/PlaceReviews?placeId=${placeId}`);
        }

        function addCustomReview(review) {
            return dataService.post('Reviews/AddReview', review);
        }

        function getPlaceBookmark(placeId) {
            return $user.get().then((user) => {
                return dataService.get(`Bookmarks/PlaceBookmark?username=${user.username}&placeId=${placeId}`);
            }, (error) => {
                return error;
            });
        }

        function addToBookmarks(bookmark) {
            return $user.get().then((user) => {
                return dataService.post(`Bookmarks/AddBookmark?username=${user.username}`, bookmark);
            }, (error) => {
                return error;
            });
        }

        function removeFromBookmarks(placeId) {
            return $user.get().then((user) => {
                return dataService.delete(`Bookmarks/RemoveBookmark?username=${user.username}&placeId=${placeId}`);
            }, (error) => {
                return error;
            });
        }
    }
})();