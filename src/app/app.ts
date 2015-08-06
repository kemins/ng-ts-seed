/// <reference path="../type-definitions/typings/tsd.d.ts"/>
/// <reference path="core/types/types.ts"/>


/* @ngInject */
function appConfig($urlRouterProvider:ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
}

angular
    .module("ngBoilerplate", [
        "templates",
        "navigation",
        "boilerplate.app.controller",
        "ngBoilerplate.home",
        "ui.router.state",
        "ui.bootstrap",
        'restangular'
    ])
    .config(appConfig);
