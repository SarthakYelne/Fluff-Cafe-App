(function () {
  "use strict";

  angular.module("admin").config(config);

  config.$inject = ["$stateProvider", "$httpProvider"];
  function config($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push("authHttpInterceptor");
    $httpProvider.defaults.headers.common.Accept = "application/json";

    $stateProvider

      // Contains base state that all admin states inherit
      .state("admin", {
        url: "/admin",
        abstract: true,
        templateUrl: "src/admin/admin.html",
      })
      // Contains state that all authenticated states inherit
      .state("admin.auth", {
        url: "",
        templateUrl: "src/admin/admin-auth/admin-auth.html",
      })
      .state("admin.login", {
        url: "/login",
        templateUrl: "src/admin/login/login.html",
        controller: "LoginController",
        controllerAs: "loginCtrl",
        // These are params that this state expects to be populated
        // Allows us to pass via $state.go(path, params)
        params: {
          toParams: null,
          toState: null,
        },
      });
  }
})();
