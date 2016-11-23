(function () {
  'use strict';

  angular
    .module('Findit.Core')
    .run(appRun);


  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);

    // $stormpath.uiRouter({
    //   loginState: 'login',
    //   defaultPostLoginState: 'home.search'
    // });
  }

  function getStates() {
    return [
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
