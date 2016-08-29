(function() {
  'use strict';

  angular
    .module('Findit.Core')
    .constant('toastr', toastr)
    .constant('dateTimeFormat', 'DD MMM Y - HH:mm')
    .constant('moment', moment);
})();
