(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'apiUrl'];
    function dataService($http, $q, apiUrl) {
        return {
            get: get,
            post: post,
            put: put,
            delete: Delete
        };

        function get(url) {
            return $http.get(apiUrl + url);//.catch((error) => { $q.reject(error); });
        }
        function post(url, data) { 
            return $http.post(apiUrl + url, data);//.catch((error) => { $q.reject(error); });
        }
        function put(url, data) { 
            return $http.put(apiUrl + url, data);//.catch((error) => { $q.reject(error); });
        }
        function Delete(url, data) {
            return $http.delete(apiUrl + url, data);//.catch((error) => { $q.reject(error); });
        }
    }
})();