(function() {
'use strict';

    angular
        .module('LicentaWeb.Services')
        .service('homeService', service);

    service.$inject = ['$http'];
    function service($http) {
        this.exposedFn = exposedFn;
        
        ////////////////

        function exposedFn() { }
        }
})();