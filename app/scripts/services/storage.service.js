(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .service('storage', storage);

    storage.$inject = ['localStorageService'];
    function storage(localStorageService) {
        this.get = get;
        this.set = set;

        ////////////////

        function get(key) {
            var value = localStorageService.get(key);
            return value;
        }

        function set(key, value) {
            return localStorageService.set(key, value);
        }
    }
})();