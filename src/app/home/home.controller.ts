/// <reference path="../core/types/types.ts"/>
/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace home {

    export class HomeCtrl {

        myInterval = 5000;
        noWrapSlides = false;

        /* @ngInject */
        constructor(private pageData, private $scope:IHomeScope, private homeService:boilerplate.services.IHomeService) {
            $scope.homeCtrl = this;
            this.pageData = pageData;
        }
    }

    export interface IHomeScope extends ng.IScope {
        homeCtrl: HomeCtrl;
    }
}

angular
    .module("home.controller", ['home.services'
    ])
    .controller("HomeCtrl", home.HomeCtrl);

