(function () {
    'use strict';

    angular
        .module('Findit.Core')
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