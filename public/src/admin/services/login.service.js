(function () {
  "use strict";

  angular.module("admin").service("LoginService", LoginService);

  LoginService.$inject = ["$http", "AdminAPI"];
  function LoginService($http, AdminAPI) {
    var service = this;

    /** Retrieves an access token using a username and password */
    service.getAccessToken = function (username, password) {
      var params = {
        username: username,
        password: password,
        grant_type: "password",
      };

      return $http.post(AdminAPI + "/token", params).then(function (response) {
        return response.data.access_token;
      });
    };

    /** Make request to revoke current token */
    service.logout = function (tokenValue) {
      var params = {
        token: tokenValue,
      };

      return $http.post(AdminAPI + "/revoke", params);
    };
  }
})();
