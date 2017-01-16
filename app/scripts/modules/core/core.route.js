(function () {
  'use strict';

  angular
    .module('Findit.Core')
    .run(appRun);


  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    var otherwise = '/';
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [
      {
        state: 'root',
        config: {
          views: {
            'main': {
              templateUrl: 'templates/map.tpl.html',
              controller: 'mapController',
              controllerAs: 'vm'
            }
          }
        }
      },
      {
        state: '404',
        config: {
          url: '/404',
          views: {
            'main': {
              templateUrl: 'templates/core/404.tpl.html'
            }
          }
        }
      }
    ];
  }
})();
