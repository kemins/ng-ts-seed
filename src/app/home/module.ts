/// <reference path="../../type-definitions/typings/tsd.d.ts"/>


namespace home {
    /* @ngInject */
    export function homeConfig($stateProvider: ng.ui.IStateProvider) {
        $stateProvider.state("home", {
            url: "/home",
            controller: "HomeCtrl",
            templateUrl: "home/home.tpl.html",
            data: {pageTitle: 'Home', name: 'home'},
            resolve: {
                /* @ngInject */
                pageData: function ($stateParams: ng.ui.IStateOptions, homeService: boilerplate.services.IHomeService) {
                    return homeService.getPageContent();
                }
            }
        });
    }
}

angular
    .module("boilerplate.home", [
        "home.controller",
        "home.services",
        "home.directives",
        "ui.router.state"
    ])
    .config(home.homeConfig);
