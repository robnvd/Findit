(function () {
    'use strict';

    angular
        .module('LicentaWeb.Services')
        .service('homeService', service);

    service.$inject = ['$http'];
    function service($http) {
        this.createMarker = createMarker;

        function createMarker(map, place, clickEvent) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            if(clickEvent) google.maps.event.addListener(marker, 'click', () => clickEvent(place));
            return marker;
        }
    }
})();