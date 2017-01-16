(function () {
    'use strict';

    angular
        .module('Findit.Place')
        .service('placeService', placeService);

    placeService.$inject = ['NgMap', 'dataService', '$q', '$uibModal'];
    function placeService(NgMap, dataService, $q, $uibModal) {
        this.getGooglePlaceDetails = getGooglePlaceDetails;
        this.showPlaceDetails = showPlaceDetails;
        this.updateCachedPlace = updateCachedPlace;
        this.getMapPlacesService = getMapPlacesService

        ////////////////

        function getGooglePlaceDetails(placeId) {
            const deferred = $q.defer();
            getMapPlacesService().then((service) => {
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

        function showPlaceDetails(place, refreshList = undefined) {
            return $uibModal.open({
                backdrop: 'static',
                templateUrl: 'templates/place.tpl.html',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                size: 'lg',
                controller: 'placeController',
                controllerAs: 'vm',
                resolve: {
                    place: () => place,
                    refreshList: () => refreshList
                }
            });
        }

        function updateCachedPlace(placeGuid, place) {
            let dto = {
                guid: placeGuid,
                placeId: place.place_id,
                name: place.name,
                address: place.formatted_address ? place.formatted_address : place.vicinity,
                location: JSON.stringify(place.geometry.location)
            };
            return dataService.put('Places/UpdateCachedPlace', dto);
        }

        function getMapPlacesService() {
            return NgMap.getMap().then((map) => {
                return new google.maps.places.PlacesService(map)
            });
        }
    }
})();