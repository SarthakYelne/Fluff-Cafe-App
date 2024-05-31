(function() {
  "use strict";

  // https://coursera-jhu-default-rtdb.firebaseio.com  || Course API
  // https://fluff-cafe-default-rtdb.firebaseio.com  || My API

  angular.module('common', [])
  .constant('ApiPath', 'https://fluff-cafe-default-rtdb.firebaseio.com')
  .constant('AdminAPI', 'https://cors-anywhere.herokuapp.com/https://u3x1wlcynl.execute-api.ap-southeast-2.amazonaws.com/default')
  .config(config);
  
  config.$inject = ['$httpProvider'];
  function config($httpProvider) {
    $httpProvider.interceptors.push('loadingHttpInterceptor');
  }
  
  })();