(function () {
    'use strict';

    angular.module('LicentaWeb', [
        'LicentaWeb.Controllers',
        'LicentaWeb.Services',
        'LicentaWeb.Directives',
        'uiGmapgoogle-maps'
    ]).config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCBPHeuLgfGtYoiSK6vxHo9MRtDTNJiNrE',
            //libraries: 'weather, geometry, visualization',
        });
    }]);
})();