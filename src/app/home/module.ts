/// <reference path="../../type-definitions/typings/tsd.d.ts"/>


namespace home {
    /* @ngInject */
    export function homeConfig($stateProvider: ng.ui.IStateProvider) {
        $stateProvider.state("home", {
            url: "/home",
            controller: "HomeCtrl as homeCtrl",
            templateUrl: "home/home.tpl.html",
            data: {
                pageTitle: "Home"
            }
        });
    }
}

angular
    .module("boilerplate.home", [
        "home.controller",
        "home.directives",
        "ui.router.state"
    ])
    .config(home.homeConfig);
