(function() {
  'use strict';

  angular
    .module('Findit.Core')
    .constant('toastr', toastr)
    .constant('apiUrl', 'http://localhost:10076/api/')
    .constant('moment', moment);
})();
