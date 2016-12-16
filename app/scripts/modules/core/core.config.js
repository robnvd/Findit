(function () {
  'use strict';

  var core = angular.module('Findit.Core');

  var config = {
    appErrorPrefix: '[Findit Error] ',
    appTitle: 'Findit',
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

  core.config(localStorageConfig);
  localStorageConfig.$inject = ['localStorageServiceProvider'];

  function localStorageConfig(localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType(config.localStorageType);
    localStorageServiceProvider.setPrefix(config.localStoragePrefix);
    localStorageServiceProvider.setNotify(false, false);
  }

  core.config(configure);
  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', 
    'jwtOptionsProvider', '$httpProvider'];

  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, jwtOptionsProvider, $httpProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ' | ' });

    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('id_token');
      }],
      whiteListedDomains: ['localhost', 'localhost:5000']
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  }
})();
