(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .filter('dateTime', filter);
    
    filter.$inject = ['moment', 'dateTimeFormat'];
    function filter(moment, dateTimeFormat) {
        return (value) => {
            if (value !== undefined && value !== null) {
                return moment(value).format(dateTimeFormat);
            } else {
                return '';
            }
        }
    }
})();