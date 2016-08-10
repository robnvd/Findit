(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .service('userService', userService);

    userService.$inject = ['$http', 'baseUrl'];
    function userService($http, baseUrl) {
        this.getUserDetails = getUserDetails;

        ////////////////

        function getUserDetails() { 
            return $http.get(baseUrl + '/me');
        }
    }
})();