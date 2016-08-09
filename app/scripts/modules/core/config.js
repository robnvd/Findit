(function () {
  'use strict';

  var core = angular.module('Findit.Core');

  var config = {
    appErrorPrefix: '[Findit Error] ',
    appTitle: 'Findit',
    urlPrefix: 'http://localhost:3000'
  };
  core.value('config', config);

  core.config(toastrConfig);
  toastrConfig.$inject = ['toastr'];
  
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  core.config(authConfig);
  authConfig.$inject = ['STORMPATH_CONFIG'];
  
  function authConfig(STORMPATH_CONFIG) {
    STORMPATH_CONFIG.ENDPOINT_PREFIX = config.urlPrefix;
  }

  core.config(configure);
  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ' | ' });
  }
})();
