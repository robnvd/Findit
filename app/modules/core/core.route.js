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
              templateUrl: 'modules/map/map.tpl.html',
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
              templateUrl: 'modules/core/templates/404.tpl.html'
            }
          }
        }
      }
    ];
  }
})();
