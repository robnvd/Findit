(function () {
    'use strict';

    angular
        .module('Findit.Map')
        .factory('mapService', mapService);

    mapService.$inject = ['NgMap', '$geolocation', '$q', 'searchResultTypes', 'placeService', 'logger'];
    function mapService(NgMap, $geolocation, $q, searchResultTypes, placeService, logger) {
        let service = {};

        let _mapInstace = null;
        let _markers = [];
        let _radius = null;
        let _centerMarker = null;
        let _options = null;

        service.mapInitialized = false;

        service.init = init;
        service.showPlacesOnMap = showPlacesOnMap;

        service.getMapInstance = getMapInstance;
        service.getMapCenter = getMapCenter;
        service.clearMap = clearMap;
        service.setMapCenter = setMapCenter;
        service.setMapZoom = setMapZoom;

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
            _options = options;
            return getCurrentLocation().then((location) => {
                return _initInstances(location);
            }, (err) => {
                return _initInstances(null);
            })

        }

        function _initInstances(location) {
            return getMapInstance().then((map) => {
                if (!_mapInstace) {
                    _mapInstace = map;
                }
                if (location) {
                    _center(_mapInstace, location.coords.latitude, location.coords.longitude);
                } else {
                    _center(_mapInstace, 44.4267674, 26.102538399999958);
                }
                setMapZoom(16);

                if (!_centerMarker) {
                    _centerMarker = _createCenterMarker();
                }

                if (!_radius) {
                    _radius = _createRadius();
                }
            });
        }

        function _createCenterMarker() {
            let marker = new google.maps.Marker({
                animation: 'BOUNCE',
                draggable: true,
                label: {
                    color: 'green',
                    text: 'C'
                },
                position: _mapInstace.getCenter(),
                title: 'You are here',
                map: _mapInstace
            });

            google.maps.event.addListener(marker, 'dragend', () => {
                _centerMarkerDragEndedCallback(marker);
            });

            return marker;
        }

        function _centerMarkerDragEndedCallback(centerMarker) {
            const center = centerMarker.getPosition();
            setMapCenter(center, null, true, true);
            clearAllMarkers();
            searchNearbyPlaces().then(showPlacesOnMap, _logErrors);
        }

        function showPlacesOnMap(results) {
            clearAllMarkers();
            const center = getMapCenter();
            for (let i = 0; i < results.length; i++) {
                if (google.maps.geometry.spherical.computeDistanceBetween(results[i].geometry.location, center) <= _options.radius) {
                    addMarkerToMapForPlace(results[i], _markerClickCallback);
                }
            }
        }

        function _markerClickCallback(place) {
            placeService.showPlaceDetails(place);
        };

        function _createRadius() {
            return new google.maps.Circle({
                center: _mapInstace.getCenter(),
                radius: _options.radius || 700,
                strokeColor: '#59C4C5',
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: '#59C4C5',
                fillOpacity: 0.2,
                map: _mapInstace
            });
        }

        //Map API
        function getMapInstance() {
            return NgMap.getMap();
        }

        function getMapCenter() {
            return _mapInstace.getCenter();
        }

        function clearMap(markers = true, centerMarker = true, radius = true) {
            if (markers === true) {
                clearAllMarkers();
            }
            if (_centerMarker && centerMarker === true) {
                _centerMarker.setMap(null);
                _centerMarker = null;
            }
            if (_radius && radius === true) {
                _radius.setMap(null);
                _radius = null;
            }
        }

        function setMapCenter(arg1, arg2, centerMarker = false, radius = false) {
            _center(_mapInstace, arg1, arg2);

            if (centerMarker === true) {
                setCenterMarkerPosition(arg1, arg2);
            }

            if (radius === true) {
                setRadiusCenter(arg1, arg2);
            }
        }

        function setMapZoom(zoom) {
            if (_mapInstace) {
                _mapInstace.setZoom(zoom);
            }
        }

        function searchNearbyPlaces() {
            var deferred = $q.defer();
            placeService.getMapPlacesService().then((service) => {
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
            placeService.getMapPlacesService().then((service) => {
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

        function _logErrors(err) {
            logger.error(err);
        }

        return service;
    }
})();