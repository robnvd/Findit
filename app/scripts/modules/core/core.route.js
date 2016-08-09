(function() {
  'use strict';

  angular
    .module('Findit.Core')
    .run(appRun);

  
  appRun.$inject = ['routerHelper', '$stormpath'];
  function appRun(routerHelper, $stormpath) {
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);

    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'home'
    });
  }

  function getStates() {
    return [
      {
        state: '404',
        config: {
          url: '/404',
          templateUrl: 'templates/core/404.html',
          title: '404'
        }
      }
    ];
  }
})();
