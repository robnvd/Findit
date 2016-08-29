(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .filter('dateTimeUnix', filter);
    
    filter.$inject = ['moment', 'dateTimeFormat'];
    function filter(moment, dateTimeFormat) {
        return (value) => {
            if (value !== undefined && value !== null) {
                return moment.unix(value).format(dateTimeFormat);
            } else {
                return '';
            }
        }
    }
})();