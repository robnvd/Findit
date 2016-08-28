(function() {
  'use strict';

  angular
    .module('Findit.Core')
    .constant('toastr', toastr)
    .constant('baseUrl', '#apiendpoint#')
    .constant('apiUrl', '#apiendpoint#/api/')
    .constant('dateTimeFormat', 'DD MMM Y - HH:mm')
    .constant('moment', moment);
})();
