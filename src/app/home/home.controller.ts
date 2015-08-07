/// <reference path="../core/types/types.ts"/>
/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace home {

    export class HomeCtrl {

        user: boilerplate.models.User;

        myInterval = 5000;
        noWrapSlides = false;

        /* @ngInject */
        constructor(private pageData, private $scope: IHomeScope, private homeService: boilerplate.services.IHomeService) {
            $scope.homeCtrl = this;
            this.user = new boilerplate.models.User();
            this.pageData = pageData;
        }

        sayHello(): void {
            this.homeService.greet(this.user);
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

