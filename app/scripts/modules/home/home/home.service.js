(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .service('homeService', service);

    service.$inject = ['$http', '$geolocation'];
    function service($http, $geolocation) {
        this.createMarker = createMarker;
        this.getCurrentLocation = getCurrentLocation;

        function createMarker(map, place, clickEvent) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            if(clickEvent) google.maps.event.addListener(marker, 'click', () => clickEvent(place));
            return marker;
        }

        function getCurrentLocation(){
            return $geolocation.getCurrentPosition({ timeout: 6000 });
        }
    }
})();