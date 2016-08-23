(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .factory('mapService', mapService);

    mapService.$inject = ['NgMap', '$geolocation', '$q', 'searchResultTypes'];
    function mapService(NgMap, $geolocation, $q, searchResultTypes) {
        let service = {};

        let _mapInstace = null;
        let _markers = [];
        let _radius = null;
        let _centerMarker = null;

        service.init = init;

        service.getMapInstance = getMapInstance;
        service.getMapCenter = getMapCenter;
        service.setMapCenter = setMapCenter;
        service.setMapCenterWithoutCenterMarker = setMapCenterWithoutCenterMarker;

        service.getMapPlacesService = getMapPlacesService;
        service.searchNearbyPlaces = searchNearbyPlaces;
        service.searchPlacesByText = searchPlacesByText;

        service.setRadiusSize = setRadiusSize;
        service.setRadiusCenter = setRadiusCenter;

        service.setCenterMarkerPosition = setCenterMarkerPosition;

        service.clearAllMarkers = clearAllMarkers;
        service.clearMarkersOutOfRange = clearMarkersOutOfRange;
        service.addMarkerToMapForPlace = addMarkerToMapForPlace;

        service.getCurrentLocation = getCurrentLocation;

        /////////////////

        function init(options) {
            return getMapInstance().then((map) => {
                if (!_mapInstace) {
                    _mapInstace = map;
                }

                if (!_centerMarker) {
                    _centerMarker = new google.maps.Marker({
                        animation: 'BOUNCE',
                        draggable: true,
                        label: {
                            color: 'green',
                            text: 'C'
                        },
                        position: map.getCenter(),
                        title: 'You are here',
                        map: map
                    });
                    google.maps.event.addListener(_centerMarker, 'dragend', () => {
                        if (options.centerMarkerDragEndedCallback) {
                            options.centerMarkerDragEndedCallback(_centerMarker);
                        }
                    });
                }

                if (!_radius) {
                    _radius = new google.maps.Circle({
                        center: map.getCenter(),
                        radius: options.radius || 700,
                        strokeColor: '#59C4C5',
                        strokeOpacity: 0.4,
                        strokeWeight: 2,
                        fillColor: '#59C4C5',
                        fillOpacity: 0.2,
                        map: map
                    });
                }
            });
        }

        //Map API
        function getMapInstance() {
            return NgMap.getMap();
        }

        function getMapCenter() {
            return _mapInstace.getCenter();
        }

        function setMapCenter(arg1, arg2) {
            _center(_mapInstace, arg1, arg2);
            setRadiusCenter(arg1, arg2);
            setCenterMarkerPosition(arg1, arg2);
        }

        function setMapCenterWithoutCenterMarker(arg1, arg2) {
            _center(_mapInstace, arg1, arg2);
            setRadiusCenter(arg1, arg2);
        }

        //Map Places API
        function getMapPlacesService() {
            return getMapInstance().then((map) => {
                return new google.maps.places.PlacesService(map)
            });
        }

        function searchNearbyPlaces() {
            var deferred = $q.defer();
            getMapPlacesService().then((service) => {
                service.nearbySearch({
                    location: _mapInstace.getCenter(),
                    radius: _radius.getRadius(),
                    types: searchResultTypes
                }, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        deferred.resolve(results);
                    } else {
                        deferred.reject(status);
                    }
                });
            })
            return deferred.promise;
        }

        function searchPlacesByText(query) {
            var deferred = $q.defer();
            getMapPlacesService().then((service) => {
                service.textSearch({
                    location: _mapInstace.getCenter(),
                    radius: _radius.getRadius(),
                    query: query
                }, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        deferred.resolve(results);
                    } else {
                        deferred.reject(status);
                    }
                });
            })
            return deferred.promise;
        }


        //Radius API
        function setRadiusSize(size) {
            _radius.setRadius(size);
        }
        function setRadiusCenter(arg1, arg2) {
            _center(_radius, arg1, arg2);
        }

        //Center marker API
        function setCenterMarkerPosition(arg1, arg2) {
            if (arg2) {
                const center = new google.maps.LatLng(arg1, arg2);
                _centerMarker.setPosition(center);
            } else {
                _centerMarker.setPosition(arg1);
            }
        }

        //Markers API
        function clearAllMarkers() {
            angular.forEach(_markers, (marker) => {
                marker.setMap(null);
            });
            _markers = [];
        }

        function clearMarkersOutOfRange() {
            angular.forEach(_markers, (marker) => {
                if (google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), _mapInstace.getCenter()) > _radius.getRadius()) {
                    marker.setMap(null);
                }
            });
        }

        function addMarkerToMapForPlace(place, clickEvent) {
            var marker = new google.maps.Marker({
                map: _mapInstace,
                position: place.geometry.location,
                title: place.name
            });
            if (clickEvent) {
                google.maps.event.addListener(marker, 'click', () => {
                    clickEvent(place);
                });
            }
            _markers.push(marker);
        }

        //Other
        function getCurrentLocation() {
            return $geolocation.getCurrentPosition({ timeout: 6000 });
        }

        //Private
        function _center(obj, arg1, arg2) {
            if (arg2) {
                const center = new google.maps.LatLng(arg1, arg2);
                obj.setCenter(center);
            } else {
                obj.setCenter(arg1);
            }
        }

        return service;
    }
})();