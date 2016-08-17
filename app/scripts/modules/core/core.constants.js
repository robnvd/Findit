(function() {
  'use strict';

  angular
    .module('Findit.Core')
    .constant('toastr', toastr)
    .constant('baseUrl', 'http://localhost:3000')
    .constant('apiUrl', 'http://localhost:3000/api/')
    .constant('moment', moment);
})();
