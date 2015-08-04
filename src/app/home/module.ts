/// <reference path="../../types/types.ts"/>

/* @ngInject */
function homeConfig($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state("home", {
        url: "/home",
        controller: "HomeCtrl as homeCtrl",
        templateUrl: "home/home.tpl.html"
    });
}

angular
    .module("ngBoilerplate.home", [
        "home.controller",
        "home.directives",
        "ui.router.state"
    ])
    .config(homeConfig);
