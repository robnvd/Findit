(function () {
    'use strict';

    angular
        .module('LicentaWeb.Controllers')
        .controller('placeController', controller);

    controller.$inject = ['place', 'placesService', '$scope'];
    function controller(place, placesService, $scope) {
        var vm = this;
        placesService.getDetails({ placeId: place.place_id }, getDetailsCallback);

        function getDetailsCallback(place, status) {
            $scope.$apply(() => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    vm.place = place;
                }
            })
        }
    }
})();