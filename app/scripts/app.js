(function () {
    angular.module('LicentaWeb', [
        'LicentaWeb.Controllers',
        'LicentaWeb.Services',
        'LicentaWeb.Directives',
        'uiGmapgoogle-maps',
        'ui.router'
    ])
        .config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCBPHeuLgfGtYoiSK6vxHo9MRtDTNJiNrE',
                //libraries: 'weather, geometry, visualization',
            });
        }]);
})();