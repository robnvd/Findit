(function() {
  'use strict';

  angular
    .module('Findit.Core')
    .constant('toastr', toastr)
    // .constant('baseUrl', '!{api-endpoint}')
    .constant('baseUrl', 'https://52.59.245.153')
    // .constant('apiUrl', '!{api-endpoint}/api/')
    .constant('apiUrl', 'https://52.59.245.153/api/')
    .constant('dateTimeFormat', 'DD MMM Y - HH:mm')
    .constant('moment', moment);
})();
