(function () {
    'use strict';

    angular
        .module('LicentaWeb.Filters')
        .filter('boolean', filter);

    function filter() {
        return (value) => {
            if (value !== undefined && value !== null) {
                return value === true ? 'Yes' : 'No'
            } else {
                return '';
            }
        }
    }
})();