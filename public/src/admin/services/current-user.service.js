(function() {
  "use strict";

  angular.module('admin')
  .service('CurrentUserService', CurrentUserService);

  function CurrentUserService() {
      var service = this;
      var _username = '';
      var _accessToken = '';

      /**
       * Load the current user with username and token
       */
      service.saveToken = function(username, token) {
          _username = username;
          _accessToken = token;
      };

      service.getUsername = function() {
          return _username;
      };

      service.getAccessToken = function() {
          return _accessToken;
      };

      service.isAuthenticated = function() {
          return _accessToken !== '';
      };
  }
})();
