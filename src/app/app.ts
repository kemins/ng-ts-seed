/// <reference path="../type-definitions/typings/tsd.d.ts"/>
/// <reference path="core/types/types.ts"/>

namespace boilerplate.app {

    /* @ngInject */
    export function appConfig($urlRouterProvider:ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
    }
}

angular
    .module("boilerplate", [
        "templates",
        "navigation",
        "boilerplate.app.controller",
        'boilerplate.app.services',
        "boilerplate.home",
        "ui.router.state",
        "ui.bootstrap",
        'restangular'
    ])
    .config(boilerplate.app.appConfig);