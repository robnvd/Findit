(function () {
  'use strict';

  var core = angular.module('Findit.Core');

  var config = {
    appErrorPrefix: '[Findit Error] ',
    appTitle: 'Findit',
    // urlPrefix: '!{api-endpoint}',
    urlPrefix: 'https://52.59.245.153',
    localStorageType: 'sessionStorage',
    localStoragePrefix: 'Findit.'
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
    STORMPATH_CONFIG.FORM_CONTENT_TYPE = 'application/json';
  }

  core.config(localStorageConfig);
  localStorageConfig.$inject = ['localStorageServiceProvider'];

  function localStorageConfig(localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType(config.localStorageType);
    localStorageServiceProvider.setPrefix(config.localStoragePrefix);
    localStorageServiceProvider.setNotify(false, false);
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
